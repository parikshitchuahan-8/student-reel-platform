package com.studentreel.platform.controller;

import com.studentreel.platform.dto.ReminderNotificationResponse;
import com.studentreel.platform.service.ReminderSchedulerService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reminders")
public class ReminderController {

    private final ReminderSchedulerService reminderSchedulerService;

    public ReminderController(ReminderSchedulerService reminderSchedulerService) {
        this.reminderSchedulerService = reminderSchedulerService;
    }

    @GetMapping
    public List<ReminderNotificationResponse> listNotifications(@RequestParam Long userId) {
        return reminderSchedulerService.listNotifications(userId);
    }

    @PostMapping("/{notificationId}/read")
    public void markRead(@PathVariable Long notificationId) {
        reminderSchedulerService.markRead(notificationId);
    }
}
