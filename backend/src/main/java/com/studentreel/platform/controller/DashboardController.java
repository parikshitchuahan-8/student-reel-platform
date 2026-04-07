package com.studentreel.platform.controller;

import com.studentreel.platform.model.DashboardSummary;
import com.studentreel.platform.model.PlannerSuggestion;
import com.studentreel.platform.service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public DashboardSummary getDashboard(@RequestParam(defaultValue = "1") Long userId) {
        return dashboardService.getDashboard(userId);
    }

    @GetMapping("/planner")
    public List<PlannerSuggestion> getPlannerSuggestions() {
        return dashboardService.getPlannerSuggestions();
    }
}
