import React, { useEffect, useState } from "react";
import styles from "./WaitingApprove.module.scss";
import ApproveInfo from "./ApproveInfo";
import axios from "axios";

interface ReservationItem {
  reservationId: number;
  userId: number;
  storeId: number;
  messageId: string;
  goodsName: string;
  price: number;
  demand: string;
  date: string;
  printed: number;
  permission: number;
  reservationName: string;
  phrase: string;
}

export default function WaitingApprove() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  const [reservation, setReservation] = useState<ReservationItem[]>([]);

  useEffect(() => {
    axios
      .post(`https://flowery.duckdns.org/api/reservation/store`, {
        storeId: 1,
      })
      .then((response) => {
        setReservation(response.data as ReservationItem[]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [formattedDate]);

  return (
    <div className={styles.mainbox}>
      <div className={styles.secondbox}>
        <p
          className={`${styles.font1}  ${
            reservation.filter((item) => item.permission === null).length <= 0
              ? "pb-0"
              : "pb-[1.2rem]"
          }`}
        >
          승인 대기
        </p>
        {reservation.filter((item) => item.permission === null).length > 0 ? (
          reservation
            .filter((item) => item.permission === null)
            .map((item) => (
              <div key={item.reservationId}>
                <ApproveInfo
                  reservationName={item.reservationName}
                  goodsName={item.goodsName}
                  date={item.date}
                  permission={item.permission}
                  reservationId={item.reservationId}
                  phrase={item.phrase}
                  demand={item.demand}
                />
              </div>
            ))
        ) : (
          <p className={styles.nodata}>승인대기 중인 예약이 없습니다</p>
        )}
      </div>
    </div>
  );
}
