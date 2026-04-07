package com.studentreel.platform.service;

import com.studentreel.platform.dto.ReelCreateRequest;
import com.studentreel.platform.dto.ReelQuizAttemptRequest;
import com.studentreel.platform.dto.ReelResponse;
import com.studentreel.platform.dto.SavedReelReminderRequest;
import com.studentreel.platform.dto.SavedReelResponse;
import com.studentreel.platform.entity.ReelQuizAttempt;
import com.studentreel.platform.entity.SavedReel;
import com.studentreel.platform.entity.StudyReel;
import com.studentreel.platform.entity.UserProfile;
import com.studentreel.platform.repository.ReelQuizAttemptRepository;
import com.studentreel.platform.repository.SavedReelRepository;
import com.studentreel.platform.repository.StudyReelRepository;
import com.studentreel.platform.repository.UserProfileRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReelService {

    private final StudyReelRepository studyReelRepository;
    private final UserProfileRepository userProfileRepository;
    private final SavedReelRepository savedReelRepository;
    private final ReelQuizAttemptRepository reelQuizAttemptRepository;

    public ReelService(
            StudyReelRepository studyReelRepository,
            UserProfileRepository userProfileRepository,
            SavedReelRepository savedReelRepository,
            ReelQuizAttemptRepository reelQuizAttemptRepository
    ) {
        this.studyReelRepository = studyReelRepository;
        this.userProfileRepository = userProfileRepository;
        this.savedReelRepository = savedReelRepository;
        this.reelQuizAttemptRepository = reelQuizAttemptRepository;
    }

    public List<ReelResponse> listReels() {
        return studyReelRepository.findTop6ByOrderByIdAsc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public ReelResponse createReel(ReelCreateRequest request) {
        StudyReel reel = studyReelRepository.save(new StudyReel(
                request.title(),
                request.subject(),
                request.duration(),
                request.takeaway(),
                request.videoUrl(),
                request.transcriptUrl()
        ));

        return toResponse(reel);
    }

    public void saveReel(Long reelId, Long userId) {
        StudyReel reel = studyReelRepository.findById(reelId)
                .orElseThrow(() -> new EntityNotFoundException("Reel not found"));
        UserProfile user = userProfileRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (!savedReelRepository.existsByUserIdAndReelId(userId, reelId)) {
            savedReelRepository.save(new SavedReel(user, reel));
        }
    }

    public List<SavedReelResponse> listSavedReels(Long userId) {
        return savedReelRepository.findByUserIdOrderByIdDesc(userId)
                .stream()
                .map(savedReel -> toSavedReelResponse(savedReel, userId))
                .toList();
    }

    public List<SavedReelResponse> listDueReels(Long userId) {
        return savedReelRepository.findByUserIdAndNextReviewDateLessThanEqualOrderByNextReviewDateAsc(userId, LocalDate.now())
                .stream()
                .map(savedReel -> toSavedReelResponse(savedReel, userId))
                .toList();
    }

    public void recordQuizAttempt(Long reelId, ReelQuizAttemptRequest request) {
        StudyReel reel = studyReelRepository.findById(reelId)
                .orElseThrow(() -> new EntityNotFoundException("Reel not found"));
        UserProfile user = userProfileRepository.findById(request.userId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        SavedReel savedReel = savedReelRepository.findByUserIdAndReelId(request.userId(), reelId)
                .orElseThrow(() -> new EntityNotFoundException("Saved reel not found"));

        reelQuizAttemptRepository.save(new ReelQuizAttempt(
                user,
                reel,
                request.score(),
                request.totalQuestions(),
                LocalDateTime.now()
        ));

        savedReel.setNextReviewDate(calculateNextReviewDate(request.score(), request.totalQuestions()));
        savedReelRepository.save(savedReel);
    }

    public void updateReminder(Long reelId, SavedReelReminderRequest request) {
        SavedReel savedReel = savedReelRepository.findByUserIdAndReelId(request.userId(), reelId)
                .orElseThrow(() -> new EntityNotFoundException("Saved reel not found"));

        savedReel.setReminderEnabled(request.reminderEnabled());
        savedReelRepository.save(savedReel);
    }

    private LocalDate calculateNextReviewDate(int score, int totalQuestions) {
        if (score >= totalQuestions) {
            return LocalDate.now().plusDays(7);
        }

        if (score >= Math.max(1, totalQuestions - 1)) {
            return LocalDate.now().plusDays(3);
        }

        return LocalDate.now().plusDays(1);
    }

    private SavedReelResponse toSavedReelResponse(SavedReel savedReel, Long userId) {
        StudyReel reel = savedReel.getReel();
        ReelQuizAttempt latestAttempt = reelQuizAttemptRepository
                .findTopByUserIdAndReelIdOrderByAttemptedAtDesc(userId, reel.getId())
                .orElse(null);

        return new SavedReelResponse(
                reel.getId(),
                reel.getTitle(),
                reel.getSubject(),
                reel.getDurationLabel(),
                reel.getTakeaway(),
                reel.getVideoUrl(),
                reel.getTranscriptUrl(),
                latestAttempt != null ? latestAttempt.getScore() : null,
                latestAttempt != null ? latestAttempt.getTotalQuestions() : null,
                latestAttempt != null,
                savedReel.getNextReviewDate() != null ? savedReel.getNextReviewDate().toString() : null,
                savedReel.isReminderEnabled()
        );
    }

    private ReelResponse toResponse(StudyReel reel) {
        return new ReelResponse(
                reel.getId(),
                reel.getTitle(),
                reel.getSubject(),
                reel.getDurationLabel(),
                reel.getTakeaway(),
                reel.getVideoUrl(),
                reel.getTranscriptUrl()
        );
    }
}
