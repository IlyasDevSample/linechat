package me.ilyaselaissi.linechatapi.initializers;

import jakarta.annotation.PostConstruct;
import me.ilyaselaissi.linechatapi.common.PermissionNames;
import me.ilyaselaissi.linechatapi.model.Permission;
import me.ilyaselaissi.linechatapi.repository.PermissionRepository;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class PermissionInitializer {
    private final PermissionRepository permissionRepository;

    public PermissionInitializer(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    @PostConstruct
    public void init() {
        // Check if the permission already exists in the database
        List<Permission> permissions = permissionRepository.findAll();

        // If the permission doesn't exist, create it
        if (permissions.isEmpty()) {
            List<String> permissionNames = Arrays.asList(PermissionNames.ROLE_ADMIN, PermissionNames.ROLE_USER, PermissionNames.PREMIUM);
            List<String> permissionDescriptions = Arrays.asList("Admin role", "User role", "Premium Subscription");

            for (int i = 0; i < permissionNames.size(); i++) {
                String permissionName = permissionNames.get(i);
                String permissionDescription = permissionDescriptions.get(i);

                Permission permission = new Permission();
                permission.setName(permissionName);
                permission.setDescription(permissionDescription);
                permissionRepository.save(permission);
            }
        }

    }
}
