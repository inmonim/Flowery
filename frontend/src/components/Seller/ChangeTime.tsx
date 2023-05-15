import React, { useState } from "react";
import styles from "./ChangeTime.module.scss";
import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { storeId, storeInfo } from "../../recoil/atom";

export default function ChangeTime() {
  const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];
  const [selectedDays, setSelectedDays] = useState<boolean[]>(
    Array(7).fill(false)
  );
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const myStoreId = useRecoilValue(storeId);
  const myStoreInfo = useRecoilValue(storeInfo);
  const convertTimeToNumber = (time: any) => {
    const [hours, minutes] = time.split(":");
    const timeNumber = parseInt(hours + minutes, 10);
    return timeNumber;
  };

  const handleInputChange1 = (event: any) => {
    const timeValue = event.target.value;
    const convertedValue = convertTimeToNumber(timeValue);
    console.log(convertedValue);
    setValue1(convertedValue);
  };

  const handleInputChange2 = (event: any) => {
    const timeValue = event.target.value;
    const convertedValue = convertTimeToNumber(timeValue);
    console.log(convertedValue);
    setValue2(convertedValue);
  };

  const handleClick = (index: number) => {
    const updatedSelectedDays = [...selectedDays];
    updatedSelectedDays[index] = !updatedSelectedDays[index];
    setSelectedDays(updatedSelectedDays);
  };

  const applyChanges = () => {
    if (value1 > 0 && value2 > 0 && value1 < value2) {
      axios
        .patch(`https://flowery.duckdns.org/api/stores/${myStoreId}`, {
          storePhone: myStoreInfo.storePhone,
          info: myStoreInfo.info,
          open: value1,
          close: value2,
          image: myStoreInfo.image,
          profile: myStoreInfo.profile,
        })
        .then(() => {
          alert("영업시간이 변경되었습니다");
        });
    }
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
          <div>
            <input type="time" onChange={handleInputChange1}></input>
            <input type="time" onChange={handleInputChange2}></input>
          </div>
        </div>
        <button className="w-[100%]" onClick={applyChanges}>
          저장
        </button>
      </div>
    </div>
  );
}
