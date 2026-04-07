package com.studentreel.platform.service;

import com.studentreel.platform.dto.AuthRequest;
import com.studentreel.platform.dto.AuthResponse;
import com.studentreel.platform.dto.RegisterRequest;
import com.studentreel.platform.entity.UserProfile;
import com.studentreel.platform.repository.UserProfileRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserProfileRepository userProfileRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserProfileRepository userProfileRepository, PasswordEncoder passwordEncoder) {
        this.userProfileRepository = userProfileRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse register(RegisterRequest request) {
        userProfileRepository.findByEmail(request.email()).ifPresent(user -> {
            throw new EntityExistsException("Email is already registered");
        });

        UserProfile user = userProfileRepository.save(new UserProfile(
                request.fullName(),
                request.email(),
                request.course(),
                0,
                passwordEncoder.encode(request.password())
        ));

        return toResponse(user);
    }

    public AuthResponse login(AuthRequest request) {
        UserProfile user = userProfileRepository.findByEmail(request.email())
                .orElseThrow(() -> new EntityNotFoundException("Invalid email or password"));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new EntityNotFoundException("Invalid email or password");
        }

        return toResponse(user);
    }

    private AuthResponse toResponse(UserProfile user) {
        return new AuthResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getCourse()
        );
    }
}
