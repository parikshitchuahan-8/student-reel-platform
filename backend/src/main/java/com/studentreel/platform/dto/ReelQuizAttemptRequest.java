package com.studentreel.platform.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record ReelQuizAttemptRequest(
        @NotNull Long userId,
        @Min(0) int score,
        @Min(1) int totalQuestions
) {
}
