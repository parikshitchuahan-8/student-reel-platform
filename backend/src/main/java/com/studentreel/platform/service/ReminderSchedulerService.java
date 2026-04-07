package com.studentreel.platform.service;

import com.studentreel.platform.dto.ReminderNotificationResponse;
import com.studentreel.platform.entity.ReminderNotification;
import com.studentreel.platform.entity.SavedReel;
import com.studentreel.platform.repository.ReminderNotificationRepository;
import com.studentreel.platform.repository.SavedReelRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReminderSchedulerService {

    private final SavedReelRepository savedReelRepository;
    private final ReminderNotificationRepository reminderNotificationRepository;
    private final ReminderEmailService reminderEmailService;
    private final boolean emailEnabled;

    public ReminderSchedulerService(
            SavedReelRepository savedReelRepository,
            ReminderNotificationRepository reminderNotificationRepository,
            ReminderEmailService reminderEmailService,
            @Value("${app.reminders.email-enabled:false}") boolean emailEnabled
    ) {
        this.savedReelRepository = savedReelRepository;
        this.reminderNotificationRepository = reminderNotificationRepository;
        this.reminderEmailService = reminderEmailService;
        this.emailEnabled = emailEnabled;
    }

    @Scheduled(cron = "${app.reminders.cron:0 0 8 * * *}")
    public void generateDueReminders() {
        LocalDate today = LocalDate.now();
        List<SavedReel> dueReels = savedReelRepository.findByReminderEnabledTrueAndNextReviewDateLessThanEqual(today);

        for (SavedReel savedReel : dueReels) {
            Long userId = savedReel.getUser().getId();
            Long reelId = savedReel.getReel().getId();

            if (reminderNotificationRepository.existsByUserIdAndReelIdAndNotificationDate(userId, reelId, today)) {
                continue;
            }

            String message = "Review \"" + savedReel.getReel().getTitle() + "\" today to stay on schedule.";
            ReminderNotification notification = reminderNotificationRepository.save(
                    new ReminderNotification(savedReel.getUser(), savedReel.getReel(), message, today)
            );

            if (emailEnabled) {
                reminderEmailService.sendReminder(savedReel.getUser().getEmail(), notification.getMessage());
            }
        }
    }

    public List<ReminderNotificationResponse> listNotifications(Long userId) {
        return reminderNotificationRepository.findByUserIdOrderByNotificationDateDescIdDesc(userId)
                .stream()
                .map(notification -> new ReminderNotificationResponse(
                        notification.getId(),
                        notification.getReel().getId(),
                        notification.getReel().getTitle(),
                        notification.getMessage(),
                        notification.getNotificationDate().toString(),
                        notification.isRead()
                ))
                .toList();
    }

    public void markRead(Long notificationId) {
        ReminderNotification notification = reminderNotificationRepository.findById(notificationId)
                .orElseThrow(() -> new EntityNotFoundException("Reminder notification not found"));
        notification.setRead(true);
        reminderNotificationRepository.save(notification);
    }
}
