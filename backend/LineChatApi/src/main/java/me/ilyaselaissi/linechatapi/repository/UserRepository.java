package me.ilyaselaissi.linechatapi.repository;

import me.ilyaselaissi.linechatapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);

    User findByUsername(String username);

    User findByEmail(String email);
}
