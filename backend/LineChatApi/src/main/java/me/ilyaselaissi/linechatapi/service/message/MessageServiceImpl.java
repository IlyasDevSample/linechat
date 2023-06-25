package me.ilyaselaissi.linechatapi.service.message;

import me.ilyaselaissi.linechatapi.common.MessageStatusNames;
import me.ilyaselaissi.linechatapi.dto.MessageRequestDTO;
import me.ilyaselaissi.linechatapi.exceptions.core.InvalidFieldException;
import me.ilyaselaissi.linechatapi.exceptions.message.MessageException;
import me.ilyaselaissi.linechatapi.exceptions.user.InvalidUserException;
import me.ilyaselaissi.linechatapi.model.Conversation;
import me.ilyaselaissi.linechatapi.model.Message;
import me.ilyaselaissi.linechatapi.model.MessageStatus;
import me.ilyaselaissi.linechatapi.model.User;
import me.ilyaselaissi.linechatapi.repository.ConversationRepository;
import me.ilyaselaissi.linechatapi.repository.MessageRepository;
import me.ilyaselaissi.linechatapi.repository.MessageStatusRepository;
import me.ilyaselaissi.linechatapi.repository.UserRepository;
import me.ilyaselaissi.linechatapi.util.DataValidator;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {
    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final UserRepository userRepository;
    private final MessageStatusRepository messageStatusRepository;

    public MessageServiceImpl(MessageRepository messageRepository, ConversationRepository conversationRepository, UserRepository userRepository, MessageStatusRepository messageStatusRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.messageStatusRepository = messageStatusRepository;
        this.conversationRepository = conversationRepository;
    }

    @Override
    public Message saveUserMessage(MessageRequestDTO message) {
        // validate fields
        DataValidator.validateField(message.message(), new InvalidFieldException("Message cannot be empty"));
        DataValidator.validateField(message.sender(), new InvalidFieldException("Sender cannot be empty"));
        DataValidator.validateField(message.receiver(), new InvalidFieldException("Receiver cannot be empty"));
        // validate users exist & get them
        User sender = validateUserExists(message.sender(), "Sender");
        User receiver = validateUserExists(message.receiver(), "Receiver");
        // Find conversation
        Conversation conversation = findConversation(sender, receiver);
        // get message status
        MessageStatus messageStatus = messageStatusRepository.findByStatus(MessageStatusNames.PENDING);
        if (messageStatus == null) {
            throw new MessageException("Message status not found");
        }

        // save message
        Message messageToSave = new Message();
        messageToSave.setText(message.message());
        messageToSave.setSender(sender);
        messageToSave.setReceiver(receiver);
        messageToSave.setMessageStatus(messageStatus);
        messageToSave.setConversation(conversation);
        messageToSave = messageRepository.save(messageToSave);
        return messageToSave;
    }

    @Override
    public List<Conversation> getConversations(String username) {
        User user = validateUserExists(username, "User");
        List<Conversation> conversations = user.getConversations();
        return conversations;
    }

    private Conversation findConversation(User sender, User receiver) {
        List<Conversation> senderConversations = sender.getConversations();
        List<Conversation> receiverConversations = receiver.getConversations();
        Conversation conversation = null;
        for (Conversation senderConversation : senderConversations) {
            for (Conversation receiverConversation : receiverConversations) {
                if (senderConversation.getId().equals(receiverConversation.getId())) {
                    conversation = senderConversation;
                    break;
                }
            }
        }
        // if conversation not found, create new one
        if (conversation == null) {
            conversation = new Conversation();
            conversation = conversationRepository.save(conversation);
            senderConversations.add(conversation);
            receiverConversations.add(conversation);
            sender.setConversations(senderConversations);
            receiver.setConversations(receiverConversations);
            userRepository.save(sender);
            userRepository.save(receiver);
        }
        return conversation;
    }

    private User validateUserExists(String username, String userToValidate) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new InvalidUserException(userToValidate + " does not exist");
        }
        return user;
    }


}
