package me.ilyaselaissi.linechatapi.util;

import me.ilyaselaissi.linechatapi.exceptions.core.InvalidFieldException;

public class DataValidator {
    public static <T extends RuntimeException> void validateField(String fieldValue, T exception) {
        if (fieldValue == null || fieldValue.isEmpty()) {
            throw exception;
        }
    }
}
