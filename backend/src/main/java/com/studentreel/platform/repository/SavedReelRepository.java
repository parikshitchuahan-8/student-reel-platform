package com.studentreel.platform.repository;

import com.studentreel.platform.entity.SavedReel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SavedReelRepository extends JpaRepository<SavedReel, Long> {
    boolean existsByUserIdAndReelId(Long userId, Long reelId);
    long countByUserId(Long userId);
}
