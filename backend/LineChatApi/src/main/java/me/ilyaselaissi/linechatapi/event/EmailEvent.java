package me.ilyaselaissi.linechatapi.event;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmailEvent {
    public static final String CONFIRMATION_EMAIL = "Confirmation Email";
    public static final String CHANGE_USER_PASSWORD= "Change User Password";
    public static final String FORGOT_PASSWORD_EMAIL = "Forgot Password";
    private String recipient;
    private String token;
    private String subject;
    private String message;
}
