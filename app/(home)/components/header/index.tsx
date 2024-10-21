'use client';
import React, { useEffect } from 'react';
import styles from './index.module.css';
import Image from 'next/image';
import brandIcon from '../../../../public/assets/img/logo.png';
import listIcon from '../../../../public/assets/img/list.png';
import menuIcon from '../../../../public/assets/img/menu.png';
import useStore from '@/store/store';
import { Form, useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';

const HeaderComponent = () => {
  const isList = useStore((state) => state.isList);
  const toggleView = useStore((state) => state.toggleView);
  const router = useRouter()
  const searchParams = useSearchParams();
  const searchName = searchParams.get('searchName')
  const { filter } = useStore();

  const {register, handleSubmit, setValue} = useForm({
    defaultValues:{
      search: searchName || ''
    }
  })

  const onSubmit = (data: {search: string}) => {
    const query = data.search.trim().toLowerCase()

    if(query){
      router.push(`/?searchName=${query}`)
    }else{
      router.push('/')
    }

  }

  useEffect(() => {
    setValue('search', '')
  },[filter])
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.brand}>
        <Image src={brandIcon} alt="Brand Icon" width={40} height={30} />
        Pokedéx
      </div>

      {/* <div className={styles.utilities}> */}
        <form onSubmit={handleSubmit(onSubmit)} className={styles.utilities}>
        <input className={styles.search} type="text" 
        {...register('search')}
        placeholder='Search Pokemon'/>
        <div className={styles.view} onClick={toggleView}>
          <Image src={isList ? listIcon : menuIcon} alt="List Icon" width={30} height={40} />
        </div>
        </form>
      {/* </div> */}
    </div>
  );
};

export default HeaderComponent;
