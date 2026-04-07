package com.studentreel.platform.service;

import com.studentreel.platform.dto.ReelCreateRequest;
import com.studentreel.platform.dto.ReelResponse;
import com.studentreel.platform.entity.SavedReel;
import com.studentreel.platform.entity.StudyReel;
import com.studentreel.platform.entity.UserProfile;
import com.studentreel.platform.repository.SavedReelRepository;
import com.studentreel.platform.repository.StudyReelRepository;
import com.studentreel.platform.repository.UserProfileRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReelService {

    private final StudyReelRepository studyReelRepository;
    private final UserProfileRepository userProfileRepository;
    private final SavedReelRepository savedReelRepository;

    public ReelService(
            StudyReelRepository studyReelRepository,
            UserProfileRepository userProfileRepository,
            SavedReelRepository savedReelRepository
    ) {
        this.studyReelRepository = studyReelRepository;
        this.userProfileRepository = userProfileRepository;
        this.savedReelRepository = savedReelRepository;
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
