import React, { useState, useEffect } from "react";
import styles from "./SalesList.module.scss";
import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { storeId, storeInfo } from "../../recoil/atom";
import BarChart from "./BarChart";
export default function SalesList() {
  const myStoreId = useRecoilValue(storeId);

  return (
    <div className={styles.mainbox}>
      <div className={styles.secondbox}>
        <div className="flex justify-between w-[100%]">
          <p className={styles.font1}>판매 내역</p>
        </div>
        <div className="w-[100%] h-[60vh] flex justify-center">
          <BarChart />
        </div>
      </div>
    </div>
  );
}
