import React, { useState } from "react";
import styles from "./SellerLoginPage.module.scss";
import InputForm from "../../../components/Common/InputForm";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { storeId, storeName, storeInfo } from "../../../recoil/atom";
import axios from "axios";

export default function SellerLogin() {
  const navigate = useNavigate();
  const [myStoreId, setStoreId] = useRecoilState<number>(storeId);
  const [myStoreName, setStoreName] = useRecoilState<string>(storeName);
  const [myStoreInfo, setStoreInfo] = useRecoilState<object>(storeInfo);
  const [myId, setMyId] = useState<string>("");
  const [myPw, setMyPw] = useState<string>("");

  function handleClick() {
    console.log(myId, myPw);
    axios
      .post("https://flowery.duckdns.org/api/users/login-seller", {
        id: myId,
        pass: myPw,
      })
      .then((response) => {
        setStoreId(response.data.storeId);
        axios
          .post("https://flowery.duckdns.org/api/stores/info", {
            storeId: response.data.storeId,
          })
          .then((res) => {
            setStoreInfo(res.data);
          });
        axios
          .post("https://flowery.duckdns.org/api/stores/info", {
            storeId: response.data.storeId,
          })
          .then((responses) => {
            setStoreName(responses.data.storeName);
            navigate("/seller");
          });
      })
      .catch((err) => {
        alert("파트너스가 아니시거나 잘못된 입력입니다.");
      });
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
          <InputForm
            label="아이디"
            placeholder="아이디를 입력해주세요"
            value={myId}
            onChange={(e) => setMyId(e.target.value)}
            type="text"
            onEnter={handleClick}
          />
          <InputForm
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            value={myPw}
            onChange={(e) => setMyPw(e.target.value)}
            type="password"
            onEnter={handleClick}
          />
          <div className={styles.find}>ID/PW 찾기</div>
          <div className={styles.loginbtn} onClick={handleClick}>
            로그인
          </div>
        </div>
      </div>
    </>
  );
}
