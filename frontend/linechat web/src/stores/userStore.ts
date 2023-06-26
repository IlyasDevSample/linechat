import { create, StateCreator} from "zustand";
import { devtools } from "zustand/middleware";
import { UserDetails } from "../types/userDetailsType";

type UserStore = {
  UserDetails: UserDetails | null
  setUserDetails: (userDetails: UserDetails) => void
  clearUserDetails: () => void
  isOnline: boolean
  setIsOnline: (isOnline: boolean) => void
}

const createStore :StateCreator<UserStore> = (set) => ({
  UserDetails: null,
  setUserDetails: (userDetails: UserDetails) => {
    set({ UserDetails: userDetails })
  },
  clearUserDetails: () => {
    set({ UserDetails: null })
  },
  isOnline: false,
  setIsOnline: (isOnline: boolean) => {
    set({ isOnline: isOnline })
  }
})

export const useUserStore = create<UserStore>(
  devtools<UserStore>(createStore) as any
)
