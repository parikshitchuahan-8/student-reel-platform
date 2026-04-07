package com.studentreel.platform.dto;

import com.studentreel.platform.entity.TaskPriority;
import com.studentreel.platform.entity.TaskStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record TaskRequest(
        @NotNull Long userId,
        @NotBlank String title,
        @NotBlank String subject,
        String description,
        @NotNull LocalDate dueDate,
        @NotNull TaskStatus status,
        @NotNull TaskPriority priority,
        @Min(0) @Max(100) int progress
) {
}
