import React, { useEffect, useState } from "react";
import styles from "./ManagePrint.module.scss";
import Title from "./PrintTitle";
import ItemInfo from "./ItemInfo";
import axios from "axios";
import { useLocation } from "react-router-dom";

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

export default function ManagePrint() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  const [reservation, setReservation] = useState<ReservationItem[]>([]);
  const location = useLocation();

  useEffect(() => {
    axios
      .post(`https://flowery.duckdns.org/api/reservation/store`, {
        storeId: 1,
      })
      .then((response) => {
        let filteredItems = response.data;
        if (location.pathname === "/seller") {
          filteredItems = response.data.filter(
            (item: ReservationItem) =>
              item.permission === 1 && item.printed === 0
          );
        }
        setReservation(filteredItems);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [formattedDate, location]);

  return (
    <div className={styles.mainbox}>
      <div className={styles.secondbox}>
        <div className={styles.title}>
          <Title num={reservation.length} />
        </div>
        {reservation.slice(0, 5).map((item) => (
          <div key={item.reservationId}>
            <ItemInfo
              reservationName={item.reservationName}
              date={item.date}
              printed={item.printed}
              reservationId={item.reservationId}
              phrase={item.phrase}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
