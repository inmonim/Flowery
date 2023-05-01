import React from "react";
import styles from "./SideMenu.module.scss";
import reserve from "../../assets/reserve_logo.png";
import analysis from "../../assets/analysis_logo.png";
import manage from "../../assets/manage_logo.png";
import logout from "../../assets/logout_logo.png";
import { useNavigate } from "react-router-dom";
interface ModalProps {
  handleModalClose: () => void;
}

export default function Modal(props: ModalProps) {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/seller/login");
  }
  return (
    <div className={styles.bg} onClick={props.handleModalClose}>
      <div className={styles.menuItem}>
        <img src={reserve} alt="" width="16"></img> <span>예약관리</span>
      </div>
      <div className={styles.menuItem}>
        <img src={analysis} alt="" width="16"></img> <span>판매분석</span>
      </div>
      <div className={styles.menuItem}>
        <img src={manage} alt="" width="16"></img> <span>매장관리</span>
      </div>
      <hr />
      <div className={styles.menuItem} onClick={handleNavigate}>
        <img src={logout} alt="" width="16"></img> <span>로그아웃</span>
      </div>
    </div>
  );
}
