package me.ilyaselaissi.linechatapi.service.user;

import me.ilyaselaissi.linechatapi.common.PermissionNames;
import me.ilyaselaissi.linechatapi.common.UserStatusNames;
import me.ilyaselaissi.linechatapi.dto.ChangePasswordDTO;
import me.ilyaselaissi.linechatapi.dto.ResetPasswordDTO;
import me.ilyaselaissi.linechatapi.dto.UserDTO;
import me.ilyaselaissi.linechatapi.event.EmailEvent;
import me.ilyaselaissi.linechatapi.event.EmailEventPublisher;
import me.ilyaselaissi.linechatapi.exceptions.token.InvalidTokenException;
import me.ilyaselaissi.linechatapi.exceptions.user.DuplicateUserException;
import me.ilyaselaissi.linechatapi.exceptions.user.InvalidUserException;
import me.ilyaselaissi.linechatapi.model.Permission;
import me.ilyaselaissi.linechatapi.model.Token;
import me.ilyaselaissi.linechatapi.model.User;
import me.ilyaselaissi.linechatapi.model.UserStatus;
import me.ilyaselaissi.linechatapi.repository.PermissionRepository;
import me.ilyaselaissi.linechatapi.repository.TokenRepository;
import me.ilyaselaissi.linechatapi.repository.UserRepository;
import me.ilyaselaissi.linechatapi.repository.UserStatusRepository;
import me.ilyaselaissi.linechatapi.util.TokenGenerator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserStatusRepository userStatusRepository;
    private final EmailEventPublisher emailEventPublisher;
    private final PermissionRepository permissionRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(
            UserRepository userRepository,
            UserStatusRepository userStatusRepository,
            EmailEventPublisher emailEventPublisher,
            PermissionRepository permissionRepository,
            TokenRepository tokenRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.userStatusRepository = userStatusRepository;
        this.emailEventPublisher = emailEventPublisher;
        this.permissionRepository = permissionRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User register(UserDTO userDTO) {
        //  validate user fields
        validateField(userDTO.fullName(), "Full name");
        validateField(userDTO.username(), "Username");
        validateField(userDTO.password(), "Password");

        //  check if user exists in database
        if (userRepository.existsByUsername(userDTO.username())) {
            throw new DuplicateUserException("User already exists");
        }
        //  create user
        User user = new User();
        user.setUsername(userDTO.username());
        // encrypt password before saving it to database
        String encryptedPassword = passwordEncoder.encode(userDTO.password());
        user.setPassword(encryptedPassword);
        // adding User permissions to user
        Permission permission = permissionRepository.findByName(PermissionNames.ROLE_USER);
        user.setPermissions(Collections.singletonList(permission));
        user.setFullName(userDTO.fullName());
        user.setEmail(userDTO.username());
        user.setEmailVerified(false);
        user.setEnable(true);
        user.setLastActive(new java.sql.Timestamp(System.currentTimeMillis()));
        // get user status from database
        UserStatus userStatus = userStatusRepository.findByStatusType(UserStatusNames.UNKNOWN);
        user.setUserStatus(userStatus);
        //  save user to database
        try {
            User savedUser = userRepository.save(user);
            SendEmailWithTokenAndSaveToUser(savedUser);
            return savedUser;
        }
        catch (Exception e) {
            throw new InvalidUserException("Invalid user");
        }
    }



    @Override
    public void confirmEmail(String token) {
        //  check if token exists in database
        Token emailConfirmationToken = tokenRepository.findByTokenValue(token);
        validateToken(emailConfirmationToken, TokenGenerator.EMAIL_CONFIRMATION_TOKEN_TYPE);
        if (emailConfirmationToken.getUser().isEmailVerified()){
            throw new InvalidTokenException("User email already verified");
        }
        //  get user from token
        User user = emailConfirmationToken.getUser();
        //  set user email verified to true
        user.setEmailVerified(true);
        //  save user to database
        userRepository.save(user);
        //  set token to used
        emailConfirmationToken.setUsed(true);
        //  save token to database
        tokenRepository.save(emailConfirmationToken);
    }

    @Override
    public void resendConfirmationEmail(String username) {
        //  check if user exists in database
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new InvalidUserException("Invalid user");
        }
        //  check if user email is verified
        if (user.isEmailVerified()) {
            throw new InvalidUserException("User Email already verified");
        }
        //  check if user email is enabled
        if (!user.isEnable()) {
            throw new InvalidUserException("User is disabled");
        }
        SendEmailWithTokenAndSaveToUser(user);
    }

    @Override
    public void changePassword(ChangePasswordDTO changePasswordDTO) {
        //  validate user fields
        validateField(changePasswordDTO.username(), "Username");
        validateField(changePasswordDTO.oldPassword(), "Old password");
        validateField(changePasswordDTO.newPassword(), "New password");
        //  check if user exists in database
        User user = userRepository.findByUsername(changePasswordDTO.username());
        if (user == null) {
            throw new InvalidUserException("Invalid user");
        }
        //  check if user email is verified
        if (!user.isEmailVerified()) {
            throw new InvalidUserException("User Email not verified");
        }
        //  check if user email is enabled
        if (!user.isEnable()) {
            throw new InvalidUserException("User is disabled");
        }
        //  check if old password is correct
        if (!passwordEncoder.matches(changePasswordDTO.oldPassword(), user.getPassword())) {
            throw new InvalidUserException("Invalid old password");
        }
        //  change password
        user.setPassword(passwordEncoder.encode(changePasswordDTO.newPassword()));
        //  save user to database
        try {
            userRepository.save(user);
        }catch (Exception e){
            throw new InvalidUserException("Invalid user");
        }
        EmailEvent emailEvent = new EmailEvent();
        emailEvent.setSubject(EmailEvent.CHANGE_USER_PASSWORD);
        emailEvent.setRecipient(user.getEmail());
        emailEventPublisher.publishEmailEvent(emailEvent);
    }

    @Override
    public void forgotPassword(String email) {
        // check if user exists in database
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new InvalidUserException("Invalid user email");
        }
        //  check if user email is verified
        if (!user.isEmailVerified()) {
            throw new InvalidUserException("User Email not verified");
        }
        //  check if user is enabled
        if (!user.isEnable()) {
            throw new InvalidUserException("User is disabled");
        }
        //  publish event
        EmailEvent emailEvent = new EmailEvent();
        emailEvent.setRecipient(user.getEmail());
        emailEvent.setSubject(EmailEvent.FORGOT_PASSWORD_EMAIL);
        // Generate token
        String token = TokenGenerator.generateRandomStringToken();
        emailEvent.setToken(token);
        emailEventPublisher.publishEmailEvent(emailEvent);
        Token forgotPasswordToken = new Token();
        forgotPasswordToken.setTokenValue(token);
        forgotPasswordToken.setUser(user);
        forgotPasswordToken.setTokenType(TokenGenerator.PASSWORD_RESET_TOKEN_TYPE);
        // set token expiry date to 10 minutes
        forgotPasswordToken.setExpiryDate(new java.sql.Timestamp(System.currentTimeMillis() + 10 * 60 * 1000));// 10 minutes
        tokenRepository.save(forgotPasswordToken);
    }

    @Override
    public void resetPassword(ResetPasswordDTO resetPasswordDTO) {
        // validate user fields
        validateField(resetPasswordDTO.password(), "Password");
        validateField(resetPasswordDTO.token(), "Token");
        //  check if token exists in database
        Token forgotPasswordToken = tokenRepository.findByTokenValue(resetPasswordDTO.token());
        //  check if token is valid
        validateToken(forgotPasswordToken, TokenGenerator.PASSWORD_RESET_TOKEN_TYPE);
        // set token to used
        forgotPasswordToken.setUsed(true);
        //  save token to database
        tokenRepository.save(forgotPasswordToken);
        //  get user from token
        User user = forgotPasswordToken.getUser();
        //  set user password
        user.setPassword(passwordEncoder.encode(resetPasswordDTO.password()));
        //  save user to database
        userRepository.save(user);
        EmailEvent emailEvent = new EmailEvent();
        emailEvent.setSubject(EmailEvent.CHANGE_USER_PASSWORD);
        emailEvent.setRecipient(user.getEmail());
        emailEventPublisher.publishEmailEvent(emailEvent);
    }

    private void SendEmailWithTokenAndSaveToUser(User user) {
        //  publish event
        EmailEvent emailEvent = new EmailEvent();
        emailEvent.setSubject(EmailEvent.CONFIRMATION_EMAIL);
        emailEvent.setRecipient(user.getEmail());
        // Generate token
        String token = TokenGenerator.generateRandomStringToken();
        emailEvent.setToken(token);
        emailEventPublisher.publishEmailEvent(emailEvent);
        Token emailConfirmationToken = new Token();
        emailConfirmationToken.setTokenValue(token);
        emailConfirmationToken.setUser(user);
        emailConfirmationToken.setTokenType(TokenGenerator.EMAIL_CONFIRMATION_TOKEN_TYPE);
        emailConfirmationToken.setExpiryDate(new java.sql.Timestamp(System.currentTimeMillis() + 24 * 60 * 60 * 1000));// 24 hours
        tokenRepository.save(emailConfirmationToken);
    }

    private void validateField(String fieldValue, String fieldName) {
        if (fieldValue == null || fieldValue.isEmpty()) {
            throw new InvalidUserException(fieldName + " is required");
        }
    }

    private void validateToken(Token token, String tokenType) {

        if (token == null) {
            throw new InvalidTokenException("Invalid token");
        }
        //  check if token is expired
        if (token.getExpiryDate().before(new java.sql.Timestamp(System.currentTimeMillis()))) {
            throw new InvalidTokenException("Token expired");
        }
        //  check if token is used
        if (token.isUsed()) {
            throw new InvalidTokenException("Token already used");
        }
        //  check if token type is correct
        if (!token.getTokenType().equals(tokenType)) {
            throw new InvalidTokenException("Invalid token type");
        }
    }
}
