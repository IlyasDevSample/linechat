package me.ilyaselaissi.linechatapi.controller;

import me.ilyaselaissi.linechatapi.dto.PeopleDTO;
import me.ilyaselaissi.linechatapi.model.User;
import me.ilyaselaissi.linechatapi.service.user.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/people")
public class PeopleController {
    final UserService userService;

    public PeopleController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public List<PeopleDTO> getAllPeople() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        List<User> users = userService.getAllPeople();
        users.removeIf(user -> user.getUsername().equals(currentPrincipalName));
        return users.stream()
                .map(user -> new PeopleDTO(
                        user.getFullName(),
                        user.getUsername(),
                        user.getAvatar()
                ))
                .collect(Collectors.toList());
    }
}
