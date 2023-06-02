package me.ilyaselaissi.linechatapi.event;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
public class EmailEventPublisher {
    private final ApplicationEventPublisher eventPublisher;

    public EmailEventPublisher(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }

    public void publishEmailEvent(EmailEvent event) {
        eventPublisher.publishEvent(event);
    }
}
