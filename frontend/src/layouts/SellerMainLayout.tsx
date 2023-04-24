import { Outlet } from "react-router-dom";
import Container from "../containers/Container";
import Header from "../components/Common/Header/SellerHeader";
import styles from "./SellerMainLayout.module.scss";

const SellerMainLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  );
};

export default SellerMainLayout;
