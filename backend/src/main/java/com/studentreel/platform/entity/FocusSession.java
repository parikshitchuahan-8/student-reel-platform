package com.studentreel.platform.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "focus_sessions")
public class FocusSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private UserProfile user;

    @Column(nullable = false)
    private LocalDate sessionDate;

    @Column(nullable = false)
    private int durationMinutes;

    protected FocusSession() {
    }

    public FocusSession(UserProfile user, LocalDate sessionDate, int durationMinutes) {
        this.user = user;
        this.sessionDate = sessionDate;
        this.durationMinutes = durationMinutes;
    }

    public Long getId() {
        return id;
    }

    public UserProfile getUser() {
        return user;
    }

    public LocalDate getSessionDate() {
        return sessionDate;
    }

    public int getDurationMinutes() {
        return durationMinutes;
    }
}
