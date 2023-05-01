import React from "react";
import ManagePrint from "../../components/Seller/ManagePrint";
import MainAnalyzing from "../../components/Seller/MainAnalyzing";
import styles from "./SellerMainPage.module.scss";

export default function SellerMainPage() {
  return (
    <div>
      <div className={styles.hello}>꽃집123님 반갑습니다.</div>
      <ManagePrint />
      <MainAnalyzing />
    </div>
  );
}
