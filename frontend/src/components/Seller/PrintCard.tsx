import React, { useState, useEffect } from "react";
import styles from "./PrintCard.module.scss";
import camera from "../../assets/add_logo.png";
import { saveAs } from "file-saver";
import axios from "axios";
import cardframe from "../../assets/card1234.png";
import cardframe2 from "../../assets/card123.png";
import { useRecoilValue } from "recoil";
import { storeId } from "../../recoil/atom";
import flower from "../../assets/example1.jpg";
interface PrintCardProps {
  closeModal: () => void;
  reservationId: number;
  printed: number;
  reservationName: string;
  phrase: string;
}

interface Goods {
  goodsId: number;
  goodsName: string;
  goodsPrice: number;
  goodsDetail: string;
}

export default function PrintCard(props: PrintCardProps) {
  const [photoUrl1, setPhotoUrl1] = useState<string | null>(null);
  const [photoUrl2, setPhotoUrl2] = useState<string | null>(null);
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [formdatas, setFormdatas] = useState<FormData | null>(null);
  const [flowerData, setFlowerData] = useState<Array<object>>([]);
  const [message, setMessage] = useState<string>("");
  const [recogOK, setRecogOK] = useState<boolean>(false);
  const [checkGoods, setCheckGoods] = useState<boolean>(false);
  const myStoreId = useRecoilValue(storeId);
  const [myGoods, setMyGoods] = useState<Goods[]>([]);
  const [selectedItem, setSelectedItem] = useState<Goods | null>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    axios
      .post(`https://flowery.duckdns.org/api/goods/info`, {
        storeId: myStoreId,
      })
      .then((response) => {
        setMyGoods(response.data as Goods[]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
        fetch("https://flowery.duckdns.org/flask/objectDetect", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.file_url, data.flower_object, data.message);
            setPhotoUrl1(data.file_url);

            const flowerDataArray = Object.entries(data.flower_object).map(
              ([flower, count]) => ({ flower, count })
            );
            setFlowerData(flowerDataArray);

            setMessage(data.message);
          });
      }
    };
    setStepOne(true);
    input.click();
  }

  function handleCameraClick2(reservationId: number) {
    console.log(photoUrl1, flowerData.length, message);
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "camera";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement)?.files?.[0];
      if (file) {
        const formData2 = new FormData();
        formData2.append("picture", file);
        formData2.append("reservationId", String(reservationId));
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

  function drawMultilineText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) {
    const words = text.split(" ");
    let line = "";
    let posY = y;
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && i > 0) {
        ctx.fillText(line, x, posY);
        line = words[i] + " ";
        posY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, posY);
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
            canvas.width / 2 - 250,
            800,
            500,
            500
          );
          ctx.font = "120px KCC";
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom"; // 텍스트 기준선을 아래쪽으로 설정
          drawMultilineText(
            ctx,
            text,
            canvas.width / 2,
            canvas.height * 0.555,
            1500,
            180
          );

          // draw additional text
          ctx.font = "100px KCC";
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          drawMultilineText(
            ctx,
            text2,
            canvas.width / 2,
            canvas.height * 0.46,
            900,
            100
          );

          const { width: width2, actualBoundingBoxDescent: descent2 } =
            ctx.measureText(text2);
          ctx.beginPath();
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 8;
          ctx.moveTo(
            canvas.width / 2 - width2 / 2 - 20,
            canvas.height * 0.46 + descent2 + 45
          );
          ctx.lineTo(
            canvas.width / 2 + width2 / 2,
            canvas.height * 0.46 + descent2 + 45
          );
          ctx.stroke();

          ctx.font = "100px KCC";
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          drawMultilineText(
            ctx,
            text3,
            canvas.width / 2,
            canvas.height * 0.76,
            900,
            100
          );

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
    console.log(props.reservationId, selectedItem?.goodsName, inputValue);
    if (formdatas) {
      if (!props.printed) {
        axios.post("https://flowery.duckdns.org/api/reservation/print", {
          reservationId: reservationId1,
        });
      }
      if (inputValue !== "") {
        console.log("나는 기타");
        axios.post("https://flowery.duckdns.org/api/reservation/fix", {
          reservationId: props.reservationId,
          goodsName: selectedItem?.goodsName,
          price: inputValue,
        });
      } else {
        console.log("나는 선택한거");
        console.log(
          props.reservationId,
          selectedItem?.goodsName,
          selectedItem?.goodsPrice
        );
        axios.post("https://flowery.duckdns.org/api/reservation/fix", {
          reservationId: props.reservationId,
          goodsName: selectedItem?.goodsName,
          price: selectedItem?.goodsPrice,
        });
      }
      fetch("https://flowery.duckdns.org/api/messages/flower-picture", {
        method: "POST",
        body: formdatas,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return axios.get("https://flowery.duckdns.org/api/reservation/card", {
            params: {
              reservationId: reservationId1,
            },
          });
        })
        .then((response) => {
          if (response.data.card === 0) {
            return mergeImages(
              cardframe,
              response.data.qrBase64,
              `${props.phrase}`,
              `From. ${props.reservationName}`,
              `kkotdeul`,
              "test1"
            );
          } else if (response.data.card === 1) {
            return mergeImages(
              cardframe2,
              response.data.qrBase64,
              `${props.phrase}`,
              `From. ${props.reservationName}`,
              `kkotdeul`,
              "test1"
            );
          }
        })
        .then(() => {
          alert("저장이 완료되었습니다");
          props.closeModal();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function checkStep1() {
    setCheckGoods(true);
  }

  function retry() {
    setPhotoUrl1(null);
    setFlowerData([]);
  }

  function confirm(datas: any) {
    console.log(props.reservationId);
    const tmp: { [key: string]: number } = {};
    datas.forEach((item: any) => {
      tmp[item.flower] = item.count;
    });

    axios
      .post("https://flowery.duckdns.org/flask/saveSales", {
        flower_object: tmp,
        reservation_id: props.reservationId,
      })
      .then(() => {
        setRecogOK(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSelectItem(item: Goods) {
    setSelectedItem(item);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    if (/^\d*$/.test(value)) {
      setInputValue(value);
    } else {
      alert("숫자만 입력해야 합니다.");
    }
  }
  return (
    <div className={styles.modal}>
      <div className={styles.fontcheck}>.</div>
      <div className={styles.modalContent}>
        {!checkGoods ? (
          <>
            <div className={styles.stepone}>
              <p>1. 판매 상품을 선택해주세요</p>
              {myGoods.map((item) => (
                <div key={item.goodsId}>
                  <div
                    className={`${styles.items} ${
                      selectedItem === item ? styles.selected : ""
                    }`}
                    onClick={() => handleSelectItem(item)}
                  >
                    <div className={styles.picture}>
                      <img src={flower} alt="flower" />
                    </div>
                    <div className={styles.description}>
                      <div className={styles.number}>{item.goodsName}</div>
                      <div className={styles.time}>₩ {item.goodsPrice}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-[87vw] flex justify-center">
              {selectedItem !== null ? (
                <button className={styles.successbutton} onClick={checkStep1}>
                  다음
                </button>
              ) : (
                <button className={styles.printbutton}>다음</button>
              )}
            </div>
          </>
        ) : (
          <>
            {selectedItem && selectedItem.goodsName === "기타" ? (
              <>
                <div className="text-xl font-semibold mt-7 left">
                  기타(현장판매)
                </div>
                <div className={styles.stepone}>
                  <div className="mb-6">
                    <input
                      placeholder="ex) 5000"
                      type="text"
                      id="default-input"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={inputValue}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div>
                    <p className={styles.steptitle}>
                      Step1. 판매 가격을 입력해주세요
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.stepone}>
                <div className="text-xl font-semibold">
                  {selectedItem?.goodsName}
                </div>
                <div className={styles.time}>₩ {selectedItem?.goodsPrice}</div>
              </div>
            )}
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
                {flowerData && flowerData.length > 0 ? (
                  <>
                    {flowerData.map((item: any, index: any) => (
                      <div key={index}>
                        <p className="text-center">
                          {item.flower} : {item.count}
                        </p>
                      </div>
                    ))}
                    {recogOK ? (
                      <p>인식이 완료되었습니다.</p>
                    ) : (
                      <>
                        <p className="pt-5 text-center">
                          결과가 맞으시면 확인을 눌러주세요.
                        </p>
                        <div className="flex justify-between gap-[3rem] mt-3">
                          <button
                            className="text-center w-[50%] bg-[green] text-white"
                            onClick={retry}
                          >
                            재시도
                          </button>
                          <button
                            className="text-center w-[50%] bg-[#437ef7] text-white"
                            onClick={() => confirm(flowerData)}
                          >
                            확인
                          </button>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div>
                    {selectedItem && selectedItem.goodsName === "기타" ? (
                      <p className={styles.steptitle}>
                        Step2. 객체인식용 사진촬영
                      </p>
                    ) : (
                      <p className={styles.steptitle}>
                        Step1. 객체인식용 사진촬영
                      </p>
                    )}
                    <p className={styles.stephint}>
                      ※ 인식 결과 미학습된 품목이 존재할 수 있습니다. 그 경우
                      확인을 누르지 마시고 저장해주십시오.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.stepone}>
              <div>
                {photoUrl2 ? (
                  <img
                    src={photoUrl2}
                    alt="captured"
                    onClick={() => handleCameraClick2(props.reservationId)}
                  ></img>
                ) : (
                  <img
                    src={camera}
                    alt="camera icon"
                    onClick={() => handleCameraClick2(props.reservationId)}
                  ></img>
                )}
              </div>
              {selectedItem && selectedItem.goodsName === "기타" ? (
                <p className={styles.steptitle}>Step3. 고객용 사진촬영</p>
              ) : (
                <p className={styles.steptitle}>Step2. 고객용 사진촬영</p>
              )}
            </div>
          </>
        )}
        {checkGoods ? (
          stepOne && stepTwo ? (
            <button
              className={styles.successbutton}
              onClick={() => handlePrint(props.reservationId)}
            >
              생성
            </button>
          ) : (
            <button className={styles.printbutton}>생성</button>
          )
        ) : null}
        <button onClick={handleClick}>취소</button>
      </div>
    </div>
  );
}
