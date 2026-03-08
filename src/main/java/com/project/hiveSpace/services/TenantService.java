package com.project.hiveSpace.services;

import com.project.hiveSpace.dto.TenantRequest;
import com.project.hiveSpace.dto.TenantResponse;
import com.project.hiveSpace.models.Tenant;
import com.project.hiveSpace.repository.TenantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TenantService {

    private final TenantRepository tenantRepository;

    @Transactional
    public TenantResponse createTenant(TenantRequest request) {
        if (tenantRepository.findByName(request.getName()).isPresent()) {
            throw new IllegalArgumentException("Organization name already exists");
        }
        if (tenantRepository.findBySlug(request.getSlug()).isPresent()) {
            throw new IllegalArgumentException("Slug already exists");
        }

        Tenant tenant = Tenant.builder()
                .name(request.getName())
                .slug(request.getSlug())
                .ownerEmail(request.getOwnerEmail())
                .plan(request.getPlan())
                .description(request.getDescription())
                .active(true)
                .build();

        Tenant savedTenant = tenantRepository.save(tenant);
        return mapToResponse(savedTenant);
    }

    private TenantResponse mapToResponse(Tenant tenant) {
        return new TenantResponse(
                tenant.getId(),
                tenant.getName(),
                tenant.getSlug(),
                tenant.getOwnerEmail(),
                tenant.getPlan(),
                tenant.isActive()
        );
    }
}
