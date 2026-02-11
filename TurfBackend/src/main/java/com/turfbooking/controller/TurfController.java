package com.turfbooking.controller;

import com.turfbooking.dto.TurfDTO;
import com.turfbooking.service.TurfService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/turfs")
public class TurfController {

    private final TurfService turfService;

    public TurfController(TurfService turfService) {
        this.turfService = turfService;
    }

    @PostMapping
    public TurfDTO createTurf(@RequestBody TurfDTO dto) {
    	 if (dto.getOwnerId() == null) {
    	        throw new RuntimeException("Owner ID is required");
    	    }
        return turfService.createTurf(dto);
    }

    @GetMapping
    public List<TurfDTO> getAllTurfs() {
        return turfService.getAllTurfs();
    }

    @GetMapping("/{id}")
    public TurfDTO getTurfById(@PathVariable Long id) {
        return turfService.getTurfById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteTurf(@PathVariable Long id) {
        turfService.deleteTurf(id);
        return "Turf deleted successfully";
    }
    
    @GetMapping("/owner/{ownerId}")
    public List<TurfDTO> getTurfsByOwner(@PathVariable Long ownerId) {
        return turfService.getTurfsByOwner(ownerId);
    }

}
