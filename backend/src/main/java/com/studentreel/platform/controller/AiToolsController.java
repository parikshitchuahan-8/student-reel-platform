package com.studentreel.platform.controller;

import com.studentreel.platform.dto.StudyPlanRequest;
import com.studentreel.platform.dto.SummaryRequest;
import com.studentreel.platform.service.PythonAiService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiToolsController {

    private final PythonAiService pythonAiService;

    public AiToolsController(PythonAiService pythonAiService) {
        this.pythonAiService = pythonAiService;
    }

    @PostMapping("/study-plan")
    public Map<String, Object> generateStudyPlan(@Valid @RequestBody StudyPlanRequest request) {
        return pythonAiService.generateStudyPlan(request);
    }

    @PostMapping("/summarize")
    public Map<String, Object> summarize(@Valid @RequestBody SummaryRequest request) {
        return pythonAiService.summarize(request);
    }
}
