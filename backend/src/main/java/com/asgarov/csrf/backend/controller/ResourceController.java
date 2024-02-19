package com.asgarov.csrf.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("resource")
public class ResourceController {

    @GetMapping
    public String getCurrentTime() {
        return "Hello, it is %s".formatted(LocalDateTime.now());
    }

    @PostMapping
    public String update() {
        return "Updated user data";
    }
}
