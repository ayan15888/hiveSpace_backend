package com.project.hiveSpace.repository;

import com.project.hiveSpace.models.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, java.util.UUID> {

    Optional<Tenant> findByName(String name);

    Optional<Tenant> findBySlug(String slug);

    List<Tenant> findAllByOwnerEmail(String ownerEmail);
    
    @Query("SELECT DISTINCT t FROM Tenant t " +
           "LEFT JOIN Workspace w ON w.tenant = t " +
           "LEFT JOIN Employee e ON e.workspace = w " +
           "WHERE t.ownerEmail = :email " +
           "OR e.user.id = :userId")
    List<Tenant> findAllByOwnerEmailOrEmployeeUserId(@Param("email") String email, @Param("userId") UUID userId);

    long countByOwnerEmail(String ownerEmail);

    @Query("SELECT COUNT(DISTINCT t) FROM Tenant t " +
           "LEFT JOIN Workspace w ON w.tenant = t " +
           "LEFT JOIN Employee e ON e.workspace = w " +
           "WHERE t.ownerEmail = :email " +
           "OR e.user.id = :userId")
    long countByOwnerEmailOrEmployeeUserId(@Param("email") String email, @Param("userId") UUID userId);

    Optional<Tenant> findByIdAndActiveTrue(UUID id);
}
