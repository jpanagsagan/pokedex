// src/store/store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Pokemon {
  id: number;
  img: string;
  name: string;
  nickname?: string;
  dateAdded?: string;
}

interface PokemonState {
  savedPokemons: Pokemon[];
  filter: 'all' | 'captured';
  addPokemon: (pokemon: Pokemon) => void;
  setFilter: (filter: 'all' | 'captured') => void;
  isList: boolean;
  toggleView: () => void;
}

const useStore = create<PokemonState>()(
  persist(
    (set) => ({
      savedPokemons: [],
      isList: false,
      filter: 'all',
      addPokemon: (pokemon) =>
        set((state) => ({
          savedPokemons: [...state.savedPokemons, pokemon],
        })),
      toggleView: () => set((state) => ({ isList: !state.isList })),
      setFilter: (filter) => set({ filter }),
    }),
    {
      name: 'pokemon-storage',
      storage: typeof window !== 'undefined' ? createJSONStorage(() => localStorage) : undefined,
    },
  ),
);

export default useStore;
