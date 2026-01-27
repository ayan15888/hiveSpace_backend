package com.project.hiveSpace.repository;

import com.project.hiveSpace.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<User> findByUsername(String username);

//    List<User> findByTenantId(Long tenantId);

//    List<User> findByTenantIdAndActiveTrue(Long tenantId);
}
