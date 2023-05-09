import React, { useState } from "react";
import axios from "axios";

export default function ImageRecognition() {
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseCode, setResponseCode] = useState<number | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setImage(file);
    setResponseCode(null);
  };

  const handleImageSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", image as File);
    try {
      const response = await axios.post("/api/image-recognition", formData);
      setResponseCode(response.status);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  let componentToRender;
  if (isLoading) {
    componentToRender = <div>인식 중입니다.</div>;
  } else if (responseCode === 200) {
    componentToRender = <div>인식이 완료되었습니다.</div>;
  } else if (responseCode === 300) {
    componentToRender = <div>다시 인식해주세요.</div>;
  } else {
    componentToRender = (
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleImageSubmit}>인식 시작</button>
      </div>
    );
  }

  return <div>{componentToRender}</div>;
}

/*
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
  */

/*
function mergeImages(
    image1Url: string,
    image2Base64: string,
    text: string,
    text2: string,
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
  */

/*
  if (!props.printed) {
        axios.post("https://flowery.duckdns.org/api/reservation/print", {
          reservationId: reservationId1,
        });
      }
      */

/*
      axios
            .get("https://flowery.duckdns.org/api/reservation/card", {
              params: {
                reservationId: reservationId1,
              },
            })
            .then((response) => {
              mergeImages(
                cardframe,
                response.data.qrBase64,
                `${props.phrase}`,
                `From. ${props.reservationName}`,
                "test1"
              );
              alert("저장이 완료되었습니다");
            });
          })
          .catch((error) => {
            console.error(error);
          });
          */
