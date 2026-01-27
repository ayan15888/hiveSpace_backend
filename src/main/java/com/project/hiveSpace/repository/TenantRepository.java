//package com.project.hiveSpace.repository;
//
//import com.project.hiveSpace.models.Tenant;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.repository.CrudRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.Optional;
//
//@Repository
//public interface TenantRepository extends JpaRepository<Tenant, Long> {
//
//    Optional<Tenant> findByName(String name);
//
//    Optional<Tenant> findByOwnerEmail(String ownerEmail);
//
//    Optional<Tenant> findByIdAndActiveTrue(Long id);
//}
//
