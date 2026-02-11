package com.turfbooking.util;

public class ValidationUtil {

    public static boolean isValidId(Long id) {
        return id != null && id > 0;
    }

    public static boolean isValidEmail(String email) {
        return email != null && email.contains("@");
    }

    public static boolean isValidPhone(String phone) {
        return phone != null && phone.length() >= 10;
    }
}
