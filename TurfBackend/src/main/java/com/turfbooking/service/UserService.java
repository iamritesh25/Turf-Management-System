package com.turfbooking.service;

import com.turfbooking.dto.UserDTO;
import com.turfbooking.entity.User;

import java.util.List;

public interface UserService {

    UserDTO createUser(UserDTO dto);

    List<UserDTO> getAllUsers();

    UserDTO getUserById(Long id);

    void deleteUser(Long id);
    
    User updateUser(Long id, User updatedUser);

}
