package me.ilyaselaissi.linechatapi.service.email;

import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Date;

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
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("noreply@linechat.chat");
            helper.setTo(email);
            helper.setSubject("LineChat - Confirm your email address");

            // Create the HTML content with a link
            String confirmationLink = FRONTEND_URL + "/confirm-email?token=" + token;
            String htmlContent = "<html>"
                    + "<head>"
                    + "<style>"
                    + "h1 { color: #333; }"
                    + "p { color: #666; }"
                    + "a { color: #007bff; text-decoration: none; }"
                    + "</style>"
                    + "</head>"
                    + "<body>"
                    + "<h1>LineChat</h1>"
                    + "<p>Thank you for registering with LineChat. Please click on the link below to confirm your email address:</p>"
                    + "<p>Please click <a href=\"" + confirmationLink + "\">here</a> to confirm your email.</p>"
                    + "<p>If the hyperlink doesn't work, you can copy and paste the following URL into your browser:</p>"
                    + "<p>" + confirmationLink + "</p>"
                    + "<small>This link will expire in 24 hours.</small>"
                    + "<p>If you did not register with LineChat, please ignore this email.</p>"
                    + "<p>Thank you,</p>"
                    + "<p>LineChat Team</p>"
                    + "</body>"
                    + "</html>";
            helper.setText(htmlContent, true);

            // Set the Date
            helper.setSentDate(new Date());

            mailSender.send(message);
            log.info("Email sent to: " + email);
        } catch (Exception e) {
            log.error("Error sending email to: " + email + " " + e.getMessage());
        }
    }

    @Override
    public void sendChangePasswordEmail(String recipient) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("noreply@linechat.chat");
            helper.setTo(recipient);
            helper.setSubject("LineChat - your password has been changed successfully");

            // Create the HTML content
            String htmlContent = "<html>"
                    + "<head>"
                    + "<style>"
                    + "h1 { color: #333; }"
                    + "p { color: #666; }"
                    + "a { color: #007bff; text-decoration: none; }"
                    + "</style>"
                    + "</head>"
                    + "<body>"
                    + "<h1>LineChat</h1>"
                    + "<p>Your password has been changed successfully.</p>"
                    + "<p>If you did not change your password, please contact us immediately.</p>"
                    + "<p>Thank you,</p>"
                    + "<p>LineChat Team</p>"
                    + "</body>"
                    + "</html>";
            helper.setText(htmlContent, true);
            // Set the Date
            helper.setSentDate(new Date());
            mailSender.send(message);
            log.info("Email sent to: " + recipient);

        }catch (Exception e) {
            log.error("Error sending email to: " + recipient + " " + e.getMessage());
        }
    }

    @Override
    public void sendForgotPasswordEmail(String recipient, String token) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("noreply@linechat.chat");
            helper.setTo(recipient);
            helper.setSubject("LineChat - Reset your password");

            // Create the HTML content with a link
            String resetPasswordLink = FRONTEND_URL + "/reset-password?token=" + token;

            String htmlContent = "<html>"
                    + "<head>"
                    + "<style>"
                    + "h1 { color: #333; }"
                    + "p { color: #666; }"
                    + "a { color: #007bff; text-decoration: none; }"
                    + "small { color: #999; }"
                    + "</style>"
                    + "</head>"
                    + "<body>"
                    + "<h1>LineChat</h1>"
                    + "<p>You have requested to reset your password. Please click on the link below to reset your password:</p>"
                    + "<p>Please click <a href=\"" + resetPasswordLink + "\">here</a> to reset your password.</p>"
                    + "<p>If the hyperlink doesn't work, you can copy and paste the following URL into your browser:</p>"
                    + "<p>" + resetPasswordLink + "</p>"
                    + "<small>This link will expire in 10 minutes.</small>"
                    + "<p>Thank you,</p>"
                    + "<p>LineChat Team</p>"
                    + "</body>"
                    + "</html>";
            helper.setText(htmlContent, true);
            // Set the Date
            helper.setSentDate(new Date());
            mailSender.send(message);
            log.info("Email sent to: " + recipient);

        }catch (Exception e) {
            log.error("Error sending email to: " + recipient + " " + e.getMessage());
        }
    }
}