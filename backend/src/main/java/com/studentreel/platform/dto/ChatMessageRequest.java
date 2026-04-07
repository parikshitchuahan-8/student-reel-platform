package com.studentreel.platform.dto;

import jakarta.validation.constraints.NotBlank;

public record ChatMessageRequest(
        @NotBlank(message = "Message cannot be blank")
        String message
) {
}
