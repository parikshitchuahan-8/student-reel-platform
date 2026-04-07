package com.studentreel.platform.controller;

import com.studentreel.platform.dto.ReelCreateRequest;
import com.studentreel.platform.dto.ReelQuizRequest;
import com.studentreel.platform.dto.ReelResponse;
import com.studentreel.platform.dto.SavedReelRequest;
import com.studentreel.platform.service.PythonAiService;
import com.studentreel.platform.service.ReelService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reels")
public class ReelController {

    private final ReelService reelService;
    private final PythonAiService pythonAiService;

    public ReelController(ReelService reelService, PythonAiService pythonAiService) {
        this.reelService = reelService;
        this.pythonAiService = pythonAiService;
    }

    @GetMapping
    public List<ReelResponse> listReels() {
        return reelService.listReels();
    }

    @PostMapping
    public ReelResponse createReel(@Valid @RequestBody ReelCreateRequest request) {
        return reelService.createReel(request);
    }

    @PostMapping("/quiz")
    public Map<String, Object> generateQuiz(@Valid @RequestBody ReelQuizRequest request) {
        return pythonAiService.generateReelQuiz(request);
    }

    @PostMapping("/{reelId}/save")
    public void saveReel(@PathVariable Long reelId, @Valid @RequestBody SavedReelRequest request) {
        reelService.saveReel(reelId, request.userId());
    }
}
