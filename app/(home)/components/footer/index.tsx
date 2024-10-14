'use client';
import React, { useState } from 'react';
import styles from './index.module.css';
const FooterComponent = () => {
  const [activeMenu, setActiveMenu] = useState('all');
  const menuList = ['all', 'captured'];
  return (
    <div className={styles.footer}>
      <ul>
        {menuList.map((menu, index) => (
          <li
            key={index}
            className={`${activeMenu === menu ? styles.active : ''}`}
            onClick={() => setActiveMenu(menu)}
          >
            {menu}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterComponent;
