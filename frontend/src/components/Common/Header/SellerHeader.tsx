import React from "react";
import styles from "./SellerHeader.module.scss";
import Logo from "../../../assets/Seller_logo.png";
import scan from "../../../assets/scan_logo.png";
import menu from "../../../assets/menu_logo.png";

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <img src={Logo} alt="" className={styles.logo} />
      </div>
      <div>
        <img src={scan} alt="" className={styles.scan} />
        <img src={menu} alt="" className={styles.menu} />
      </div>
    </header>
  );
}
