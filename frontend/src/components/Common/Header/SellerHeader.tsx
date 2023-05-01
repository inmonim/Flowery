import React from "react";
import styles from "./SellerHeader.module.scss";
import Logo from "../../../assets/Seller_logo.png";
import scan from "../../../assets/scan_logo.png";
import menu from "../../../assets/menu_logo.png";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  handleMenuClick: () => void;
}

export default function Header(props: HeaderProps) {
  const location = useLocation();
  if (location.pathname === "/seller/login") {
    return (
      <header className={styles.header}>
        <div>
          <img src={Logo} alt="" className={styles.logo} />
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div>
        <img src={Logo} alt="" className={styles.logo} />
      </div>
      <div>
        <img src={scan} alt="" className={styles.scan} />
        <img
          src={menu}
          alt=""
          className={styles.menu}
          onClick={props.handleMenuClick}
        />
      </div>
    </header>
  );
}
