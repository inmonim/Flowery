import React from "react";
import styles from "./PrintTitle.module.scss";

interface TitleProps {
  num: number;
}

export default function PrintTitle(props: TitleProps) {
  return (
    <main>
      <div className={styles.font1}>예약 내역</div>
      <div className={styles.font2}>
        오늘 총 {props.num}건의 예약이 있습니다.
      </div>
    </main>
  );
}
