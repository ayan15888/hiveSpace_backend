package com.project.hiveSpace.services;

import com.project.hiveSpace.dto.ProjectRequest;
import com.project.hiveSpace.dto.ProjectResponse;
import com.project.hiveSpace.models.Project;
import com.project.hiveSpace.models.Workspace;
import com.project.hiveSpace.repository.ProjectRepository;
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
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final WorkspaceRepository workspaceRepository;
    private final com.project.hiveSpace.repository.TenantRepository tenantRepository;

    @Transactional
    public ProjectResponse createProject(String tenantSlug, UUID workspaceId, ProjectRequest request) {
        com.project.hiveSpace.models.Tenant tenant = tenantRepository.findBySlug(tenantSlug)
                .orElseThrow(() -> new IllegalArgumentException("Tenant with slug not found"));

        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new IllegalArgumentException("Workspace not found"));

        if (!workspace.getTenant().getId().equals(tenant.getId())) {
             throw new IllegalArgumentException("Workspace does not belong to the given tenant");
        }

        if (projectRepository.existsByNameAndWorkspace(request.getName(), workspace)) {
            throw new IllegalArgumentException(
                    "A project with the name '" + request.getName() + "' already exists in this workspace");
        }

        Project project = Project.builder()
                .name(request.getName())
                .description(request.getDescription())
                .status(request.getStatus())
                .workspace(workspace)
                .teamsCount(0)
                .membersCount(1) // Assuming creator is a member initially
                .createdAt(new Date())
                .updatedAt(new Date())
                .build();

        Project savedProject = projectRepository.save(project);
        return mapToResponse(savedProject);
    }

    public List<ProjectResponse> getProjectsByWorkspace(String tenantSlug, UUID workspaceId) {
        com.project.hiveSpace.models.Tenant tenant = tenantRepository.findBySlug(tenantSlug)
                .orElseThrow(() -> new IllegalArgumentException("Tenant with slug not found"));

        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new IllegalArgumentException("Workspace not found"));

        if (!workspace.getTenant().getId().equals(tenant.getId())) {
            throw new IllegalArgumentException("Workspace does not belong to the given tenant");
        }

        return projectRepository.findAllByWorkspace(workspace)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private ProjectResponse mapToResponse(Project project) {
        return ProjectResponse.builder()
                .id(project.getId())
                .name(project.getName())
                .description(project.getDescription())
                .status(project.getStatus())
                .teamsCount(project.getTeamsCount())
                .membersCount(project.getMembersCount())
                .workspaceId(project.getWorkspace().getId())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }
}
