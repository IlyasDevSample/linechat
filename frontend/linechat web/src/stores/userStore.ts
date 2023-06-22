import { create, StateCreator} from "zustand";
import { devtools } from "zustand/middleware";
import { UserDetails } from "../types/userDetailsType";

type UserStore = {
  UserDetails: UserDetails | null
  setUserDetails: (userDetails: UserDetails) => void
  clearUserDetails: () => void
}

const createStore :StateCreator<UserStore> = (set) => ({
  UserDetails: null,
  setUserDetails: (userDetails: UserDetails) => {
    set({ UserDetails: userDetails })
  },
  clearUserDetails: () => {
    set({ UserDetails: null })
  }
})

export const useUserStore = create<UserStore>(
  devtools<UserStore>(createStore) as any
)
