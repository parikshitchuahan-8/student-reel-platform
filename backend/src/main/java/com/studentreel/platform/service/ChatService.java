package com.studentreel.platform.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final ChatClient chatClient;

    public ChatService(ObjectProvider<ChatClient.Builder> builderProvider) {
        ChatClient.Builder builder = builderProvider.getIfAvailable();
        this.chatClient = builder != null ? builder.build() : null;
    }

    public String respond(String message) {
        if (chatClient == null) {
            return """
                    Groq chat is not configured yet. Set GROQ_API_KEY and GROQ_MODEL,
                    then the study assistant will answer here.
                    """.strip();
        }

        return chatClient.prompt()
                .system("""
                        You are StudyMate, a concise academic productivity assistant.
                        Help with planning, study techniques, concept explanations, and motivation.
                        Keep answers short, actionable, and student-friendly.
                        """)
                .user(message)
                .call()
                .content();
    }
}
