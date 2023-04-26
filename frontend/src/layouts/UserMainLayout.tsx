import { Outlet } from "react-router-dom";
import Container from "../containers/Container";
import UserHeader from "../components/Common/Header/UserHeader";
import styles from "./UserMainLayout.module.scss";

const UserMainLayout = () => {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <UserHeader />
      </div>
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  );
};

export default UserMainLayout;
