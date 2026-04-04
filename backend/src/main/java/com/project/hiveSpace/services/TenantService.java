package com.project.hiveSpace.services;

import com.project.hiveSpace.dto.TenantRequest;
import com.project.hiveSpace.dto.TenantResponse;
import com.project.hiveSpace.models.Role;
import com.project.hiveSpace.models.Tenant;
import com.project.hiveSpace.models.User;
import com.project.hiveSpace.repository.TenantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TenantService {

    private final TenantRepository tenantRepository;
    private final com.project.hiveSpace.repository.UserRepository userRepository;

    @Transactional
    public TenantResponse createTenant(TenantRequest request) {
        User currentUser = getCurrentUser();

        if (tenantRepository.findByName(request.getName()).isPresent()) {
            throw new IllegalArgumentException("Organization name already exists");
        }
        if (tenantRepository.findBySlug(request.getSlug()).isPresent()) {
            throw new IllegalArgumentException("Slug already exists");
        }

        Tenant tenant = Tenant.builder()
                .name(request.getName())
                .slug(request.getSlug())
                .ownerEmail(currentUser.getEmail())
                .plan(request.getPlan())
                .description(request.getDescription())
                .active(true)
                .membersCount(1)
                .workspacesCount(0)
                .build();

        Tenant savedTenant = tenantRepository.save(tenant);

        // Promote user to OWNER if they aren't already an owner or admin
        if (currentUser.getRole() != Role.OWNER && currentUser.getRole() != Role.ADMIN) {
            currentUser.setRole(Role.OWNER);
            userRepository.save(currentUser);
        }

        return mapToResponse(savedTenant);
    }

    private User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof User) {
            return (User) principal;
        }
        throw new IllegalStateException("User not authenticated");
    }

    private TenantResponse mapToResponse(Tenant tenant) {
        return new TenantResponse(
                tenant.getId(),
                tenant.getName(),
                tenant.getSlug(),
                tenant.getOwnerEmail(),
                tenant.getPlan(),
                tenant.isActive(),
                tenant.getMembersCount(),
                tenant.getWorkspacesCount()
        );
    }

    public long getTenantCountByOwnerId(UUID userId) {
        validateOwnership(userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return tenantRepository.countByOwnerEmail(user.getEmail());
    }

    public List<TenantResponse> getTenantsByOwnerId(UUID userId) {
        validateOwnership(userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return tenantRepository.findAllByOwnerEmail(user.getEmail()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private void validateOwnership(UUID userId) {
        User currentUser = getCurrentUser();
        if (!currentUser.getId().equals(userId)) {
            throw new IllegalArgumentException("You are not authorized to view these organizations");
        }
    }
}
