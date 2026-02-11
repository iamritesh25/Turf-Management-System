package com.turfbooking.repository;

import com.turfbooking.entity.Turf;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TurfRepository extends JpaRepository<Turf, Long> {
	List<Turf> findByOwnerId(Long ownerId);

}
