package me.ilyaselaissi.linechatapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username; // unique username and not null

    @Column(nullable = false)
    private String password; // hashed password and not null

    private String fullName;

    @Column(unique = true)
    private String email; // unique email

    private boolean isEmailVerified;

    private String avatar;

    private Date lastActive;

    private boolean isEnable;

    @ManyToOne
    @JoinColumn(name = "user_status_id")
    private UserStatus userStatus;

    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date updatedAt;

    @OneToMany(mappedBy = "user")
    private List<UserActivity> userActivities;

    @ManyToMany
    @JoinTable(
            name = "user_permissions",
            joinColumns = @JoinColumn(name = "user_id"), // this table
            inverseJoinColumns = @JoinColumn(name = "permission_id") // other table
    )
    private List<Permission> permissions;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "contact_id")
    private Contact contact;

    @OneToMany(mappedBy = "blockedUser")
    private List<BlockedUser> blockedUsers;

    @OneToMany(mappedBy = "blockedByUser")
    private List<BlockedUser> blockedByUsers;

    @OneToMany(mappedBy = "sender")
    private List<FriendshipRequest> sentFriendshipRequests;

    @OneToMany(mappedBy = "receiver")
    private List<FriendshipRequest> receivedFriendshipRequests;

    @OneToMany(mappedBy = "user")
    private List<Friendship> friendshipsAsUser;

    @OneToMany(mappedBy = "otherUser")
    private List<Friendship> friendshipsAsOtherUser;

    @OneToMany(mappedBy = "user")
    private List<GroupMember> groupMemberships;

    @ManyToMany
    @JoinTable(
            name = "user_conversations",
            joinColumns = @JoinColumn(name = "user_id"), // this table
            inverseJoinColumns = @JoinColumn(name = "conversation_id") // other table
    )
    private List<Conversation> conversations;

    @OneToMany(mappedBy = "sender")
    private List<Message> sentMessages;

    @OneToMany(mappedBy = "receiver")
    private List<Message> receivedMessages;



}
