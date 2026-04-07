package com.studentreel.platform.service;

import com.studentreel.platform.entity.TaskStatus;
import com.studentreel.platform.entity.UserProfile;
import com.studentreel.platform.model.DashboardSummary;
import com.studentreel.platform.model.PlannerSuggestion;
import com.studentreel.platform.model.StudyGroupCard;
import com.studentreel.platform.model.StudyReelCard;
import com.studentreel.platform.model.TaskCard;
import com.studentreel.platform.repository.FocusSessionRepository;
import com.studentreel.platform.repository.StudyGroupRepository;
import com.studentreel.platform.repository.StudyReelRepository;
import com.studentreel.platform.repository.TaskRepository;
import com.studentreel.platform.repository.UserProfileRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DashboardService {
    private final UserProfileRepository userProfileRepository;
    private final TaskRepository taskRepository;
    private final StudyGroupRepository studyGroupRepository;
    private final StudyReelRepository studyReelRepository;
    private final FocusSessionRepository focusSessionRepository;

    public DashboardService(
            UserProfileRepository userProfileRepository,
            TaskRepository taskRepository,
            StudyGroupRepository studyGroupRepository,
            StudyReelRepository studyReelRepository,
            FocusSessionRepository focusSessionRepository
    ) {
        this.userProfileRepository = userProfileRepository;
        this.taskRepository = taskRepository;
        this.studyGroupRepository = studyGroupRepository;
        this.studyReelRepository = studyReelRepository;
        this.focusSessionRepository = focusSessionRepository;
    }

    public DashboardSummary getDashboard(Long userId) {
        UserProfile user = userProfileRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Default user not found"));

        long totalTasks = taskRepository.findByUserIdOrderByDueDateAsc(user.getId()).size();
        long completedTasks = taskRepository.countByUserIdAndStatus(user.getId(), TaskStatus.COMPLETED);
        double completionRate = totalTasks == 0 ? 0 : (completedTasks * 100.0) / totalTasks;

        return new DashboardSummary(
                firstName(user.getFullName()),
                (int) taskRepository.countByUserIdAndDueDate(user.getId(), LocalDate.now()),
                focusSessionRepository.sumFocusMinutesForToday(user.getId()),
                user.getCurrentStreakDays(),
                Math.round(completionRate * 10.0) / 10.0,
                taskRepository.findTop5ByUserIdOrderByDueDateAsc(user.getId()).stream()
                        .map(task -> new TaskCard(
                                task.getId(),
                                task.getTitle(),
                                task.getSubject(),
                                task.getDueDate().toString(),
                                task.getStatus().name(),
                                task.getProgress()
                        ))
                        .toList(),
                studyGroupRepository.findAll().stream()
                        .map(group -> new StudyGroupCard(
                                group.getId(),
                                group.getName(),
                                group.getTopic(),
                                group.getActiveMembers(),
                                group.getNextSessionLabel()
                        ))
                        .toList(),
                studyReelRepository.findTop6ByOrderByIdAsc().stream()
                        .map(reel -> new StudyReelCard(
                                reel.getId(),
                                reel.getTitle(),
                                reel.getSubject(),
                                reel.getDurationLabel(),
                                reel.getTakeaway()
                        ))
                        .toList()
        );
    }

    public List<PlannerSuggestion> getPlannerSuggestions() {
        return List.of(
                new PlannerSuggestion("6:30 PM - 7:15 PM", "Finish discrete math proofs", "High-priority assignment before deadline"),
                new PlannerSuggestion("7:30 PM - 8:15 PM", "Join Algo Sprint live session", "Collaborative revision and accountability"),
                new PlannerSuggestion("8:30 PM - 9:00 PM", "Revision reel quiz", "Reinforce quick concepts with active recall")
        );
    }

    private String firstName(String fullName) {
        return fullName == null || fullName.isBlank() ? "Student" : fullName.split(" ")[0];
    }
}
