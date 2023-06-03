package me.ilyaselaissi.linechatapi.repository;

import me.ilyaselaissi.linechatapi.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    Token findByTokenValue(String token);
}
