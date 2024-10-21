import FooterComponent from './components/footer';
import styles from './index.module.css';
import HeaderComponent from './components/header';
import MainComponent from './components/main';
import { Suspense } from 'react';
import LoadingComponent from '@/components/loadingComponent';
export default function Home() {
  return (
    <div className={styles.homeWrapper}>
      <Suspense fallback={<LoadingComponent/>}>
      <HeaderComponent />
      <MainComponent />
      <FooterComponent />
      </Suspense>
    </div>
  );
}
