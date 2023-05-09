import React from "react";
import ManagePrint from "../../components/Seller/ManagePrint";
import MainAnalyzing from "../../components/Seller/MainAnalyzing";
import WaitingApprove from "../../components/Seller/WaitingApprove";
import styles from "./SellerMainPage.module.scss";
import "../../assets/styles/variable.scss";

export default function SellerMainPage() {
  return (
    <div>
      <div className={styles.hello}>꽃집123님 반갑습니다.</div>
      <WaitingApprove />
      <ManagePrint />
      <MainAnalyzing />
    </div>
  );
}
