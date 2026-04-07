package com.studentreel.platform.controller;

import com.studentreel.platform.dto.ChatMessageRequest;
import com.studentreel.platform.dto.ChatMessageResponse;
import com.studentreel.platform.service.ChatService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ChatMessageResponse chat(@Valid @RequestBody ChatMessageRequest request) {
        return new ChatMessageResponse(chatService.respond(request.message()));
    }
}
