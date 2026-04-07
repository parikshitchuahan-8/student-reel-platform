package com.studentreel.platform.dto;

import jakarta.validation.constraints.NotNull;

public record SavedReelReminderRequest(
        @NotNull Long userId,
        boolean reminderEnabled
) {
}
