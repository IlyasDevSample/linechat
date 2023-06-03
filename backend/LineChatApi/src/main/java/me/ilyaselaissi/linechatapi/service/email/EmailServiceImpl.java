package me.ilyaselaissi.linechatapi.service.email;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender mailSender;

    @Value("${app.frontend-url}")
    private String FRONTEND_URL;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendConfirmationEmail(String email, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreplay@linechat.chat");
        message.setTo(email);
        message.setSubject("Email Confirmation");
        message.setText("Please confirm your email address by clicking the link: "
                + FRONTEND_URL + "confirm-email?token=" + token
        );
        try {
            mailSender.send(message);
            log.info("Email sent to: " + email);
        } catch (Exception e) {
            log.error("Error sending email to: " + email + " " + e.getMessage());
        }
    }
}