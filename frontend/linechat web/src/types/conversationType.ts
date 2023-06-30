export type Message = {
  idMessage: string
  idConversation: string
  sender: string
  receiver: string
  message: string
  status: string
  createdAt: string
  updatedAt: string
}

export type Conversation = {
  idConversation: string
  username: string
  fullName: string
  status: string
  lastActive: string
  createdAt: string
  avatarUrl: string
  messages: Message[]
  lastMessage: string
  lastMessageTime: string
}