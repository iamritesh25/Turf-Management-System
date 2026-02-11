package com.turfbooking.util;

public class StringUtil {

    public static boolean isEmpty(String value) {
        return value == null || value.trim().isEmpty();
    }
}
