import React from 'react';
import styles from './index.module.css';
const LoadingComponent = () => {
  return (
    <div className={styles.loadingWrapper}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default LoadingComponent;
