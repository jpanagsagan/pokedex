import React from 'react';
import styles from './index.module.css';
import Image from 'next/image';
import brandIcon from '../../../../public/assets/img/logo.png';
import listIcon from '../../../../public/assets/img/list.png';

const HeaderComponent = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.brand}>
        <Image src={brandIcon} alt="Brand Icon" width={40} height={30} />
        Pokedéx
      </div>

      <div className={styles.utilities}>
        <input className={styles.search} type="text" />
        <div className={styles.view}>
          <Image src={listIcon} alt="List Icon" width={30} height={40} />
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
