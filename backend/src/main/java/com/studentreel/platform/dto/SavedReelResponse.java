package com.studentreel.platform.dto;

public record SavedReelResponse(
        Long id,
        String title,
        String subject,
        String duration,
        String takeaway,
        String videoUrl,
        String transcriptUrl,
        Integer latestScore,
        Integer totalQuestions,
        boolean revised,
        String nextReviewDate,
        boolean reminderEnabled
) {
}
