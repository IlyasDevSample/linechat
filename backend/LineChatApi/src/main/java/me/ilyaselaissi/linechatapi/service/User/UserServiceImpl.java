package me.ilyaselaissi.linechatapi.service.User;

import me.ilyaselaissi.linechatapi.common.UserStatusNames;
import me.ilyaselaissi.linechatapi.dto.UserDTO;
import me.ilyaselaissi.linechatapi.exceptions.user.DuplicateUserException;
import me.ilyaselaissi.linechatapi.exceptions.user.InvalidUserException;
import me.ilyaselaissi.linechatapi.model.User;
import me.ilyaselaissi.linechatapi.model.UserStatus;
import me.ilyaselaissi.linechatapi.repository.UserRepository;
import me.ilyaselaissi.linechatapi.repository.UserStatusRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserStatusRepository userStatusRepository;
    public UserServiceImpl(UserRepository userRepository, UserStatusRepository userStatusRepository) {
        this.userRepository = userRepository;
        this.userStatusRepository = userStatusRepository;
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
        user.setFullName(userDTO.fullName());
        user.setEmail(userDTO.username());
        user.setEmailVerified(false);
        user.setEnable(true);
        user.setLastActive(new java.sql.Timestamp(System.currentTimeMillis()));
        // get user status from database
        UserStatus userStatus = userStatusRepository.findByStatusType(UserStatusNames.UNKNOWN);
        user.setUserStatus(userStatus);
        //  save user
        return userRepository.save(user);
    }

    private void validateField(String fieldValue, String fieldName) {
        if (fieldValue == null || fieldValue.isEmpty()) {
            throw new InvalidUserException(fieldName + " is required");
        }
    }
}
