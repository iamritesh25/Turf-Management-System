package com.turfbooking.controller;

import com.turfbooking.dto.BookingDTO;
import com.turfbooking.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public BookingDTO createBooking(@RequestBody BookingDTO bookingDTO) {
        return bookingService.createBooking(bookingDTO);
    }

    @GetMapping
    public List<BookingDTO> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/{id}")
    public BookingDTO getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return "Booking deleted successfully";
    }
    
    @PutMapping("/{id}/status")
    public BookingDTO updateBookingStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return bookingService.updateStatus(id, status);
    }
    
    @GetMapping("/owner/{ownerId}")
    public List<BookingDTO> getBookingsForOwner(@PathVariable Long ownerId) {
        return bookingService.getBookingsForOwner(ownerId);
    }
    
    @GetMapping("/user/{userId}")
    public List<BookingDTO> getBookingsForUser(@PathVariable Long userId) {
        return bookingService.getAllBookings()
                .stream()
                .filter(b -> b.getUserId() != null 
                && b.getUserId().longValue() == userId.longValue())

                .toList();
    }

    


}
