import React, { useState } from "react";
import styles from "./PrintCard.module.scss";
import camera from "../../assets/add_logo.png";
import { saveAs } from "file-saver";
import Test1 from "./test1";

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
    setStepTwo(true);
    input.click();
  }

  function handlePrintClick() {
    if (photoUrl1 && photoUrl2) {
      // create image elements to save
      const image1 = new Image();
      const image2 = new Image();
      image1.src = photoUrl1;
      image2.src = photoUrl2;

      // wait for images to load
      Promise.all([image1.decode(), image2.decode()])
        .then(() => {
          // create canvas element for the first image
          const canvas1 = document.createElement("canvas");
          canvas1.width = image1.naturalWidth;
          canvas1.height = image1.naturalHeight;

          // draw first image on canvas
          const context1 = canvas1.getContext("2d");
          context1?.drawImage(image1, 0, 0);

          // convert canvas to blob and save as file
          canvas1.toBlob(
            (blob1) => {
              if (blob1) {
                saveAs(blob1, "test1.jpg");

                // create canvas element for the second image
                const canvas2 = document.createElement("canvas");
                canvas2.width = image2.naturalWidth;
                canvas2.height = image2.naturalHeight;

                // draw second image on canvas
                const context2 = canvas2.getContext("2d");
                context2?.drawImage(image2, 0, 0);

                // convert canvas to blob and save as file
                canvas2.toBlob(
                  (blob2) => {
                    if (blob2) {
                      saveAs(blob2, "test2.jpg");

                      // set the stepOne and stepTwo states to true
                      setStepOne(true);
                      setStepTwo(true);
                    }
                  },
                  "image/jpeg",
                  1
                );
              }
            },
            "image/jpeg",
            1
          );
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.stepone}>
          {/* <div>
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
          </div> */}
          <Test1 />
          {/* <div>
            <p className={styles.steptitle}>Step1. 객체인식용 사진촬영</p>
            <p className={styles.stephint}>
              ※ 꽃봉오리가 잘 보이도록 위에서 촬영해주세요
            </p>
          </div> */}
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
          <button className={styles.successbutton} onClick={handlePrintClick}>
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
