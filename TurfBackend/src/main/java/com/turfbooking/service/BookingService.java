package com.turfbooking.service;

import com.turfbooking.dto.BookingDTO;
import java.util.List;

public interface BookingService {

    BookingDTO createBooking(BookingDTO dto);

    List<BookingDTO> getAllBookings();

    BookingDTO getBookingById(Long id);

    void deleteBooking(Long id);
    
    BookingDTO updateStatus(Long id, String status);

    List<BookingDTO> getBookingsForOwner(Long ownerId);

}
