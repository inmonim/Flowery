import React, { useEffect, useState } from "react";
import styles from "./PrintCard.module.scss";
import camera from "../../assets/add_logo.png";
import { saveAs } from "file-saver";
import axios from "axios";
import cardframe from "../../assets/card1234.png";
import cardframe2 from "../../assets/card123.png";

interface CardData {
  qrBase64: string;
  phrase: string;
  reservationName: string;
  card: number;
  // cardData 객체에 포함될 속성들을 정의합니다.
}

interface PrintCardProps {
  closeModal: () => void;
  reservationId: number;
}

export default function PrintCard(props: PrintCardProps) {
  const [cardData, setCardData] = useState<CardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://flowery.duckdns.org/api/reservation/card",
          {
            params: {
              reservationId: props.reservationId,
            },
          }
        );
        setCardData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [props.reservationId]);

  function handleClick() {
    props.closeModal();
  }

  function mergeImages(
    image1Url: string,
    image2Base64: string,
    text: string,
    text2: string,
    text3: string,
    outputFileName: string
  ) {
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
            600
          );
          ctx.font = "100px KCC";
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom"; // 텍스트 기준선을 아래쪽으로 설정
          ctx.fillText(text, canvas.width / 2, canvas.height * 0.675);

          // add underline
          const { width, actualBoundingBoxDescent } = ctx.measureText(text);
          ctx.beginPath();
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 8;
          ctx.moveTo(
            canvas.width / 2 - width / 2,
            canvas.height * 0.665 + actualBoundingBoxDescent + 75
          );
          ctx.lineTo(
            canvas.width / 2 + width / 2,
            canvas.height * 0.665 + actualBoundingBoxDescent + 75
          );
          ctx.stroke();

          // draw additional text
          ctx.font = "80px KCC";
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          ctx.fillText(text2, canvas.width / 2, canvas.height * 0.6);

          const { width: width2, actualBoundingBoxDescent: descent2 } =
            ctx.measureText(text2);
          ctx.beginPath();
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 8;
          ctx.moveTo(
            canvas.width / 2 - width2 / 2,
            canvas.height * 0.6 + descent2 + 45
          );
          ctx.lineTo(
            canvas.width / 2 + width2 / 2,
            canvas.height * 0.6 + descent2 + 45
          );
          ctx.stroke();
          // convert canvas to image file and save
          canvas.toBlob(
            (blob) => {
              if (blob) {
                saveAs(blob, outputFileName);
              } else {
                console.error("Failed to convert canvas to blob");
              }
            },
            "image/jpeg",
            1
          );
        };
        image2.src = `data:image/png;base64,${image2Base64}`;
      }
    };
    image1.src = image1Url;
  }

  function handlePrint(reservationId1: number) {
    axios
      .get("https://flowery.duckdns.org/api/reservation/card", {
        params: {
          reservationId: reservationId1,
        },
      })
      .then((response) => {
        setCardData(response.data);
        if (cardData) {
          if (cardData.card === 0) {
            mergeImages(
              cardframe,
              cardData.qrBase64,
              `${cardData.phrase}`,
              `From. ${cardData.reservationName}`,
              `kkotdeul`,
              "test1"
            );
          } else if (cardData.card === 1) {
            mergeImages(
              cardframe2,
              cardData.qrBase64,
              `${cardData.phrase}`,
              `From. ${cardData.reservationName}`,
              `kkotdeul`,
              "test1"
            );
          }
        }
      });
    props.closeModal();
  }

  return (
    <div className={styles.modal}>
      <div className={styles.fontcheck}>
        .
      </div>
      <div className={styles.modalContent}>
        <div className={styles.stepone}>
          <div>
            <p className={styles.steptitle}>카드를 다시 가져오시겠습니까?</p>
          </div>
        </div>
        <button
          className={styles.successbutton}
          onClick={() => handlePrint(props.reservationId)}
        >
          가져오기
        </button>
        <button onClick={handleClick}>취소</button>
      </div>
    </div>
  );
}
