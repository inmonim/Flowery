import React, { useState } from "react";
import styles from "./ChangeTime.module.scss";

export default function ChangeTime() {
  const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];
  const [selectedDays, setSelectedDays] = useState<boolean[]>(
    Array(7).fill(false)
  );

  const handleClick = (index: number) => {
    const updatedSelectedDays = [...selectedDays];
    updatedSelectedDays[index] = !updatedSelectedDays[index];
    setSelectedDays(updatedSelectedDays);
  };

  const applyChanges = () => {
    const selectedDaysToSend = daysOfWeek.filter(
      (day, index) => selectedDays[index]
    );
    // Perform axios request with selectedDaysToSend
  };

  return (
    <div className={styles.mainbox}>
      <div className={styles.secondbox}>
        <div className="flex justify-between w-[100%]">
          <p className={styles.font1}>영업시간 설정</p>
        </div>
        <div className="w-[100%] flex justify-between">
          {/* {daysOfWeek.map((day, index) => (
            <div
              key={day}
              className={`${styles.day} ${
                selectedDays[index] ? styles.selectday : ""
              }`}
              onClick={() => handleClick(index)}
            >
              {day}
            </div>
          ))} */}
        </div>
        <div className="w-[100%] flex justify-center">
          <input
            maxLength={11}
            placeholder="ex) 09:00~13:00"
            className="border border-black rounded-lg h-[3rem] px-3"
          />
        </div>
        <button className="w-[100%]" onClick={applyChanges}>
          저장
        </button>
      </div>
    </div>
  );
}
