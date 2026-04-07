package com.studentreel.platform.dto;

public record AuthResponse(
        Long userId,
        String fullName,
        String email,
        String course
) {
}
