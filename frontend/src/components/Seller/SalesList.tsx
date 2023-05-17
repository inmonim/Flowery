import React, { useState, useEffect } from "react";
import styles from "./SalesList.module.scss";
import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { storeId, storeInfo } from "../../recoil/atom";
import BarChart from "./BarChart";

export default function SalesList() {
  const myStoreId = useRecoilValue(storeId);

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={styles.mainbox}>
      <div className={styles.secondbox}>
        <div className="flex justify-between w-[100%]">
          <p className={styles.font1}>판매 내역</p>
          <div className={styles.dropdownContainer}>
            <button
              className={styles.dropdownButton}
              onClick={handleDropdownToggle}
            >
              ▼
            </button>
            {isDropdownOpen && (
              <ul className={styles.dropdownMenu}>
                <li>최근 7일</li>
                <li>최근 30일</li>
                <li>기간 설정</li>
              </ul>
            )}
          </div>
        </div>
        <div className="w-[100%] h-[60vh] flex justify-center">
          <BarChart />
        </div>
      </div>
    </div>
  );
}
