package com.studentreel.platform.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String course;

    @Column(nullable = false)
    private int currentStreakDays;

    @Column(nullable = false)
    private String passwordHash;

    protected UserProfile() {
    }

    public UserProfile(String fullName, String email, String course, int currentStreakDays, String passwordHash) {
        this.fullName = fullName;
        this.email = email;
        this.course = course;
        this.currentStreakDays = currentStreakDays;
        this.passwordHash = passwordHash;
    }

    public Long getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getCourse() {
        return course;
    }

    public int getCurrentStreakDays() {
        return currentStreakDays;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setCurrentStreakDays(int currentStreakDays) {
        this.currentStreakDays = currentStreakDays;
    }
}
