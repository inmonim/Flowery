import React, { useState } from "react";
import styles from "./PrintCard.module.scss";
import camera from "../../assets/add_logo.png";
import { saveAs } from "file-saver";
import axios from "axios";
import cardframe from "../../assets/card1234.png";
import cardframe2 from "../../assets/card123.png";
interface modalProps {
  closeModal: () => void;
}

export default function GoodsAdd(props: modalProps) {
  function handleClick() {
    props.closeModal();
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.stepone}>
          <div>
            <img
              src={camera}
              alt="camera icon"
              // onClick={handleCameraClick1}
            ></img>
          </div>
          <div>
            <p className={styles.steptitle}>상품 사진을 추가해주세요</p>
            <p className={styles.stephint}>
              ※ 반드시 한 장 이상 추가되어야 합니다.
            </p>
          </div>
        </div>
        <div className={styles.stepone}>
          <div>
            <p className={styles.steptitle}>Step2. 고객용 사진촬영</p>
            <p className={styles.stephint}>
              ※ 밝은 자연광이나 부드러운 조명에서 촬영해보세요.
            </p>
          </div>
        </div>
        {/* {stepOne && stepTwo ? (
          <button
            className={styles.successbutton}
            onClick={() => handlePrint(props.reservationId)}
          >
            생성
          </button>
        ) : (
          <button className={styles.printbutton}>등록</button>
        )} */}
        <button onClick={handleClick}>취소</button>
      </div>
    </div>
  );
}
