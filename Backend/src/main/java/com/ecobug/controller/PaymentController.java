package com.ecobug.controller;

import com.ecobug.dto.CreateOrderRequest;
import com.ecobug.dto.CreateOrderResponse;
import com.ecobug.dto.VerifyPaymentRequest;
import com.ecobug.entity.PaymentOrder;
import com.ecobug.entity.User;
import com.ecobug.repository.PaymentOrderRepository;
import com.ecobug.repository.UserRepository;
import com.ecobug.service.RazorpayService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;

@RestController
public class PaymentController {

    private static final long MONTHLY_PLAN_AMOUNT_PAISE = 4_900L;
    private static final String CURRENCY = "INR";

    private final RazorpayService razorpayService;
    private final PaymentOrderRepository orderRepository;
    private final UserRepository userRepository;

    public PaymentController(
            RazorpayService razorpayService,
            PaymentOrderRepository orderRepository,
            UserRepository userRepository) {
        this.razorpayService = razorpayService;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    @PostMapping("/api/create-order")
    public ResponseEntity<?> createOrder(
            @AuthenticationPrincipal UserDetails principal,
            @RequestBody(required = false) CreateOrderRequest request) {

        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "error", "Please log in before paying"));
        }

        User user = userRepository.findByEmail(principal.getUsername()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "error", "User not found"));
        }

        String receipt = request == null ? null : request.getReceipt();

        try {
            CreateOrderResponse order = razorpayService.createOrder(
                    MONTHLY_PLAN_AMOUNT_PAISE, CURRENCY, receipt);

            PaymentOrder entity = new PaymentOrder();
            entity.setRazorpayOrderId(order.getOrderId());
            entity.setAmountPaise(order.getAmount());
            entity.setCurrency(order.getCurrency());
            entity.setStatus("CREATED");
            entity.setUser(user);
            orderRepository.save(entity);

            return ResponseEntity.ok(Map.of(
                    "order_id", order.getOrderId(),
                    "amount", order.getAmount(),
                    "currency", order.getCurrency()));
        } catch (RazorpayService.RazorpayAuthException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "error", "Razorpay authentication failed"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "error", "Failed to create Razorpay order"));
        }
    }

    @Transactional
    @PostMapping("/api/verify-payment")
    public ResponseEntity<?> verifyPayment(
            @AuthenticationPrincipal UserDetails principal,
            @RequestBody(required = false) VerifyPaymentRequest request) {

        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "error", "Unauthorized"));
        }

        if (request == null || request.getOrderId() == null || request.getOrderId().isBlank()
                || request.getPaymentId() == null || request.getPaymentId().isBlank()
                || request.getSignature() == null || request.getSignature().isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "error", "orderId, paymentId and signature are required"));
        }

        PaymentOrder order = orderRepository.findByRazorpayOrderId(request.getOrderId()).orElse(null);
        if (order == null || !order.getUser().getEmail().equals(principal.getUsername())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "error", "Order not found for user"));
        }

        boolean valid = razorpayService.verifySignature(
                request.getOrderId(), request.getPaymentId(), request.getSignature());

        if (!valid) {
            order.setStatus("FAILED");
            orderRepository.save(order);
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "error", "Invalid payment signature"));
        }

        if (!"PAID".equals(order.getStatus())) {
            order.setRazorpayPaymentId(request.getPaymentId());
            order.setStatus("PAID");
            order.setPaidAt(Instant.now());
            orderRepository.save(order);
        }

        return ResponseEntity.ok(Map.of("success", true, "verified", true));
    }
}