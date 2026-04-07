package com.studentreel.platform.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SummaryRequest(
        @NotBlank String title,
        @NotBlank @Size(min = 20) String content
) {
}
