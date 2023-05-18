import React, { useState } from "react";
import styles from "./ApproveInfo.module.scss";
import flower from "../../assets/example1.jpg";
import CheckOrder from "./CheckOrder";

interface ItemInfoProps {
  reservationName: string;
  goodsName: string;
  date: string;
  permission: number;
  reservationId: number;
  phrase: string;
  demand: string;
}

export default function ApproveInfo(props: ItemInfoProps) {
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
            <div className={styles.time}>{props.demand}</div>
          </div>
        </div>
        <div className={styles.printing} onClick={handleModal}>
          보기
        </div>
      </div>
      {props.permission === null && showModal && (
        <CheckOrder
          closeModal={closeModal}
          goodsName={props.goodsName}
          reservationId={props.reservationId}
          reservationName={props.reservationName}
          demand={props.goodsName}
          date={props.date}
        />
      )}
    </div>
  );
}
