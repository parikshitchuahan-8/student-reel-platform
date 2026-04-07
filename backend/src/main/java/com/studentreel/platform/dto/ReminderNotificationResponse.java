package com.studentreel.platform.dto;

public record ReminderNotificationResponse(
        Long id,
        Long reelId,
        String reelTitle,
        String message,
        String notificationDate,
        boolean read
) {
}
