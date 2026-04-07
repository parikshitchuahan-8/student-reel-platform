package com.studentreel.platform.service;

import com.studentreel.platform.dto.ReelQuizRequest;
import com.studentreel.platform.dto.StudyPlanRequest;
import com.studentreel.platform.dto.SummaryRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PythonAiService {

    private final RestClient restClient;

    public PythonAiService(@Value("${app.python-ai.base-url}") String pythonAiBaseUrl) {
        this.restClient = RestClient.builder()
                .baseUrl(normalizeBaseUrl(pythonAiBaseUrl))
                .build();
    }

    private String normalizeBaseUrl(String pythonAiBaseUrl) {
        if (pythonAiBaseUrl.startsWith("http://") || pythonAiBaseUrl.startsWith("https://")) {
            return pythonAiBaseUrl;
        }
        return "http://" + pythonAiBaseUrl;
    }

    public Map<String, Object> generateStudyPlan(StudyPlanRequest request) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("subject", request.subject());
        payload.put("available_hours", request.availableHours());
        payload.put("weak_areas", request.weakAreas() != null ? request.weakAreas() : List.of());
        payload.put("deadline", request.deadline());

        return restClient.post()
                .uri("/ai/study-plan")
                .body(payload)
                .retrieve()
                .body(Map.class);
    }

    public Map<String, Object> summarize(SummaryRequest request) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("title", request.title());
        payload.put("content", request.content());

        return restClient.post()
                .uri("/ai/summarize")
                .body(payload)
                .retrieve()
                .body(Map.class);
    }

    public Map<String, Object> generateReelQuiz(ReelQuizRequest request) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("title", request.title());
        payload.put("subject", request.subject());
        payload.put("takeaway", request.takeaway());

        return restClient.post()
                .uri("/ai/reel-quiz")
                .body(payload)
                .retrieve()
                .body(Map.class);
    }
}
