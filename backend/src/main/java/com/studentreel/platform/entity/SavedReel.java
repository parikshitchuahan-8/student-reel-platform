package com.studentreel.platform.entity;

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
@Table(name = "saved_reels")
public class SavedReel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private UserProfile user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "reel_id", nullable = false)
    private StudyReel reel;

    private LocalDate nextReviewDate;
    private boolean reminderEnabled;

    protected SavedReel() {
    }

    public SavedReel(UserProfile user, StudyReel reel) {
        this.user = user;
        this.reel = reel;
        this.nextReviewDate = LocalDate.now().plusDays(1);
        this.reminderEnabled = true;
    }

    public Long getId() {
        return id;
    }

    public UserProfile getUser() {
        return user;
    }

    public StudyReel getReel() {
        return reel;
    }

    public LocalDate getNextReviewDate() {
        return nextReviewDate;
    }

    public void setNextReviewDate(LocalDate nextReviewDate) {
        this.nextReviewDate = nextReviewDate;
    }

    public boolean isReminderEnabled() {
        return reminderEnabled;
    }

    public void setReminderEnabled(boolean reminderEnabled) {
        this.reminderEnabled = reminderEnabled;
    }
}
