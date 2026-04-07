package com.studentreel.platform.repository;

import com.studentreel.platform.entity.ReelQuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReelQuizAttemptRepository extends JpaRepository<ReelQuizAttempt, Long> {
    Optional<ReelQuizAttempt> findTopByUserIdAndReelIdOrderByAttemptedAtDesc(Long userId, Long reelId);
}
