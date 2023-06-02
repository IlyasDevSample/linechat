package me.ilyaselaissi.linechatapi.repository;

import me.ilyaselaissi.linechatapi.model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {
    Permission findByName(String roleUser);
}
