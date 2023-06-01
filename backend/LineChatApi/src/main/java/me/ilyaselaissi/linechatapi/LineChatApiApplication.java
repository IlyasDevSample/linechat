package me.ilyaselaissi.linechatapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class LineChatApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(LineChatApiApplication.class, args);
	}

}
