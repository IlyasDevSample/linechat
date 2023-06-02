package me.ilyaselaissi.linechatapi.initializers;

import jakarta.annotation.PostConstruct;
import me.ilyaselaissi.linechatapi.common.MessageStatusNames;
import me.ilyaselaissi.linechatapi.model.MessageStatus;
import me.ilyaselaissi.linechatapi.repository.MessageStatusRepository;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class MessageStatusInitializer {
    private final MessageStatusRepository messageStatusRepository;

    public MessageStatusInitializer(MessageStatusRepository messageStatusRepository) {
        this.messageStatusRepository = messageStatusRepository;
    }

    @PostConstruct
    public void init() {
        // Check if the message statuses already exist in the database
        List<MessageStatus> messageStatuses = messageStatusRepository.findAll();

        // If the message statuses don't exist, create them
        if (messageStatuses.isEmpty()) {
            List<String> statusTypes = Arrays.asList(
                    MessageStatusNames.DELIVERED,
                    MessageStatusNames.SEEN,
                    MessageStatusNames.PENDING
            );

            for (String statusType : statusTypes) {
                MessageStatus messageStatus = new MessageStatus();
                messageStatus.setStatus(statusType);
                messageStatusRepository.save(messageStatus);
            }
        }
    }
}
