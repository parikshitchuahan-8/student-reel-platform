package com.studentreel.platform.dto;

import jakarta.validation.constraints.NotBlank;

public record ReelQuizRequest(
        @NotBlank String title,
        @NotBlank String subject,
        @NotBlank String takeaway
) {
}
