import React from "react";
import styles from "./SellerHeader.module.scss";
import Logo from "../../../assets/Seller_logo.png";

export default function Header() {
  return (
    <div className={styles.header}>
      <img src={Logo} alt="" className={styles.logo} />
    </div>
  );
}
