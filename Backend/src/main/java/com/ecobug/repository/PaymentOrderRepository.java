package com.ecobug.repository;

import com.ecobug.entity.PaymentOrder;
import com.ecobug.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentOrderRepository extends JpaRepository<PaymentOrder, Long> {
    Optional<PaymentOrder> findByRazorpayOrderId(String razorpayOrderId);
    List<PaymentOrder> findByUserOrderByCreatedAtDesc(User user);
}