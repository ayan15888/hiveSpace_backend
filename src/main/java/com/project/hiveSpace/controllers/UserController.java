package com.project.hiveSpace.controllers;

import com.project.hiveSpace.dto.LoginRequest;
import com.project.hiveSpace.dto.RegisterRequest;
import com.project.hiveSpace.dto.UserResponse;
import com.project.hiveSpace.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
// @RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {

        private final UserService userService;

        @PostMapping("/register")
        public ResponseEntity<UserResponse> register(
                        @Valid @RequestBody RegisterRequest req) {
                return ResponseEntity.ok(
                                userService.register(
                                                req.getEmail(),
                                                req.getUsername(),
                                                req.getPassword()));
        }

        @PostMapping("/login")
        public ResponseEntity<UserResponse> login(
                        @Valid @RequestBody LoginRequest req) {
                return ResponseEntity.ok(
                                userService.login(
                                                req.getEmail(),
                                                req.getPassword()));
        }
}
