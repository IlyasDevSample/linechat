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
        emailService.sendConfirmationEmail(emailEvent.getRecipient(), emailEvent.getToken());
    }
}
