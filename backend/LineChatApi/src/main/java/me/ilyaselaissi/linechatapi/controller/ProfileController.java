package me.ilyaselaissi.linechatapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/profile")
public class ProfileController {

    @GetMapping ("/details")
    public ResponseEntity<String> getProfileDetails() {
        return ResponseEntity.ok("Profile details");
    }
}
