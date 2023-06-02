package me.ilyaselaissi.linechatapi.service.user;

import me.ilyaselaissi.linechatapi.common.PermissionNames;
import me.ilyaselaissi.linechatapi.common.UserStatusNames;
import me.ilyaselaissi.linechatapi.dto.UserDTO;
import me.ilyaselaissi.linechatapi.event.EmailEvent;
import me.ilyaselaissi.linechatapi.event.EmailEventPublisher;
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
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserStatusRepository userStatusRepository;
    private final EmailEventPublisher emailEventPublisher;
    private final PermissionRepository permissionRepository;
    private final TokenRepository tokenRepository;

    public UserServiceImpl(
            UserRepository userRepository,
            UserStatusRepository userStatusRepository,
            EmailEventPublisher emailEventPublisher,
            PermissionRepository permissionRepository,
            TokenRepository tokenRepository
    ) {
        this.userRepository = userRepository;
        this.userStatusRepository = userStatusRepository;
        this.emailEventPublisher = emailEventPublisher;
        this.permissionRepository = permissionRepository;
        this.tokenRepository = tokenRepository;
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
        String encryptedPassword = userDTO.password(); // TODO: encrypt password
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
            //  publish event
            EmailEvent emailEvent = new EmailEvent();
            emailEvent.setRecipient(savedUser.getEmail());
            // Generate token
            String token = TokenGenerator.generateEmailConfirmationToken();
            emailEvent.setToken(token);
            emailEventPublisher.publishEmailEvent(emailEvent);
            //  save token to database
            Token emailConfirmationToken = new Token();
            emailConfirmationToken.setTokenValue(token);
            emailConfirmationToken.setUser(savedUser);
            emailConfirmationToken.setTokenType(TokenGenerator.EMAIL_CONFIRMATION_TOKEN_TYPE);
            emailConfirmationToken.setExpiryDate(new java.sql.Timestamp(System.currentTimeMillis() + 24 * 60 * 60 * 1000));// 24 hours
            tokenRepository.save(emailConfirmationToken);
            return savedUser;
        }
        catch (Exception e) {
            throw new InvalidUserException("Invalid user");
        }


    }

    private void validateField(String fieldValue, String fieldName) {
        if (fieldValue == null || fieldValue.isEmpty()) {
            throw new InvalidUserException(fieldName + " is required");
        }
    }
}
