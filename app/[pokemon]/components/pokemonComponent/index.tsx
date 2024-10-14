'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import PokemonDetails from '../pokemonDetails';
import LoadingComponent from '@/components/loadingComponent';
import { PokemonDetailsResponse } from '@/api/pokemon/response';

const PokemonComponent: React.FC = () => {
  const pokemonName = usePathname();
  const [pokemonData, setPokemonData] = useState<PokemonDetailsResponse>(); // Use any for simplicity

  useEffect(() => {
    if (pokemonName) {
      const fetchPokemonDetails = async () => {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
          const data = await response.json();
          setPokemonData(data);
          console.log(data);
        } catch (error) {
          console.error('Failed to fetch Pokémon details:', error);
        }
      };

      fetchPokemonDetails();
    }
  }, [pokemonName]);

  if (!pokemonData) return <LoadingComponent />;

  const details = {
    base_experience: pokemonData.base_experience,
    height: pokemonData.height,
    weight: pokemonData.weight,
    type: pokemonData.types[0].type.name,
    id: pokemonData.id,
    name: pokemonData.name,
    imageUrl: pokemonData.sprites.front_default,
    move: pokemonData.moves[0].move.name,
  };

  return <PokemonDetails details={details} />;
};

export default PokemonComponent;
