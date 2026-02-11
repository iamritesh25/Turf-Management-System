package com.turfbooking.service;

import com.turfbooking.dto.TurfDTO;
import java.util.List;

public interface TurfService {

    TurfDTO createTurf(TurfDTO dto);

    List<TurfDTO> getAllTurfs();

    TurfDTO getTurfById(Long id);

    void deleteTurf(Long id);
    
    List<TurfDTO> getTurfsByOwner(Long ownerId);

}
