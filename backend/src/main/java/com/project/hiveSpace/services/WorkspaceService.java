package com.project.hiveSpace.services;

import com.project.hiveSpace.dto.WorkspaceRequest;
import com.project.hiveSpace.dto.WorkspaceResponse;
import com.project.hiveSpace.models.Employee;
import com.project.hiveSpace.models.Role;
import com.project.hiveSpace.models.Tenant;
import com.project.hiveSpace.models.User;
import com.project.hiveSpace.models.Workspace;
import com.project.hiveSpace.repository.EmployeeRepository;
import com.project.hiveSpace.repository.TenantRepository;
import com.project.hiveSpace.repository.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkspaceService {

    private final WorkspaceRepository workspaceRepository;
    private final TenantRepository tenantRepository;
    private final EmployeeRepository employeeRepository;
    private final UserService userService;

    @Transactional
    public WorkspaceResponse createWorkspace(WorkspaceRequest request) {
        Tenant tenant = tenantRepository.findById(request.getTenantId())
                .orElseThrow(() -> new IllegalArgumentException("Tenant not found"));

        User currentUser = getCurrentUser();
        // ISOLATION CHECK: User must belong to the tenant they are creating a workspace for, or be an owner/admin
        boolean isOrgOwner = currentUser.getEmail().equalsIgnoreCase(tenant.getOwnerEmail());
        boolean isGlobalOwner = currentUser.getRole() == Role.OWNER || currentUser.getRole() == Role.ADMIN;
        boolean isPrimaryTenantUser = currentUser.getTenant() != null && currentUser.getTenant().getId().equals(tenant.getId());

        if (!isOrgOwner && !isGlobalOwner && !isPrimaryTenantUser) {
             throw new IllegalArgumentException("You are not authorized to create a workspace for this organization");
        }

        // Check workspace name uniqueness within this tenant
        if (workspaceRepository.existsByNameAndTenant(request.getName(), tenant)) {
            throw new IllegalArgumentException(
                    "A workspace with the name '" + request.getName() + "' already exists in this organization");
        }

        Workspace workspace = Workspace.builder()
                .name(request.getName())
                .description(request.getDescription())
                .plan(request.getPlan())
                .tenant(tenant)
                .createdAt(new Date())
                .updatedAt(new Date())
                .build();

        Workspace savedWorkspace = workspaceRepository.save(workspace);

        // Automatically add the creator as an OWNER of this workspace
        // User currentUser = getCurrentUser(); // Already fetched above
        Employee ownerEmployee = Employee.builder()
                .user(currentUser)
                .workspace(savedWorkspace)
                .team(null) // Workspace-level owner
                .username(currentUser.getUsername())
                .role("OWNER")
                .createdAt(new Date())
                .updatedAt(new Date())
                .build();
        employeeRepository.save(ownerEmployee);

        // Increment workspaces count on tenant
        tenant.setWorkspacesCount(tenant.getWorkspacesCount() + 1);
        tenantRepository.save(tenant);

        return mapToResponse(savedWorkspace);
    }

    private User getCurrentUser() {
        return userService.getCurrentUser();
    }

    @Transactional(readOnly = true)
    public List<WorkspaceResponse> getWorkspacesByTenant(UUID tenantId) {
        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new IllegalArgumentException("Tenant not found"));

        User currentUser = getCurrentUser();
        // ISOLATION CHECK: User must belong to the tenant they are requesting workspaces for, or be an owner/admin
        boolean isOrgOwner = currentUser.getEmail().equalsIgnoreCase(tenant.getOwnerEmail());
        boolean isGlobalOwner = currentUser.getRole() == Role.OWNER || currentUser.getRole() == Role.ADMIN;
        boolean isPrimaryTenantUser = currentUser.getTenant() != null && currentUser.getTenant().getId().equals(tenantId);
        boolean isMember = employeeRepository.existsByUserIdAndWorkspaceTenantId(currentUser.getId(), tenantId);

        if (!isOrgOwner && !isGlobalOwner && !isPrimaryTenantUser && !isMember) {
             throw new IllegalArgumentException("You are not authorized to view workspaces for this organization");
        }

        return workspaceRepository.findAllByTenantId(tenantId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private WorkspaceResponse mapToResponse(Workspace workspace) {
        return new WorkspaceResponse(
                workspace.getId(),
                workspace.getName(),
                workspace.getDescription(),
                workspace.getPlan(),
                workspace.getTenant().getId(),
                workspace.getCreatedAt(),
                workspace.getUpdatedAt()
        );
    }
}
