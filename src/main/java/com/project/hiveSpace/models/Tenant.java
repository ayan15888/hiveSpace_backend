package com.project.hiveSpace.models;


import jakarta.persistence.*;
import lombok.*;
//
@Entity
@Table(
        name = "tenants",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "name"),
                @UniqueConstraint(columnNames = "slug")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tenant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Company / workspace name
    @Column(nullable = false)
    private String name;

    // URL-friendly identifier (hivespace.com/{slug})
    @Column(nullable = false)
    private String slug;

    // Workspace active or suspended
    @Column(nullable = false)
    private boolean active = true;

    // FREE, PRO, ENTERPRISE
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Plan plan;

    // Tenant owner (initial admin)
    @Column(nullable = false)
    private String ownerEmail;

    // Optional description
    @Column(length = 500)
    private String description;
}
