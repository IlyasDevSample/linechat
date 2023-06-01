package me.ilyaselaissi.linechatapi.initializers;

import jakarta.annotation.PostConstruct;
import me.ilyaselaissi.linechatapi.common.UserStatusNames;
import me.ilyaselaissi.linechatapi.model.UserStatus;
import me.ilyaselaissi.linechatapi.repository.UserStatusRepository;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class UserStatusInitializer {

    private final UserStatusRepository userStatusRepository;

    public UserStatusInitializer(UserStatusRepository userStatusRepository) {
        this.userStatusRepository = userStatusRepository;

    }

    @PostConstruct
    public void init() {
        // Check if the user statuses already exist in the database
        List<UserStatus> userStatuses = userStatusRepository.findAll();

        // If the user statuses don't exist, create them
        if (userStatuses.isEmpty()) {
            List<String> statusTypes = Arrays.asList(
                    UserStatusNames.ONLINE,
                    UserStatusNames.OFFLINE,
                    UserStatusNames.HIDDEN,
                    UserStatusNames.AWAY,
                    UserStatusNames.BUSY,
                    UserStatusNames.UNKNOWN
            );
            List<String> descriptions = Arrays.asList(
                    "User is currently online",
                    "User is currently offline",
                    "User is hidden",
                    "User is away",
                    "User is busy",
                    "Unknown user status"
            );

            for (int i = 0; i < statusTypes.size(); i++) {
                UserStatus userStatus = new UserStatus();
                userStatus.setStatusType(statusTypes.get(i));
                userStatus.setDescription(descriptions.get(i));
                userStatusRepository.save(userStatus);
            }
        }
    }
}
