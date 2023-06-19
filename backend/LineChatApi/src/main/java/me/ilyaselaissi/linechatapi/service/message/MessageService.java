package me.ilyaselaissi.linechatapi.service.message;


import me.ilyaselaissi.linechatapi.dto.MessageRequestDTO;
import me.ilyaselaissi.linechatapi.model.Message;

public interface MessageService {
    Message saveUserMessage(MessageRequestDTO message);
}
