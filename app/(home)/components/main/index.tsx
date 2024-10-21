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
import { PokemonDetailsResponse } from '@/api/pokemon/response';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchPokemonByName } from '@/api/pokemon/fetchPokemonByName';
import ConfirmationModal from '../modal';

interface Pokemon {
  name: string;
  url?: string;
  img?: string;
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
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>()
  const isList = useStore((state) => state.isList);
  const deletePokemon = useStore(state => state.removePokemon)
  const { filter } = useStore();
  const savedPokemons = useStore((state) => state.savedPokemons);
  const searchParams = useSearchParams()
  const searchName = searchParams.get('searchName')
  const router = useRouter()
  const loadPokemons = async (url: string | null) => {
    if (loading || !url) return;

    setLoading(true);
    try {
      const data: PokemonResponse = await fetchPokemons(url!);
      const pokemonData = data.results

      setPokemons((prev) => [...prev, ...pokemonData]);
      setNextUrl(data.next);
    } catch (error) {
      console.error('Failed to fetch Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };


  const loadPokemonByName = async (name: string) => {
    setLoading(true);
    try {
      const data: PokemonDetailsResponse = await fetchPokemonByName(name);
      const formattedPokemonData = [
        {
          name: data.name,
          img: data.sprites.front_default
        }
      ]

      console.log(formattedPokemonData)
      setPokemons(formattedPokemonData);
      setNextUrl(null);
    } catch (error) {
      console.error('Failed to fetch Pokémon:', error);
    } finally {
      setLoading(false);
    }
  }

  const fetchMoreData = () => {
    loadPokemons(nextUrl); // Fetch more Pokémon when the user scrolls
  };

  useEffect(() => {
    setPokemons([])
    if(searchName){
      loadPokemonByName(searchName)
    }else{
       loadPokemons('https://pokeapi.co/api/v2/pokemon?limit=150'); // Initial fetch
    }
   
  }, [searchName]);

  const filterSavedPokemons = searchName 
      ? savedPokemons.filter((pokemon)=> pokemon.name.toLowerCase().includes(searchName.toLowerCase())) 
      : savedPokemons

      console.log('filterSavedPokemons', filterSavedPokemons)


  const handleDeletePokemon = () => {
    deleteId && deletePokemon(deleteId) 
    setShowConfirmationModal((prev) => !prev)
  }

  useEffect(()=>{
    setShowConfirmationModal(false)
    router.push('/')
  },[filter])
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
              {pokemons.length > 0 ? pokemons.map((pokemon, index) => (
                <Link key={index} href={`/${pokemon.name}`}>
                 
                  <li>
                  <div className={styles.imageWrapper}>
                    <Image src={pokemon.img || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`} alt={pokemon.name} fill className={styles.image} />
                  </div>
                    {pokemon.name}</li>
                </Link>
              )):
                <div>No Pokemon Data</div>
              }
            </ul>
          </InfiniteScroll>
        ) : (
          // Render captured Pokémon without InfiniteScroll
          <ul className={isList ? styles.listWrapper : styles.gridWrapper}>
            {filterSavedPokemons.length > 0 ? filterSavedPokemons.map((pokemon, index) => (
              <Link key={index} href={`/${pokemon.name}`}>
                <li className={styles.captured} >
                  <div className={styles.removeBtn} onClick={() => {setShowConfirmationModal((prev) => !prev);
                    setDeleteId(pokemon.id)
                   }}>
                    remove
                  </div>
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
            )):
              <div>No Pokemon Data</div>
            }
          </ul>
        )}
      </div>
      {showConfirmationModal &&
      <ConfirmationModal handleDeletePokemon={handleDeletePokemon}
      setShowConfirmationModal={setShowConfirmationModal} />}
    </div>
  );
};

export default MainComponent;
