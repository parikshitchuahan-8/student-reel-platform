package com.studentreel.platform.repository;

import com.studentreel.platform.entity.FocusSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FocusSessionRepository extends JpaRepository<FocusSession, Long> {

    @Query("""
            select coalesce(sum(f.durationMinutes), 0)
            from FocusSession f
            where f.user.id = :userId and f.sessionDate = current date
            """)
    Integer sumFocusMinutesForToday(Long userId);
}
