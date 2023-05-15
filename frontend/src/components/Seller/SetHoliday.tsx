import React, { useState, useEffect } from "react";
import styles from "./SetHoliday.module.scss";
import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { storeId, storeInfo } from "../../recoil/atom";

export default function SetHoliday() {
  const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];
  const [selectedDays, setSelectedDays] = useState<boolean[]>(
    Array(7).fill(false)
  );
  const myStoreId = useRecoilValue(storeId);
  const myStoreInfo = useRecoilValue(storeInfo);
  const [holiday, setHoliday] = useState("");

  useEffect(() => {
    axios
      .post("https://flowery.duckdns.org/api/stores/holidays", {
        storeId: myStoreId,
      })
      .then((response) => {
        setHoliday(response.data);
        console.log(response.data);
        const updatedSelectedDays = daysOfWeek.map((day) =>
          response.data.includes(day)
        );
        setSelectedDays(updatedSelectedDays);
      });
  }, [myStoreId]);

  const handleClick = (index: number) => {
    const updatedSelectedDays = [...selectedDays];
    updatedSelectedDays[index] = !updatedSelectedDays[index];
    setSelectedDays(updatedSelectedDays);
  };

  const handleChange = () => {
    let holidays = "";
    selectedDays.forEach((isSelected, index) => {
      if (isSelected) {
        holidays += daysOfWeek[index];
      }
    });
    setHoliday(holidays);
    console.log(holidays);
    console.log(holiday);
    axios
      .put("https://flowery.duckdns.org/api/stores/holidays", {
        storeId: myStoreId,
        holidays: holiday,
      })
      .then(() => {
        alert("휴일 변경이 완료되었습니다");
      });
  };
  return (
    <div className={styles.mainbox}>
      <div className={styles.secondbox}>
        <div className="flex justify-between w-[100%]">
          <p className={styles.font1}>휴일 설정</p>
        </div>
        <div className="w-[100%] flex justify-between">
          {daysOfWeek.map((day, index) => (
            <div
              key={day}
              className={`${styles.day} ${
                selectedDays[index] ? styles.selectday : ""
              }`}
              onClick={() => handleClick(index)}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="w-[100%] flex justify-center"></div>
        <button className="w-[100%]" onClick={handleChange}>
          저장
        </button>
      </div>
    </div>
  );
}
