package com.studentreel.platform.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ReminderEmailService {

    private static final Logger logger = LoggerFactory.getLogger(ReminderEmailService.class);

    public void sendReminder(String email, String message) {
        logger.info("Reminder email placeholder to {} -> {}", email, message);
    }
}
