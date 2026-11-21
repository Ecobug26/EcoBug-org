package com.ecobug.dto;

/** Client-supplied receipt metadata only. The backend controls the payable amount. */
public class CreateOrderRequest {

    private String receipt;

    public String getReceipt() {
        return receipt;
    }

    public void setReceipt(String receipt) {
        this.receipt = receipt;
    }
}
