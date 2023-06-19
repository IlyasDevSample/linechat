package me.ilyaselaissi.linechatapi.repository;

import me.ilyaselaissi.linechatapi.model.MessageStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageStatusRepository extends JpaRepository<MessageStatus, Long> {
    MessageStatus findByStatus(String pending);
}
