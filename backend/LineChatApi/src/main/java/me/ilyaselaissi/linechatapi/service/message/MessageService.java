package me.ilyaselaissi.linechatapi.service.message;


import me.ilyaselaissi.linechatapi.dto.MessageRequestDTO;
import me.ilyaselaissi.linechatapi.model.Conversation;
import me.ilyaselaissi.linechatapi.model.Message;

import java.util.List;

public interface MessageService {
    Message saveUserMessage(MessageRequestDTO message);

    List<Conversation> getConversations(String username);
}
