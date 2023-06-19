package me.ilyaselaissi.linechatapi.repository;

import me.ilyaselaissi.linechatapi.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
}
