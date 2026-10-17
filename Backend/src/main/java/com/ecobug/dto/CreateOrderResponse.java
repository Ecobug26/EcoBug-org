package com.ecobug.dto;

public class CreateOrderResponse {

    private String orderId;
    private long amount;
    private String currency;

    public CreateOrderResponse(String orderId, long amount, String currency) {
        this.orderId = orderId;
        this.amount = amount;
        this.currency = currency;
    }

    public String getOrderId() {
        return orderId;
    }

    public long getAmount() {
        return amount;
    }

    public String getCurrency() {
        return currency;
    }
}