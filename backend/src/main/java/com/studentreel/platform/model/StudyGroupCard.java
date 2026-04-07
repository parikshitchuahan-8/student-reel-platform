package com.studentreel.platform.model;

public record StudyGroupCard(
        Long id,
        String name,
        String topic,
        int activeMembers,
        String nextSession
) {
}
