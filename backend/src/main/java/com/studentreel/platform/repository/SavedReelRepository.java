package com.studentreel.platform.repository;

import com.studentreel.platform.entity.SavedReel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface SavedReelRepository extends JpaRepository<SavedReel, Long> {
    boolean existsByUserIdAndReelId(Long userId, Long reelId);
    long countByUserId(Long userId);
    List<SavedReel> findByUserIdOrderByIdDesc(Long userId);
    List<SavedReel> findByUserIdAndNextReviewDateLessThanEqualOrderByNextReviewDateAsc(Long userId, LocalDate nextReviewDate);
    List<SavedReel> findByReminderEnabledTrueAndNextReviewDateLessThanEqual(LocalDate nextReviewDate);
    Optional<SavedReel> findByUserIdAndReelId(Long userId, Long reelId);
}
