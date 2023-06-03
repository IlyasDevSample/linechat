package me.ilyaselaissi.linechatapi.service.email;

public interface EmailService {
    void sendConfirmationEmail(String email, String token);

    void sendChangePasswordEmail(String recipient);
}
