package com.ecobug.controller;

import com.ecobug.dto.CreateOrderRequest;
import com.ecobug.dto.CreateOrderResponse;
import com.ecobug.dto.VerifyPaymentRequest;
import com.ecobug.service.RazorpayService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class PaymentController {

    // Current checkout page offers the Education / Professional monthly plan at ₹49.
    // Keep the price on the server; never accept an amount calculated by the browser.
    private static final long MONTHLY_PLAN_AMOUNT_PAISE = 4_900L;
    private static final String CURRENCY = "INR";

    private final RazorpayService razorpayService;

    public PaymentController(RazorpayService razorpayService) {
        this.razorpayService = razorpayService;
    }

    /**
     * Creates a Razorpay order for Standard Checkout.
     * The amount is selected on the server and expressed in paise.
     */
    @PostMapping("/api/create-order")
    public ResponseEntity<?> createOrder(@RequestBody(required = false) CreateOrderRequest request) {
        String receipt = request == null ? null : request.getReceipt();

        try {
            CreateOrderResponse order = razorpayService.createOrder(
                    MONTHLY_PLAN_AMOUNT_PAISE, CURRENCY, receipt);

            // Razorpay's field name is order_id — return it explicitly for the frontend.
            return ResponseEntity.ok(Map.of(
                    "order_id", order.getOrderId(),
                    "amount", order.getAmount(),
                    "currency", order.getCurrency()));
        } catch (RazorpayService.RazorpayAuthException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "error", "Razorpay authentication failed"));
        } catch (Exception e) {
            // Avoid returning upstream details or configuration data to the browser.
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "error", "Failed to create Razorpay order"));
        }
    }

    /**
     * Verifies the checkout signature (HMAC-SHA256). A mismatch means the
     * payment was NOT authentic — returns 400 and marks nothing as paid.
     */
    @PostMapping("/api/verify-payment")
    public ResponseEntity<?> verifyPayment(@RequestBody(required = false) VerifyPaymentRequest request) {
        if (request == null || request.getOrderId() == null || request.getOrderId().isBlank()
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