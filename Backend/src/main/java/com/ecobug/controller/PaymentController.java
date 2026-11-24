package com.ecobug.controller;

import com.ecobug.dto.CreateOrderRequest;
import com.ecobug.dto.CreateOrderResponse;
import com.ecobug.dto.VerifyPaymentRequest;
import com.ecobug.entity.PaymentOrder;
import com.ecobug.entity.User;
import com.ecobug.repository.PaymentOrderRepository;
import com.ecobug.repository.UserRepository;
import com.ecobug.service.RazorpayService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
public class PaymentController {

    private static final long MONTHLY_PLAN_AMOUNT_PAISE = 4_900L;
    private static final String CURRENCY = "INR";

    private final RazorpayService razorpayService;
    private final PaymentOrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    public PaymentController(
            RazorpayService razorpayService,
            PaymentOrderRepository orderRepository,
            UserRepository userRepository,
            ObjectMapper objectMapper) {
        this.razorpayService = razorpayService;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.objectMapper = objectMapper;
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

        markOrderPaidAndActivateUser(order, request.getPaymentId());

        return ResponseEntity.ok(Map.of("success", true, "verified", true));
    }

    @Transactional
    @PostMapping("/api/webhook/razorpay")
    public ResponseEntity<?> handleRazorpayWebhook(
            @RequestHeader(value = "X-Razorpay-Signature", required = false) String signature,
            @RequestBody String rawPayload) {

        if (!razorpayService.verifyWebhookSignature(rawPayload, signature)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid webhook signature"));
        }

        try {
            JsonNode root = objectMapper.readTree(rawPayload);
            String event = root.path("event").asText("");

            if ("payment.captured".equals(event)) {
                JsonNode paymentEntity = root.path("payload").path("payment").path("entity");
                String razorpayOrderId = paymentEntity.path("order_id").asText("");
                String razorpayPaymentId = paymentEntity.path("id").asText("");

                if (!razorpayOrderId.isBlank()) {
                    orderRepository.findByRazorpayOrderId(razorpayOrderId)
                            .ifPresent(order -> markOrderPaidAndActivateUser(order, razorpayPaymentId));
                }
            }
            return ResponseEntity.ok(Map.of("status", "ok"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Malformed webhook payload"));
        }
    }

    @Transactional(readOnly = true)
    @GetMapping("/api/orders/me")
    public ResponseEntity<?> getMyOrders(@AuthenticationPrincipal UserDetails principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Unauthorized"));
        }

        User user = userRepository.findByEmail(principal.getUsername()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "User not found"));
        }

        var orders = orderRepository
                .findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(o -> Map.<String, Object>of(
                        "id", o.getId(),
                        "orderId", o.getRazorpayOrderId(),
                        "paymentId", o.getRazorpayPaymentId() == null ? "" : o.getRazorpayPaymentId(),
                        "amountInr", o.getAmountPaise() / 100.0,
                        "currency", o.getCurrency(),
                        "status", o.getStatus(),
                        "createdAt", o.getCreatedAt().toString(),
                        "paidAt", o.getPaidAt() == null ? "" : o.getPaidAt().toString()
                ))
                .toList();

        return ResponseEntity.ok(orders);
    }

    private void markOrderPaidAndActivateUser(PaymentOrder order, String paymentId) {
        if ("PAID".equals(order.getStatus())) {
            return;
        }
        order.setRazorpayPaymentId(paymentId);
        order.setStatus("PAID");
        order.setPaidAt(Instant.now());
        orderRepository.save(order);

        User user = order.getUser();
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime base = (user.getSubscriptionExpiresAt() != null && user.getSubscriptionExpiresAt().isAfter(now))
                ? user.getSubscriptionExpiresAt()
                : now;
        user.setSubscriptionPlan("PRO_MONTHLY");
        user.setSubscriptionExpiresAt(base.plusDays(30));
        userRepository.save(user);
    }
}