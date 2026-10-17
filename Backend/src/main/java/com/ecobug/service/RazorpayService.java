package com.ecobug.service;

import com.ecobug.dto.CreateOrderResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;
import java.util.UUID;

/**
 * Razorpay Standard Checkout backend: creates orders via the Razorpay REST API
 * and verifies payment signatures (HMAC-SHA256) locally.
 *
 * No SDK dependency — uses the JDK HttpClient + javax.crypto so the build stays
 * offline-friendly (see Backend/pom.xml for the existing dependency set).
 */
@Service
public class RazorpayService {

    private static final String ORDERS_URL = "https://api.razorpay.com/v1/orders";

    private final HttpClient httpClient = HttpClient.newHttpClient();

    private final String keyId;
    private final String keySecret;

    public RazorpayService(
            @Value("${razorpay.key.id:}") String keyId,
            @Value("${razorpay.key.secret:}") String keySecret) {
        this.keyId = keyId;
        this.keySecret = keySecret;
    }

    public boolean isConfigured() {
        return keyId != null && !keyId.isBlank()
                && keySecret != null && !keySecret.isBlank();
    }

    /**
     * Creates an order at Razorpay. Amount must already be in paise.
     *
     * @throws RazorpayAuthException on 401/invalid credentials
     * @throws RazorpayApiException  on any other API failure
     */
    public CreateOrderResponse createOrder(long amount, String currency, String receipt) throws Exception {
        if (!isConfigured()) {
            throw new RazorpayAuthException("Razorpay keys are not configured");
        }

        String safeReceipt = (receipt == null || receipt.isBlank())
                ? "ecobug-" + UUID.randomUUID()
                : receipt;

        String body = "{\"amount\":" + amount
                + ",\"currency\":\"" + escapeJson(currency) + "\""
                + ",\"receipt\":\"" + escapeJson(safeReceipt) + "\"}";

        String auth = Base64.getEncoder()
                .encodeToString((keyId + ":" + keySecret).getBytes(StandardCharsets.UTF_8));

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(ORDERS_URL))
                .header("Authorization", "Basic " + auth)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() == 401 || response.statusCode() == 403) {
            throw new RazorpayAuthException("Razorpay rejected the configured credentials");
        }
        if (response.statusCode() < 200 || response.statusCode() >= 300) {
            throw new RazorpayApiException(
                    "Razorpay order creation failed (HTTP " + response.statusCode() + ")");
        }

        String json = response.body();
        String orderId = extractJsonField(json, "id");
        long returnedAmount = parseAmountField(extractJsonField(json, "amount"));
        String returnedCurrency = extractJsonField(json, "currency");

        if (orderId == null || orderId.isBlank()) {
            throw new RazorpayApiException("Razorpay response did not include an order id");
        }

        return new CreateOrderResponse(orderId, returnedAmount, returnedCurrency);
    }

    /**
     * Verifies the Razorpay checkout signature:
     *   HMAC_SHA256(order_id + "|" + payment_id, KEY_SECRET) == razorpay_signature
     * Uses a constant-time comparison to avoid timing side channels.
     */
    public boolean verifySignature(String orderId, String paymentId, String signature) {
        if (!isConfigured() || orderId == null || paymentId == null || signature == null) {
            return false;
        }

        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(keySecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            byte[] expected = mac.doFinal((orderId + "|" + paymentId).getBytes(StandardCharsets.UTF_8));
            byte[] provided = signature.getBytes(StandardCharsets.UTF_8);
            return MessageDigest.isEqual(expected, provided);
        } catch (Exception e) {
            return false;
        }
    }

    // --- helpers ---

    private static String extractJsonField(String json, String field) {
        String pattern = "\"" + field + "\":";
        int idx = json.indexOf(pattern);
        if (idx < 0) return null;
        int start = idx + pattern.length();
        while (start < json.length()
                && (json.charAt(start) == ' ' || json.charAt(start) == '\"')) {
            if (json.charAt(start) == '\"') {
                int end = json.indexOf('"', start + 1);
                return end < 0 ? null : json.substring(start + 1, end);
            }
            start++;
        }
        int end = start;
        while (end < json.length()
                && (Character.isDigit(json.charAt(end)) || json.charAt(end) == '.')) {
            end++;
        }
        return start < end ? json.substring(start, end) : null;
    }

    private static long parseAmountField(String value) {
        if (value == null || value.isBlank()) return -1;
        try {
            return (long) Double.parseDouble(value);
        } catch (NumberFormatException e) {
            return -1;
        }
    }

    private static String escapeJson(String value) {
        if (value == null) return "";
        return value.replace("\\", "\\\\").replace("\"", "\\\"");
    }

    /** Thrown when Razorpay rejects credentials or keys are absent. */
    public static class RazorpayAuthException extends Exception {
        public RazorpayAuthException(String message) {
            super(message);
        }
    }

    /** Thrown for any non-auth Razorpay API failure. */
    public static class RazorpayApiException extends Exception {
        public RazorpayApiException(String message) {
            super(message);
        }
    }
}
