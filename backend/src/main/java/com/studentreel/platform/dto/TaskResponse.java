package com.studentreel.platform.dto;

import com.studentreel.platform.entity.TaskPriority;
import com.studentreel.platform.entity.TaskStatus;

import java.time.LocalDate;

public record TaskResponse(
        Long id,
        Long userId,
        String title,
        String subject,
        String description,
        LocalDate dueDate,
        TaskStatus status,
        TaskPriority priority,
        int progress
) {
}
