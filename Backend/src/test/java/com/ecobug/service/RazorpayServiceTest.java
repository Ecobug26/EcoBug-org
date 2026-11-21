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

    private final RazorpayService service = new RazorpayService("rzp_test_key", SECRET);

    @Test
    void acceptsCorrectHexEncodedRazorpaySignature() throws Exception {
        String orderId = "order_test_123";
        String paymentId = "pay_test_456";

        assertTrue(service.verifySignature(orderId, paymentId, signature(orderId, paymentId)));
    }

    @Test
    void rejectsIncorrectSignature() {
        assertFalse(service.verifySignature("order_test_123", "pay_test_456", "0".repeat(64)));
    }

    @Test
    void rejectsMalformedSignature() {
        assertFalse(service.verifySignature("order_test_123", "pay_test_456", "not-a-signature"));
    }

    private static String signature(String orderId, String paymentId) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(SECRET.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
        byte[] digest = mac.doFinal((orderId + "|" + paymentId).getBytes(StandardCharsets.UTF_8));
        return HexFormat.of().formatHex(digest);
    }
}
