'use client';
import React, { useState } from 'react';
import styles from './index.module.css';
import { PokemonType, typeColors } from '@/utils/colorEnums';
import Image from 'next/image';
import useStore from '@/store/store';

type Details = {
  id: number;
  move: string;
  name: string;
  type: PokemonType;
  weight: number;
  height: number;
  imageUrl: string;
  base_experience: number;
};

type PokemonDetailsProps = {
  details: Details;
};

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ details }) => {
  const [nickname, setNickname] = useState('');
  const [dateAdded, setDateAdded] = useState('');
  const { addPokemon } = useStore();

  const detailList: (keyof Details)[] = ['height', 'weight', 'base_experience', 'move'];

  // Get the background color based on the Pokémon type
  const backgroundColor = typeColors[details.type] || '#FFFFFF';

  const savePokemon = () => {
    const newEntry = {
      id: details.id,
      img: details.imageUrl,
      name: details.name,
      nickname,
      dateAdded,
    };

    // Add the Pokémon to Zustand store
    addPokemon(newEntry);

    // Clear input fields after saving
    setNickname('');
    setDateAdded('');
    alert('Pokémon details saved successfully!');
  };

  return (
    <div className={styles.container} style={{ backgroundColor }}>
      <div className={styles.header}>
        <a href="/" className={styles.goBack}>
          &lt; {details.name}
        </a>
        <p>#{details.id}</p>
      </div>

      <div className={styles.pokemon}>
        <div className={styles.imageWrapper}>
          <Image src={details.imageUrl} alt={details.name} fill className={styles.image} />
        </div>

        <p className={styles.goBack}>{details.name}</p>
      </div>

      <div className={styles.detailsWrapper}>
        <div className={styles.pokemonTypeContainer}>
          <p className={styles.pokemonType} style={{ backgroundColor }}>
            {details.type}
          </p>
        </div>
        <div className={styles.detailsInnerWrapper}>
          {detailList.map((detail, index) => (
            <div className={styles.details} key={index}>
              <p>{details[detail]}</p> {detail}
            </div>
          ))}
        </div>

        <h3 className={styles.statusTitle}>Status</h3>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Enter Nickname"
            className={styles.nicknameInput}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Date (MM/DD/YYYY)"
            className={styles.dateInput}
            value={dateAdded}
            onChange={(e) => setDateAdded(e.target.value)}
          />
          <button
            className={styles.captureButton}
            style={{ backgroundColor }}
            onClick={savePokemon}
          >
            Tag as Captured
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
