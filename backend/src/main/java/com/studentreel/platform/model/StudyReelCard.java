package com.studentreel.platform.model;

public record StudyReelCard(
        Long id,
        String title,
        String subject,
        String duration,
        String takeaway
) {
}
