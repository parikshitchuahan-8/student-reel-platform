package com.studentreel.platform.dto;

public record ReelResponse(
        Long id,
        String title,
        String subject,
        String duration,
        String takeaway,
        String videoUrl,
        String transcriptUrl
) {
}
