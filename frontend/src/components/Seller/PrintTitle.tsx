import React from "react";
import styles from "./PrintTitle.module.scss";

interface TitleProps {
  num: number;
}

export default function PrintTitle(props: TitleProps) {
  return (
    <main>
      <div className={styles.font1}>
        <p>예약 내역</p>
        <p className={styles.font3}>전체보기</p>
      </div>
      <div className={styles.font2}>총 {props.num}건의 예약이 있습니다.</div>
    </main>
  );
}
