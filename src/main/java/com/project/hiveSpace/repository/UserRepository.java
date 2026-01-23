package com.project.hiveSpace.repository;

import com.project.hiveSpace.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find a user by email and tenant (login)
    Optional<User> findByEmailAndTenantId(String email, Long tenantId);

    // List all users in a tenant
    List<User> findByTenantId(Long tenantId);

    // List only active users in a tenant
    List<User> findByTenantIdAndActiveTrue(Long tenantId);
}
