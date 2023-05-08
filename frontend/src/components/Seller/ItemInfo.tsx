import React, { useState } from "react";
import styles from "./ItemInfo.module.scss";
import flower from "../../assets/example1.jpg";
import PrintCard from "./PrintCard";

interface ItemInfoProps {
  reservationName: string;
  date: string;
  printed: number;
  reservationId: number;
}

export default function ItemInfo(props: ItemInfoProps) {
  const dateString = props.date;
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}`;
  const [showModal, setShowModal] = useState(false); // 모달 상태 초기값은 false로 설정합니다.

  function handleModal() {
    setShowModal(true); // 모달을 열기 위해 상태를 true로 변경합니다.
  }

  function closeModal() {
    setShowModal(false); // 모달을 닫기 위해 상태를 false로 변경합니다.
  }

  return (
    <div className={styles.maincontainer}>
      <div className={styles.itemcontainer}>
        <div className={styles.items}>
          <div className={styles.picture}>
            <img src={flower} alt="flower" />
          </div>
          <div className={styles.description}>
            <div className={styles.number}>{props.reservationName}</div>
            <div className={styles.time}>{formattedDate}</div>
          </div>
        </div>
        <div
          className={props.printed === 0 ? styles.printing : styles.reprinting}
          onClick={handleModal}
        >
          <p>{props.printed === 0 ? "출력" : "재출력"}</p>
        </div>
      </div>
      {showModal && <PrintCard closeModal={closeModal} reservationId={props.reservationId}/>}{" "}
      {/* 모달이 열린 상태이면 PrintCard 컴포넌트를 렌더링합니다. */}
    </div>
  );
}
