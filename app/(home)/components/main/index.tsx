// app/home/components/MainComponent.tsx
'use client';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './index.module.css';
import { fetchPokemons } from '@/api/pokemon/fetchPokemon';
import Link from 'next/link';
import LoadingComponent from '@/components/loadingComponent';
import useStore from '@/store/store';
import Image from 'next/image';

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
  const isList = useStore((state) => state.isList);
  const { filter } = useStore();
  const savedPokemons = useStore((state) => state.savedPokemons);

  console.log(savedPokemons);
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
        {filter === 'all' ? (
          <InfiniteScroll
            dataLength={pokemons.length}
            next={fetchMoreData}
            hasMore={!!nextUrl} // Continue loading if there's a next URL
            loader={loading && <LoadingComponent />}
            scrollableTarget="scrollableDiv" // Set the scrollable target
          >
            <ul className={isList ? styles.listWrapper : styles.gridWrapper}>
              {pokemons.map((pokemon, index) => (
                <Link key={index} href={`/${pokemon.name}`}>
                  <li>{pokemon.name}</li>
                </Link>
              ))}
            </ul>
          </InfiniteScroll>
        ) : (
          // Render captured Pokémon without InfiniteScroll
          <ul className={isList ? styles.listWrapper : styles.gridWrapper}>
            {savedPokemons.map((pokemon, index) => (
              <Link key={index} href={`/${pokemon.name}`}>
                <li className={styles.captured}>
                  <div className={styles.imageWrapper}>
                    <Image src={pokemon.img} alt={pokemon.name} fill />
                  </div>

                  <div className={styles.details}>
                    <p> {pokemon.name}</p>
                    <p>{pokemon.nickname}</p>
                    <p> {pokemon.dateAdded}</p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MainComponent;
