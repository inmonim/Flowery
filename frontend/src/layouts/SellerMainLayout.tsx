import { useState } from "react";
import { Outlet } from "react-router-dom";
import Container from "../containers/Container";
import Header from "../components/Common/Header/SellerHeader";
import styles from "./SellerMainLayout.module.scss";
import Modal from "../components/Common/Modal";

const SellerMainLayout = () => {
  const [showModal, setShowModal] = useState(false);

  const handleMenuClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    if (showModal && !(e.target as HTMLElement).closest(`.${styles.modal}`)) {
      setShowModal(false);
    }
  };

  return (
    <div className={styles.body} onMouseDown={handleMouseDown}>
      <Header handleMenuClick={handleMenuClick} />
      {showModal && (
        <div className={styles.bg}>
          <div className={styles.modal}>
            <Modal handleModalClose={handleModalClose} />
          </div>
        </div>
      )}
      <div className={styles.containers}>
        <Container>
          <Outlet />
        </Container>
      </div>
    </div>
  );
};

export default SellerMainLayout;
