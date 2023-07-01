import { create, StateCreator} from "zustand";
import { devtools } from "zustand/middleware";
import { Client } from 'stompjs';

type ClientStore = {
  client: Client | null
  setClient: (client: Client) => void
  clearClient: () => void
}

const createStore :StateCreator<ClientStore> = (set) => ({
  client: null,
  setClient: (client: Client) => {
    set({ client: client })
  },
  clearClient: () => {
    set({ client: null })
  }
})

export const useClientStore = create<ClientStore>(
  devtools<ClientStore>(createStore) as any
)

