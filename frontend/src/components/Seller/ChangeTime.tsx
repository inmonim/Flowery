import React, { useState } from "react";
import styles from "./ChangeTime.module.scss";
import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { storeId, storeInfo } from "../../recoil/atom";

export default function ChangeTime() {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const myStoreId = useRecoilValue(storeId);
  const myStoreInfo = useRecoilValue(storeInfo);
  const [info, setInfo] = useRecoilState(storeInfo);

  function convertToTime(value: any) {
    const hours = Math.floor(value / 100);
    const minutes = value % 100;

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  }

  const convertTimeToNumber = (time: any) => {
    const [hours, minutes] = time.split(":");
    const timeNumber = parseInt(hours + minutes, 10);
    return timeNumber;
  };

  const handleInputChange1 = (event: any) => {
    const timeValue = event.target.value;
    const convertedValue = convertTimeToNumber(timeValue);
    setValue1(convertedValue);
  };

  const handleInputChange2 = (event: any) => {
    const timeValue = event.target.value;
    const convertedValue = convertTimeToNumber(timeValue);
    setValue2(convertedValue);
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
          setInfo({ ...info, open: value1, close: value2 });
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
        <div className="w-[100%] flex justify-between"></div>
        <div className="w-[100%] flex justify-center">
          <div>
            <input
              type="time"
              onChange={handleInputChange1}
              defaultValue={convertToTime(myStoreInfo.open)}
            ></input>
            <input
              type="time"
              onChange={handleInputChange2}
              defaultValue={convertToTime(myStoreInfo.close)}
            ></input>
          </div>
        </div>
        <button className="w-[100%]" onClick={applyChanges}>
          저장
        </button>
      </div>
    </div>
  );
}
