'use client';
import React, { useState } from 'react';
import styles from './index.module.css';
import { PokemonType, typeColors } from '@/utils/colorEnums';
import Image from 'next/image';
import useStore from '@/store/store';
import { useRouter } from 'next/navigation';
import ConfirmationModal from '@/components/modal';
import { useForm } from 'react-hook-form';

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

type FormData = {
  nickname: string;
  dateAdded: string;
};

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ details }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const detailList: (keyof Details)[] = ['height', 'weight', 'base_experience', 'move'];
  const backgroundColor = typeColors[details.type] || '#FFFFFF';
  const { register, handleSubmit, reset } = useForm<FormData>();
  const deletePokemon = useStore((state) => state.removePokemon);
  const { addPokemon } = useStore();
  const { filter } = useStore();
  const router = useRouter();

  const handleActionButton = (data: FormData) => {
    if (filter === 'all') {
      savePokemon(data);
    } else {
      setShowConfirmationModal(true);
    }
  };

  const savePokemon = (data: FormData) => {
    const newEntry = {
      id: details.id,
      img: details.imageUrl,
      name: details.name,
      nickname: data.nickname,
      dateAdded: data.dateAdded,
    };

    addPokemon(newEntry);
    reset();
    alert('Pokémon details saved successfully!');
    router.push('/');
  };

  const handleDeletePokemon = () => {
    deletePokemon(details.id);
    router.push('/');
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

        <form className={styles.inputWrapper} onSubmit={handleSubmit(handleActionButton)}>
          {filter === 'all' && (
            <>
              <input
                type="text"
                placeholder="Enter Nickname"
                className={styles.nicknameInput}
                {...register('nickname')}
              />
              <input
                type="text"
                placeholder="Enter Date (MM/DD/YYYY)"
                className={styles.dateInput}
                {...register('dateAdded')}
              />
            </>
          )}
          <button
            type="submit"
            className={styles.captureButton}
            style={filter === 'all' ? { backgroundColor } : { backgroundColor: 'red' }}
          >
            {filter === 'all' ? 'Tag as Captured' : 'Uncapture'}
          </button>
        </form>
      </div>

      {showConfirmationModal && (
        <ConfirmationModal
          handleDeletePokemon={handleDeletePokemon}
          setShowConfirmationModal={setShowConfirmationModal}
        />
      )}
    </div>
  );
};

export default PokemonDetails;
