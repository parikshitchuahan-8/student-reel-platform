package com.studentreel.platform.dto;

import jakarta.validation.constraints.NotNull;

public record SavedReelRequest(
        @NotNull Long userId
) {
}
