import React from "react";
import styles from "./ItemInfo.module.scss";
import flower from "../../assets/example1.jpg";

export default function ItemInfo() {
  return (
    <div className={styles.itemcontainer}>
      <div className={styles.items}>
        <div className={styles.picture}>
          <img src={flower} alt="flower" />
        </div>
      </div>
    </div>
  );
}
