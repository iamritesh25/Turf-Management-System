package com.turfbooking.service;

import com.turfbooking.dto.PaymentDTO;
import java.util.List;

public interface PaymentService {

    PaymentDTO createPayment(PaymentDTO dto);

    List<PaymentDTO> getAllPayments();

    PaymentDTO getPaymentById(Long id);
}
