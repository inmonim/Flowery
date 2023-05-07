import React, { useState } from "react";
import styles from "./PrintCard.module.scss";
import camera from "../../assets/add_logo.png";
import { saveAs } from "file-saver";
import axios from 'axios';
import cardframe from "../../assets/card123.png";
interface PrintCardProps {
  closeModal: () => void;
  reservationId: number;
}

export default function PrintCard(props: PrintCardProps) {
  const [photoUrl1, setPhotoUrl1] = useState<string | null>(null);
  const [photoUrl2, setPhotoUrl2] = useState<string | null>(null);
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [formdatas, setFormdatas] = useState<FormData | null>(null);
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
        const formData = new FormData();
        formData.append("file", file);
        fetch('https://flowery.duckdns.org/api/flask/objectDetect', {
          method: 'POST',
          body: formData
        })
        .then((response) => console.log("response", response));
        setPhotoUrl1(URL.createObjectURL(file));
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
        const formData2 = new FormData();
        formData2.append("picture", file);
        formData2.append("reservationId", "1");
        const reader = new FileReader();
        reader.onload = (e) => {
          setPhotoUrl2(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        setFormdatas(formData2);
      }
    };
    setStepTwo(true);
    input.click();
  }

  function mergeImages(image1Url: string, image2Base64: string, outputFileName: string) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    const image1 = new Image();
    image1.onload = () => {
      canvas.width = image1.width;
      canvas.height = image1.height;
  
      // draw image1
      if (ctx) {
        ctx.drawImage(image1, 0, 0);
  
        const image2 = new Image();
        image2.onload = () => {
          // draw image2
          ctx.drawImage(
            image2,
            0,
            0,
            image2.width,
            image2.height,
            750,
            900,
            600,
            600,
          );
  
          // convert canvas to image file and save
          canvas.toBlob((blob) => {
            if (blob) {
              saveAs(blob, outputFileName);
            } else {
              console.error("Failed to convert canvas to blob");
            }
          }, "image/jpeg", 1);
        };
        image2.src = `data:image/png;base64,${image2Base64}`;
      }
    };
    image1.src = image1Url;
  }


  function handlePrint(reservationId: number) {
    if (formdatas) {
      fetch('https://flowery.duckdns.org/api/messages/flower-picture', {
        method: 'POST',
        body: formdatas
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        axios.get('https://flowery.duckdns.org/api/reservation/card', {
            params: {
              reservationId: reservationId
            }
          })
          .then((response) => {
            mergeImages(cardframe, response.data.qrBase64, 'test1')
          })
        // axios.post('https://flowery.duckdns.org/api/reservation/print', {
        //   reservationId : reservationId
        // })
        // .then(() => {
        // })
        alert('저장이 완료되었습니다');
        props.closeModal();
      })
      .catch((error) => {
        console.error(error);
      });
    }
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
        <button className={styles.successbutton} onClick={() => handlePrint(props.reservationId)}>
        출력
      </button>
      ) : (
        <button className={styles.printbutton}>출력</button>
      )}
      <button onClick={handleClick}>취소</button>
    </div>
  </div>
  );
}