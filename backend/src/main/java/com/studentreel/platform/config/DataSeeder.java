package com.studentreel.platform.config;

import com.studentreel.platform.entity.FocusSession;
import com.studentreel.platform.entity.StudyGroup;
import com.studentreel.platform.entity.StudyReel;
import com.studentreel.platform.entity.Task;
import com.studentreel.platform.entity.TaskPriority;
import com.studentreel.platform.entity.TaskStatus;
import com.studentreel.platform.entity.UserProfile;
import com.studentreel.platform.repository.FocusSessionRepository;
import com.studentreel.platform.repository.StudyGroupRepository;
import com.studentreel.platform.repository.StudyReelRepository;
import com.studentreel.platform.repository.TaskRepository;
import com.studentreel.platform.repository.UserProfileRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedData(
            UserProfileRepository userProfileRepository,
            TaskRepository taskRepository,
            StudyGroupRepository studyGroupRepository,
            StudyReelRepository studyReelRepository,
            FocusSessionRepository focusSessionRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {
            if (userProfileRepository.count() > 0) {
                return;
            }

            UserProfile user = userProfileRepository.save(
                    new UserProfile(
                            "Aarav Sharma",
                            "aarav@studentreel.dev",
                            "Computer Science",
                            12,
                            passwordEncoder.encode("password123")
                    )
            );

            taskRepository.save(new Task(
                    user,
                    "Discrete Math Assignment",
                    "Mathematics",
                    "Complete induction and recurrence questions.",
                    LocalDate.now().plusDays(1),
                    TaskStatus.IN_PROGRESS,
                    TaskPriority.HIGH,
                    65
            ));

            taskRepository.save(new Task(
                    user,
                    "Database ER Diagram",
                    "DBMS",
                    "Prepare schema draft for mini project.",
                    LocalDate.now().plusDays(2),
                    TaskStatus.NOT_STARTED,
                    TaskPriority.HIGH,
                    15
            ));

            taskRepository.save(new Task(
                    user,
                    "Operating Systems Quiz Prep",
                    "OS",
                    "Revise CPU scheduling and deadlocks.",
                    LocalDate.now().plusDays(3),
                    TaskStatus.IN_PROGRESS,
                    TaskPriority.MEDIUM,
                    40
            ));

            studyGroupRepository.save(new StudyGroup("Algo Sprint", "Problem Solving", 8, "Today, 7:30 PM"));
            studyGroupRepository.save(new StudyGroup("DBMS Builders", "Normalization", 5, "Tomorrow, 6:00 PM"));

            studyReelRepository.save(new StudyReel(
                    "Binary Search in 60 seconds",
                    "DSA",
                    "01:00",
                    "Spot sorted-array patterns faster",
                    "https://example.com/reels/binary-search",
                    "https://example.com/transcripts/binary-search"
            ));
            studyReelRepository.save(new StudyReel(
                    "Normalization cheatsheet",
                    "DBMS",
                    "01:20",
                    "Remember 1NF to BCNF quickly",
                    "https://example.com/reels/normalization",
                    "https://example.com/transcripts/normalization"
            ));

            focusSessionRepository.save(new FocusSession(user, LocalDate.now(), 50));
            focusSessionRepository.save(new FocusSession(user, LocalDate.now(), 40));
            focusSessionRepository.save(new FocusSession(user, LocalDate.now(), 45));
        };
    }
}
