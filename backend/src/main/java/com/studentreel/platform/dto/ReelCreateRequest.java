package com.studentreel.platform.dto;

import jakarta.validation.constraints.NotBlank;

public record ReelCreateRequest(
        @NotBlank String title,
        @NotBlank String subject,
        @NotBlank String duration,
        @NotBlank String takeaway,
        String videoUrl,
        String transcriptUrl
) {
}
