package com.studentreel.platform.model;

public record TaskCard(
        Long id,
        String title,
        String subject,
        String dueDate,
        String status,
        int progress
) {
}
