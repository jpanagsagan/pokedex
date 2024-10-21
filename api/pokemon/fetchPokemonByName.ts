import { PokemonDetailsResponse } from './response';

export const fetchPokemonByName = async (pokemonName: string): Promise<PokemonDetailsResponse> => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`); // Fetch the data from the URL
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon data');
    }
    const data: PokemonDetailsResponse = await response.json(); // Parse the JSON response
    return data; // Return the parsed data
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    throw error; // Rethrow the error for handling in the calling component
  }
};
