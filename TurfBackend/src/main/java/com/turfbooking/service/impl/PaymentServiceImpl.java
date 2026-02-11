package com.turfbooking.service.impl;

import com.turfbooking.dto.PaymentDTO;
import com.turfbooking.entity.Payment;
import com.turfbooking.exception.ResourceNotFoundException;
import com.turfbooking.repository.PaymentRepository;
import com.turfbooking.service.PaymentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @Override
    public PaymentDTO createPayment(PaymentDTO dto) {
        Payment p = new Payment();
        p.setBookingId(dto.getBookingId());
        p.setAmount(dto.getAmount());
        p.setPaymentMethod(dto.getPaymentMethod());
        p.setPaymentStatus(dto.getPaymentStatus());
        p.setPaymentDate(dto.getPaymentDate());

        Payment saved = paymentRepository.save(p);
        dto.setId(saved.getId());
        return dto;
    }

    @Override
    public List<PaymentDTO> getAllPayments() {
        return paymentRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PaymentDTO getPaymentById(Long id) {
        Payment p = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with id: " + id));
        return toDTO(p);
    }


    private PaymentDTO toDTO(Payment p) {
        PaymentDTO dto = new PaymentDTO();
        dto.setId(p.getId());
        dto.setBookingId(p.getBookingId());
        dto.setAmount(p.getAmount());
        dto.setPaymentMethod(p.getPaymentMethod());
        dto.setPaymentStatus(p.getPaymentStatus());
        dto.setPaymentDate(p.getPaymentDate());
        return dto;
    }
}
