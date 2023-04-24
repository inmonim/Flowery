import { Outlet } from 'react-router-dom';
import Container from '../containers/Container';
import Header from '../components/Common/Header/Header';
import styles from './SellerMainLayout.module.scss';

const SellerMainLayout = () => {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Header />
      </div>
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  );
};

export default SellerMainLayout;
