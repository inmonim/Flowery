import React, { useState } from "react";
import styles from "./PrintCard.module.scss";
import camera from "../../assets/add_logo.png";

interface PrintCardProps {
  closeModal: () => void;
}

export default function PrintCard(props: PrintCardProps) {
  const [photoUrl1, setPhotoUrl1] = useState<string | null>(null);
  const [photoUrl2, setPhotoUrl2] = useState<string | null>(null);
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);

  function handleClick() {
    props.closeModal();
  }

  function handleCameraClick1() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "camera";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement)?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPhotoUrl1(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    setStepOne(true);
    input.click();
  }

  function handleCameraClick2() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "camera";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement)?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPhotoUrl2(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
    setStepTwo(true);
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.stepone}>
          <div>
            {photoUrl1 ? (
              <img
                src={photoUrl1}
                alt="captured"
                onClick={handleCameraClick1}
              ></img>
            ) : (
              <img
                src={camera}
                alt="camera icon"
                onClick={handleCameraClick1}
              ></img>
            )}
          </div>
          <div>
            <p className={styles.steptitle}>Step1. 객체인식용 사진촬영</p>
            <p className={styles.stephint}>
              ※ 꽃봉오리가 잘 보이도록 위에서 촬영해주세요
            </p>
          </div>
        </div>
        <div className={styles.stepone}>
          <div>
            {photoUrl2 ? (
              <img
                src={photoUrl2}
                alt="captured"
                onClick={handleCameraClick2}
              ></img>
            ) : (
              <img
                src={camera}
                alt="camera icon"
                onClick={handleCameraClick2}
              ></img>
            )}
          </div>
          <div>
            <p className={styles.steptitle}>Step2. 고객용 사진촬영</p>
            <p className={styles.stephint}>
              ※ 밝은 자연광이나 부드러운 조명에서 촬영해보세요.
            </p>
          </div>
        </div>
        {stepOne && stepTwo ? (
          <button className={styles.successbutton}>출력</button>
        ) : (
          <button className={styles.printbutton}>출력</button>
        )}
        <button onClick={handleClick}>취소</button>
      </div>
    </div>
  );
}
