// app/home/components/MainComponent.tsx
'use client';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './index.module.css';
import { fetchPokemons } from '@/api/pokemon/fetchPokemon';
import Link from 'next/link';
import LoadingComponent from '@/components/loadingComponent';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

const MainComponent: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const loadPokemons = async (url: string | null) => {
    if (loading || !url) return;

    setLoading(true);
    try {
      const data: PokemonResponse = await fetchPokemons(url!);
      setPokemons((prev) => [...prev, ...data.results]);
      setNextUrl(data.next);
    } catch (error) {
      console.error('Failed to fetch Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = () => {
    loadPokemons(nextUrl); // Fetch more Pokémon when the user scrolls
  };

  useEffect(() => {
    loadPokemons('https://pokeapi.co/api/v2/pokemon?limit=150'); // Initial fetch
  }, []);

  return (
    <div className={styles.mainWrapper}>
      {loading && <LoadingComponent />}
      <div className={styles.gridContainer} id="scrollableDiv">
        <InfiniteScroll
          dataLength={pokemons.length}
          next={fetchMoreData}
          hasMore={!!nextUrl} // Continue loading if there's a next URL
          loader={loading && <LoadingComponent />}
          scrollableTarget="scrollableDiv" // Set the scrollable target
        >
          <ul className={styles.gridWrapper}>
            {/* Use <ul> here */}
            {pokemons.map((pokemon, index) => (
              <Link key={index} href={`/${pokemon.name}`}>
                <li>{pokemon.name}</li>
              </Link>
            ))}
          </ul>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default MainComponent;
