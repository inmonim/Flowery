import React from "react";
import styles from "./ItemInfo.module.scss";
import flower from "../../assets/example1.jpg";

export default function ItemInfo() {
  return (
    <div className={styles.maincontainer}>
      <div className={styles.itemcontainer}>
        <div className={styles.items}>
          <div className={styles.picture}>
            <img src={flower} alt="flower" />
          </div>
          <div className={styles.description}>
            <div className={styles.number}>꽃분이</div>
            <div className={styles.time}>2023/04/20 17:00</div>
          </div>
        </div>
        <div className={styles.printing}>
          <p>출력</p>
        </div>
      </div>
      <div className={styles.itemcontainer}>
        <div className={styles.items}>
          <div className={styles.picture}>
            <img src={flower} alt="flower" />
          </div>
          <div className={styles.description}>
            <div className={styles.number}>꽃분이</div>
            <div className={styles.time}>2023/04/20 17:00</div>
          </div>
        </div>
        <div className={styles.printing}>
          <p>출력</p>
        </div>
      </div>
      <div className={styles.itemcontainer}>
        <div className={styles.items}>
          <div className={styles.picture}>
            <img src={flower} alt="flower" />
          </div>
          <div className={styles.description}>
            <div className={styles.number}>꽃분이</div>
            <div className={styles.time}>2023/04/20 17:00</div>
          </div>
        </div>
        <div className={styles.printing}>
          <p>출력</p>
        </div>
      </div>
    </div>
  );
}
