import React from "react";
import styles from "./PrintTitle.module.scss";

export default function PrintTitle() {
  return (
    <main>
      <div className={styles.font1}>예약 내역</div>
      <div className={styles.font2}>오늘 총 N건의 예약이 있습니다. </div>
    </main>
  );
}
