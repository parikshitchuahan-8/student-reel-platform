package com.studentreel.platform.repository;

import com.studentreel.platform.entity.StudyReel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudyReelRepository extends JpaRepository<StudyReel, Long> {
    List<StudyReel> findTop6ByOrderByIdAsc();
}
