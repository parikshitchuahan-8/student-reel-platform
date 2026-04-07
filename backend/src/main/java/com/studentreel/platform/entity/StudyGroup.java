package com.studentreel.platform.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "study_groups")
public class StudyGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String topic;

    @Column(nullable = false)
    private int activeMembers;

    @Column(nullable = false)
    private String nextSessionLabel;

    protected StudyGroup() {
    }

    public StudyGroup(String name, String topic, int activeMembers, String nextSessionLabel) {
        this.name = name;
        this.topic = topic;
        this.activeMembers = activeMembers;
        this.nextSessionLabel = nextSessionLabel;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getTopic() {
        return topic;
    }

    public int getActiveMembers() {
        return activeMembers;
    }

    public String getNextSessionLabel() {
        return nextSessionLabel;
    }
}
