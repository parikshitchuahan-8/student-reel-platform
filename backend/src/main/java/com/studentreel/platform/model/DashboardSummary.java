package com.studentreel.platform.model;

import java.util.List;

public record DashboardSummary(
        String studentName,
        int tasksDueToday,
        int focusMinutesToday,
        int streakDays,
        double completionRate,
        List<TaskCard> priorityTasks,
        List<StudyGroupCard> groups,
        List<StudyReelCard> reels
) {
}
