import { Outlet } from "react-router-dom";
import Container from "../containers/Container";
import Header from "../components/Common/Header/SellerHeader";
import styles from "./SellerMainLayout.module.scss";

const SellerMainLayout = () => {
  return (
    <div className={styles.body}>
      <Header />
      <div className={styles.containers}>
        <Container>
          <Outlet />
        </Container>
      </div>
    </div>
  );
};

export default SellerMainLayout;
