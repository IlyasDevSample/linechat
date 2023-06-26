export type Message = {
  sender: string
  receiver: string
  message: string
  status: string
  createdAt: string
  updatedAt: string
}

export type Conversation = {
  username: string
  fullName: string
  status: string
  lastActive: string
  createdAt: string
  avatarUrl: string
  messages: Message[]
  lastMessage: string
}