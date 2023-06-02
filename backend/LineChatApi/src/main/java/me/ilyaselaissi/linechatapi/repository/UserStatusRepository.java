package me.ilyaselaissi.linechatapi.repository;

import me.ilyaselaissi.linechatapi.model.UserStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserStatusRepository extends JpaRepository<UserStatus, Long> {

    UserStatus findByStatusType(String unknown);
}
