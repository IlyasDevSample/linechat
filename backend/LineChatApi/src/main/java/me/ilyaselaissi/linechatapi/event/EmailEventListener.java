package me.ilyaselaissi.linechatapi.event;

import me.ilyaselaissi.linechatapi.service.email.EmailService;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class EmailEventListener {
    EmailService emailService;
    public EmailEventListener(EmailService emailService) {
        this.emailService = emailService;
    }

    @EventListener(EmailEvent.class)
    public void onEmailEvent(EmailEvent emailEvent) {
        if (emailEvent.getSubject().equals(EmailEvent.CONFIRMATION_EMAIL)){
            emailService.sendConfirmationEmail(emailEvent.getRecipient(), emailEvent.getToken());
        } else if (emailEvent.getSubject().equals(EmailEvent.CHANGE_USER_PASSWORD)) {
            emailService.sendChangePasswordEmail(emailEvent.getRecipient());
        }
        else if (emailEvent.getSubject().equals(EmailEvent.FORGOT_PASSWORD_EMAIL)) {
            emailService.sendForgotPasswordEmail(emailEvent.getRecipient(), emailEvent.getToken());
        }

    }
}
