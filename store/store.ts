// src/store/store.ts
import { create } from 'zustand';

interface Pokemon {
  id: number;
  img: string;
  name: string;
  nickname?: string;
  dateAdded?: string;
}

interface PokemonState {
  savedPokemons: Pokemon[];
  filter: 'all' | 'captured'; // Filter state
  addPokemon: (pokemon: Pokemon) => void;
  loadCapturedPokemons: () => void; // Load from localStorage
  setFilter: (filter: 'all' | 'captured') => void; // Function to set filter
  isList: boolean; // Toggle state
  toggleView: () => void; // Function to toggle view
}

const useStore = create<PokemonState>((set) => ({
  savedPokemons: [],
  isList: false, // Default view state (grid)
  filter: 'all', // Default filter
  addPokemon: (pokemon) =>
    set((state) => ({
      savedPokemons: [...state.savedPokemons, pokemon],
    })),
  loadCapturedPokemons: () => {
    const existingData = JSON.parse(localStorage.getItem('pokemonData') || '[]');
    set({ savedPokemons: existingData });
  },
  toggleView: () => {
    console.log('Toggling view');
    set((state) => ({ isList: !state.isList }));
  }, // Toggle view function
  setFilter: (filter) => set({ filter }), // Function to update filter
}));

export default useStore;
