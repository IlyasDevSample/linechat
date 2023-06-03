package me.ilyaselaissi.linechatapi.service.user;

import me.ilyaselaissi.linechatapi.dto.UserDTO;
import me.ilyaselaissi.linechatapi.model.User;

public interface UserService {
    User register(UserDTO userDTO);

    void confirmEmail(String token);
}
