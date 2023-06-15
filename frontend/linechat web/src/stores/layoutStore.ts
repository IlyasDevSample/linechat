import { create, StateCreator } from 'zustand';

export interface LayoutStore {
  isChatOpen: boolean
  setIsChatOpen: (boolean: boolean) => void
}

const layoutStore: StateCreator<LayoutStore> = (set) => ({
  isChatOpen: false,
  setIsChatOpen: (isChatOpen: boolean) => set({ isChatOpen }),
})

export const useLayoutStore = create<LayoutStore>(layoutStore)