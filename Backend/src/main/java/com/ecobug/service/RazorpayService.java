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
import java.util.HexFormat;
import java.util.Locale;
import java.util.UUID;

@Service
public class RazorpayService {

    private static final String ORDERS_URL = "https://api.razorpay.com/v1/orders";

    private final HttpClient httpClient = HttpClient.newHttpClient();

    private final String keyId;
    private final String keySecret;
    private final String webhookSecret;

    public RazorpayService(
            @Value("${razorpay.key.id:}") String keyId,
            @Value("${razorpay.key.secret:}") String keySecret,
            @Value("${razorpay.webhook.secret:}") String webhookSecret) {
        this.keyId = keyId;
        this.keySecret = keySecret;
        this.webhookSecret = webhookSecret;
    }

    public boolean isConfigured() {
        return keyId != null && !keyId.isBlank()
                && keySecret != null && !keySecret.isBlank();
    }

    public CreateOrderResponse createOrder(long amount, String currency, String receipt) throws Exception {
        if (amount < 100) {
            throw new IllegalArgumentException("Order amount must be at least 100 paise");
        }
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

    public boolean verifySignature(String orderId, String paymentId, String signature) {
        if (!isConfigured() || orderId == null || paymentId == null || signature == null) {
            return false;
        }
        return verifyHmacSha256(orderId + "|" + paymentId, signature, keySecret);
    }

    /**
     * Verifies the X-Razorpay-Signature header on incoming webhook payloads:
     *   HMAC_SHA256(rawRequestBody, WEBHOOK_SECRET) == X-Razorpay-Signature
     */
    public boolean verifyWebhookSignature(String rawPayload, String signature) {
        if (webhookSecret == null || webhookSecret.isBlank() || rawPayload == null || signature == null) {
            return false;
        }
        return verifyHmacSha256(rawPayload, signature, webhookSecret);
    }

    private boolean verifyHmacSha256(String payload, String signature, String secret) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            byte[] digest = mac.doFinal(payload.getBytes(StandardCharsets.UTF_8));
            String expectedHex = HexFormat.of().formatHex(digest);
            String providedHex = signature.trim().toLowerCase(Locale.ROOT);
            if (!providedHex.matches("[0-9a-f]{64}")) {
                return false;
            }
            return MessageDigest.isEqual(
                    expectedHex.getBytes(StandardCharsets.US_ASCII),
                    providedHex.getBytes(StandardCharsets.US_ASCII));
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

    public static class RazorpayAuthException extends Exception {
        public RazorpayAuthException(String message) {
            super(message);
        }
    }

    public static class RazorpayApiException extends Exception {
        public RazorpayApiException(String message) {
            super(message);
        }
    }
}