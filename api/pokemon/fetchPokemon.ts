import { PokemonResponse } from './response';

export const fetchPokemons = async (url: string): Promise<PokemonResponse> => {
  try {
    const response = await fetch(url); // Fetch the data from the URL
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon data');
    }
    const data: PokemonResponse = await response.json(); // Parse the JSON response
    return data; // Return the parsed data
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    throw error; // Rethrow the error for handling in the calling component
  }
};
