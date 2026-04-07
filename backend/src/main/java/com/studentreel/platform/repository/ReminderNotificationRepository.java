package com.studentreel.platform.repository;

import com.studentreel.platform.entity.ReminderNotification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ReminderNotificationRepository extends JpaRepository<ReminderNotification, Long> {
    boolean existsByUserIdAndReelIdAndNotificationDate(Long userId, Long reelId, LocalDate notificationDate);
    List<ReminderNotification> findByUserIdOrderByNotificationDateDescIdDesc(Long userId);
}
