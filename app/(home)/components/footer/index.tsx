'use client';
import styles from './index.module.css';
import useStore from '@/store/store';
const FooterComponent = () => {
  const menuList: ('all' | 'captured')[] = ['all', 'captured'];
  const { filter, setFilter } = useStore();
  return (
    <div className={styles.footer}>
      <ul>
        {menuList.map((menu, index) => (
          <li
            key={index}
            className={`${filter === menu ? styles.active : ''}`}
            onClick={() => setFilter(menu)}
          >
            {menu}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterComponent;
