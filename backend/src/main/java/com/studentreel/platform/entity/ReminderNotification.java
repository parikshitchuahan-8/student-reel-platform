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
@Table(name = "reminder_notifications")
public class ReminderNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private UserProfile user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "reel_id", nullable = false)
    private StudyReel reel;

    @Column(nullable = false, length = 500)
    private String message;

    @Column(nullable = false)
    private LocalDate notificationDate;

    @Column(nullable = false)
    private boolean read;

    protected ReminderNotification() {
    }

    public ReminderNotification(UserProfile user, StudyReel reel, String message, LocalDate notificationDate) {
        this.user = user;
        this.reel = reel;
        this.message = message;
        this.notificationDate = notificationDate;
        this.read = false;
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

    public String getMessage() {
        return message;
    }

    public LocalDate getNotificationDate() {
        return notificationDate;
    }

    public boolean isRead() {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }
}
