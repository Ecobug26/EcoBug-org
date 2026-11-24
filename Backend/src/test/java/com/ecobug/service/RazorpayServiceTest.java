package com.ecobug.service;

import org.junit.jupiter.api.Test;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.HexFormat;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class RazorpayServiceTest {

    private static final String SECRET = "test_secret_for_signature_verification";
    private static final String WEBHOOK_SECRET = "test_webhook_secret_for_verification";

    private final RazorpayService service = new RazorpayService("rzp_test_key", SECRET, WEBHOOK_SECRET);

    @Test
    void acceptsCorrectHexEncodedRazorpaySignature() throws Exception {
        String orderId = "order_test_123";
        String paymentId = "pay_test_456";

        assertTrue(service.verifySignature(orderId, paymentId, hmacSha256(orderId + "|" + paymentId, SECRET)));
    }

    @Test
    void rejectsIncorrectSignature() {
        assertFalse(service.verifySignature("order_test_123", "pay_test_456", "0".repeat(64)));
    }

    @Test
    void rejectsMalformedSignature() {
        assertFalse(service.verifySignature("order_test_123", "pay_test_456", "not-a-signature"));
    }

    @Test
    void acceptsCorrectWebhookSignature() throws Exception {
        String rawPayload = "{\"event\":\"payment.captured\"}";

        assertTrue(service.verifyWebhookSignature(rawPayload, hmacSha256(rawPayload, WEBHOOK_SECRET)));
    }

    @Test
    void rejectsIncorrectWebhookSignature() {
        assertFalse(service.verifyWebhookSignature("{\"event\":\"payment.captured\"}", "0".repeat(64)));
    }

    private static String hmacSha256(String data, String secret) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
        byte[] digest = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
        return HexFormat.of().formatHex(digest);
    }
}