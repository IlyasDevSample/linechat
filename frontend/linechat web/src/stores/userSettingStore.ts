import { create, StateCreator } from "zustand"
import { persist, PersistOptions } from "zustand/middleware"


type UserSettingStore = {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void
}
type MyPersist = (
  config: StateCreator<UserSettingStore>,                                            
  options: PersistOptions<UserSettingStore>                                          
) => StateCreator<UserSettingStore> 

const userSettingStore: StateCreator<UserSettingStore> = (set) => ({
  darkMode: false,
  setDarkMode: (darkMode: boolean) => set({ darkMode }),
})

export const useUserSettingStore = create<UserSettingStore>(
  (persist as MyPersist)(userSettingStore, { name: "userSettingStore" })
)