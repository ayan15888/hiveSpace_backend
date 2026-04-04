package com.project.hiveSpace.services;

import com.project.hiveSpace.dto.UserResponse;
import com.project.hiveSpace.models.Role;
import com.project.hiveSpace.models.User;
import com.project.hiveSpace.repository.EmployeeRepository;
import com.project.hiveSpace.repository.TenantRepository;
import com.project.hiveSpace.repository.UserRepository;
import com.project.hiveSpace.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final TenantRepository tenantRepository;
    private final EmployeeRepository employeeRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    // REGISTER
    public UserResponse register(String email, String username, String password) {

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = User.builder()
                .email(email)
                .username(username)
                .password(passwordEncoder.encode(password))
                .active(true)
                .role(Role.USER)
                .build();

        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);

        return toResponse(user, jwtToken);
    }

    // LOGIN
    public UserResponse login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("Invalid email or password")
                );

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        if (!user.getActive()) {
            throw new IllegalArgumentException("User is inactive");
        }

        var jwtToken = jwtService.generateToken(user);
        return toResponse(user, jwtToken);
    }

    public User getCurrentUser() {
        Object principal = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof User) {
            return (User) principal;
        }
        throw new IllegalStateException("User not authenticated or invalid principal type");
    }

    public UserResponse getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return toResponse(user, null);
    }

    private UserResponse toResponse(User user, String token) {
        boolean hasTenants = (user.getTenant() != null) || 
                           (tenantRepository.countByOwnerEmail(user.getEmail()) > 0) || 
                           (employeeRepository.existsByUser(user));

        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getUsername(),
                user.getRole(),
                token,
                hasTenants
        );
    }
}
