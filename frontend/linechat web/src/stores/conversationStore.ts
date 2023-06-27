import { create, StateCreator} from "zustand";
import { devtools } from "zustand/middleware";
import { Conversation } from "../types/conversationType";

type ConversationStore = {
  conversations: Conversation[]
  setConversations: (conversations: Conversation[]) => void
  clearConversations: () => void
  selectedConversation: Conversation | null
  setSelectedConversation: (conversation: Conversation) => void
  clearSelectedConversation: () => void
}

const createStore :StateCreator<ConversationStore> = (set) => ({
  conversations: [],
  setConversations: (conversations: Conversation[]) => {
    set({ conversations: conversations })
  }
  ,
  clearConversations: () => {
    set({ conversations: [] })
  }
  ,
  selectedConversation: null,
  setSelectedConversation: (conversation: Conversation) => {
    set({ selectedConversation: conversation })
  }
  ,
  clearSelectedConversation: () => {
    set({ selectedConversation: null })
  }
})

export const useConversationStore = create<ConversationStore>(
  devtools<ConversationStore>(createStore) as any
)