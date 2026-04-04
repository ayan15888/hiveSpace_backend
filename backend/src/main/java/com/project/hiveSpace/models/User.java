package com.project.hiveSpace.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users", uniqueConstraints = {
                @UniqueConstraint(columnNames = { "email" })
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {

        @Id
        @GeneratedValue(strategy = GenerationType.UUID)
        private java.util.UUID id;

        @Column(nullable = false)
        private String email;

        @Column(nullable = false)
        private String username;

        @Builder.Default
        @Column(nullable = false)
        private Boolean active = true;

        @JsonIgnore
        @Column(nullable = false)
        private String password;

        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private Role role;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "tenant_id")
        private Tenant tenant;

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
                return List.of(new SimpleGrantedAuthority(role.name()));
        }

        @Override
        public String getUsername() {
                return email; // Using email as the primary login principal
        }

        public String getActualUsername() {
                return this.username; // Return the descriptive username field
        }

        @Override
        public boolean isAccountNonExpired() {
                return true;
        }

        @Override
        public boolean isAccountNonLocked() {
                return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
                return true;
        }

        @Override
        public boolean isEnabled() {
                return active != null ? active : true;
        }
}
