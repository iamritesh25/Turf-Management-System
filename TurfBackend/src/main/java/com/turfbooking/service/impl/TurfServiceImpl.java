package com.turfbooking.service.impl;

import com.turfbooking.dto.TurfDTO;
import com.turfbooking.entity.Turf;
import com.turfbooking.exception.ResourceNotFoundException;
import com.turfbooking.repository.TurfRepository;
import com.turfbooking.service.TurfService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TurfServiceImpl implements TurfService {

    private final TurfRepository turfRepository;

    public TurfServiceImpl(TurfRepository turfRepository) {
        this.turfRepository = turfRepository;
    }

    @Override
    public TurfDTO createTurf(TurfDTO dto) {
        Turf t = new Turf();

        t.setName(dto.getName());

        // ✅ FIX: HANDLE CITY + LOCATION
        t.setCity(dto.getCity());
        t.setLocation(dto.getLocation());

        t.setPricePerHour(dto.getPricePerHour());

        // default available true if not sent
        t.setAvailable(dto.isAvailable());

        t.setOwnerId(dto.getOwnerId());

        Turf saved = turfRepository.save(t);

        return toDTO(saved);
    }

    @Override
    public List<TurfDTO> getAllTurfs() {
        return turfRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TurfDTO getTurfById(Long id) {
        Turf t = turfRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Turf not found with id: " + id));
        return toDTO(t);
    }

    @Override
    public void deleteTurf(Long id) {
        Turf t = turfRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Turf not found with id: " + id));
        turfRepository.delete(t);
    }

    @Override
    public List<TurfDTO> getTurfsByOwner(Long ownerId) {
        return turfRepository.findByOwnerId(ownerId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // ======================
    // CENTRALIZED MAPPER
    // ======================
    private TurfDTO toDTO(Turf t) {
        TurfDTO dto = new TurfDTO();

        dto.setId(t.getId());
        dto.setName(t.getName());

        // ✅ FIX: RETURN CITY + LOCATION
        dto.setCity(t.getCity());
        dto.setLocation(t.getLocation());

        dto.setPricePerHour(t.getPricePerHour());
        dto.setAvailable(t.isAvailable());
        dto.setOwnerId(t.getOwnerId());

        return dto;
    }
}
