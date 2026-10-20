package com.ecobug.controller;

import com.ecobug.dto.CreateOrderRequest;
import com.ecobug.dto.CreateOrderResponse;
import com.ecobug.dto.VerifyPaymentRequest;
import com.ecobug.service.RazorpayService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class PaymentController {

    private final RazorpayService razorpayService;

    public PaymentController(RazorpayService razorpayService) {
        this.razorpayService = razorpayService;
    }

    /**
     * Creates a Razorpay order for Standard Checkout.
     * Amount is in paise; minimum 100 paise is enforced by @Valid.
     */
    @PostMapping("/api/create-order")
    public ResponseEntity<?> createOrder(@Valid @RequestBody CreateOrderRequest request) {
        if (request.getAmount() != null && request.getAmount() < 100) {
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "error", "amount must be at least 100 paise"));
        }

        String currency = (request.getCurrency() == null || request.getCurrency().isBlank())
                ? "INR"
                : request.getCurrency();

        try {
            CreateOrderResponse order = razorpayService.createOrder(
                    request.getAmount(), currency, request.getReceipt());

            // Razorpay's field name is order_id — return it explicitly for the frontend.
            return ResponseEntity.ok(Map.of(
                    "order_id", order.getOrderId(),
                    "amount", order.getAmount(),
                    "currency", order.getCurrency()));
        } catch (RazorpayService.RazorpayAuthException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "error", "Razorpay authentication failed"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "error", "Failed to create order: " + e.getMessage()));
        }
    }

    /**
     * Verifies the checkout signature (HMAC-SHA256). A mismatch means the
     * payment was NOT authentic — returns 400 and marks nothing as paid.
     */
    @PostMapping("/api/verify-payment")
    public ResponseEntity<?> verifyPayment(@Valid @RequestBody VerifyPaymentRequest request) {
        if (request.getOrderId() == null || request.getOrderId().isBlank()
                || request.getPaymentId() == null || request.getPaymentId().isBlank()
                || request.getSignature() == null || request.getSignature().isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "error", "orderId, paymentId and signature are required"));
        }

        boolean valid = razorpayService.verifySignature(
                request.getOrderId(), request.getPaymentId(), request.getSignature());

        if (!valid) {
            // Signature mismatch: never mark as paid.
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "error", "Invalid payment signature"));
        }

        // TODO: persist order as paid here (no order table exists in this project yet).
        return ResponseEntity.ok(Map.of("success", true, "verified", true));
    }
}