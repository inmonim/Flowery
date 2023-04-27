import React from "react";
import styles from "./SellerLoginPage.module.scss";
import InputForm from "../../components/Common/InputForm";
import { useNavigate } from "react-router-dom";

export default function SellerLogin() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/seller");
  }
  return (
    <>
      <div className={styles.titlecontainer}>
        <div className={styles.title}>Flowery &nbsp;&nbsp;for Partners </div>
        <div className={styles.subtitle}>
          플라워리의 파트너스만을 위한 페이지입니다.
        </div>
      </div>
      <div className={styles.loginbox}>
        <div className={styles.subloginbox}>
          <InputForm label="아이디" placeholder="아이디를 입력해주세요" />
          <InputForm label="비밀번호" placeholder="비밀번호를 입력해주세요" />
          <div className={styles.find}>ID/PW 찾기</div>
          <div className={styles.loginbtn} onClick={handleClick}>
            로그인
          </div>
        </div>
      </div>
    </>
  );
}
