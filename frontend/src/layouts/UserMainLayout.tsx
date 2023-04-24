import { Outlet } from "react-router-dom";
import Container from "../containers/Container";
import Header from "../components/Common/Header/Header";
import styles from "./UserMainLayout.module.scss";

const UserMainLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles["layout-main"]}>
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  );
};

export default UserMainLayout;
