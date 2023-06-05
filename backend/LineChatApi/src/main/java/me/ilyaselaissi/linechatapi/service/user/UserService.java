package me.ilyaselaissi.linechatapi.service.user;

import me.ilyaselaissi.linechatapi.dto.ChangePasswordDTO;
import me.ilyaselaissi.linechatapi.dto.ResetPasswordDTO;
import me.ilyaselaissi.linechatapi.dto.UserDTO;
import me.ilyaselaissi.linechatapi.model.User;

public interface UserService {
    User register(UserDTO userDTO);

    void confirmEmail(String token);

    void resendConfirmationEmail(String username);

    void changePassword(ChangePasswordDTO changePasswordDTO);

    void forgotPassword(String email);

    void resetPassword(ResetPasswordDTO resetPasswordDTO);
}
