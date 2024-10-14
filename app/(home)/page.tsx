import FooterComponent from './components/footer';
import styles from './index.module.css';
import HeaderComponent from './components/header';
import MainComponent from './components/main';
export default function Home() {
  return (
    <div className={styles.homeWrapper}>
      <HeaderComponent />
      <MainComponent />
      <FooterComponent />
    </div>
  );
}
