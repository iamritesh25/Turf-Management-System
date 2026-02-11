package com.turfbooking.repository;

import com.turfbooking.entity.Booking;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
	
	@Query("""
			SELECT b FROM Booking b
			JOIN Turf t ON b.turfId = t.id
			WHERE t.ownerId = :ownerId
			""")
			List<Booking> findByOwnerId(Long ownerId);

}
