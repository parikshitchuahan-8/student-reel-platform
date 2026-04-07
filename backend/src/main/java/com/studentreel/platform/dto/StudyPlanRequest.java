package com.studentreel.platform.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record StudyPlanRequest(
        @NotBlank String subject,
        @Min(1) @Max(12) int availableHours,
        List<String> weakAreas,
        @NotBlank String deadline
) {
}
