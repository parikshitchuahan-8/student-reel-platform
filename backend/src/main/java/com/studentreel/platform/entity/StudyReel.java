package com.studentreel.platform.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "study_reels")
public class StudyReel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private String durationLabel;

    @Column(nullable = false, length = 500)
    private String takeaway;

    @Column(length = 1000)
    private String videoUrl;

    @Column(length = 1000)
    private String transcriptUrl;

    protected StudyReel() {
    }

    public StudyReel(String title, String subject, String durationLabel, String takeaway, String videoUrl, String transcriptUrl) {
        this.title = title;
        this.subject = subject;
        this.durationLabel = durationLabel;
        this.takeaway = takeaway;
        this.videoUrl = videoUrl;
        this.transcriptUrl = transcriptUrl;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getSubject() {
        return subject;
    }

    public String getDurationLabel() {
        return durationLabel;
    }

    public String getTakeaway() {
        return takeaway;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public String getTranscriptUrl() {
        return transcriptUrl;
    }
}
