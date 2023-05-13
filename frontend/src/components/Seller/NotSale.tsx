import React, { useEffect, useState } from "react";
import styles from "./NotSale.module.scss";
import camera from "../../assets/add_logo.png";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { storeId } from "../../recoil/atom";
import flower from "../../assets/example1.jpg";

interface Props {
  closeModal33: () => void;
}

interface Goods {
  goodsId: number;
  goodsName: string;
  goodsPrice: number;
  goodsDetail: string;
}

export default function NotSale(props: Props) {
  const [photoUrl1, setPhotoUrl1] = useState<string | null>(null);
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [formdatas, setFormdatas] = useState<FormData | null>(null);
  const myStoreId = useRecoilValue(storeId)
  const [myGoods, setMyGoods] = useState<Goods[]>([]);
  const [selectedItem, setSelectedItem] = useState<Goods | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [filedata, setFileData] = useState<any>(null);

  function handleClick() {
    props.closeModal33();
  }
  
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    
    if (/^\d*$/.test(value)) {
      setInputValue(value);
    } else {
      alert('숫자만 입력해야 합니다.');
    }
  }
  
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
          .then((data) => setFileData(data));
        setPhotoUrl1(URL.createObjectURL(file));
      }
    };
    input.click();
  }

  function handleSelectItem(item: Goods) {
    setSelectedItem(item);
  }

  function checkStep1() {
    setStep1(true);
  }

  function checkStep2() {

  }

  function checkwithStep2(price: number) {
    axios.patch(`https://flowery.duckdns.org/api/stores/goods/${selectedItem?.goodsId}`, {
      storeId : myStoreId,
      goodsId : selectedItem?.goodsId,
      goodsName : selectedItem?.goodsName,
      goodsPrice : price,
      goodsDetail : selectedItem?.goodsDetail
    })
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {step1 || step2 ? (
          <>
            {step1 && !step2 ? (
              <>
              {selectedItem && selectedItem.goodsName === '기타' ?
              <>
                <div className="text-xl font-semibold mt-7 left">기타(현장판매)</div>
                <div className={styles.stepone}>
                <div className="mb-6">
                  <input placeholder="ex) 5000" type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={inputValue}
          onChange={handleChange}></input>
                </div>
                  <div>
                    <p className={styles.steptitle}>Step1. 판매 가격을 입력해주세요</p>
                  </div>
                </div>
              </>
              :
              <div className={styles.stepone}>
                <div className="text-xl font-semibold">{selectedItem?.goodsName}</div>
                <div className={styles.time}>₩ {selectedItem?.goodsPrice}</div>
              </div>}
              <div className={styles.stepone}>
                <div>
                  {photoUrl1 ? (
                    <img
                      src={photoUrl1}
                      alt="captured"
                      onClick={handleCameraClick1}
                    />
                  ) : (
                    <img
                      src={camera}
                      alt="camera icon"
                      onClick={handleCameraClick1}
                    />
                  )}
                </div>
                <div>
                {selectedItem && selectedItem.goodsName === '기타' ?
                  <p className={styles.steptitle}>Step2. 객체인식용 사진촬영</p> :
                  <p className={styles.steptitle}>Step1. 객체인식용 사진촬영</p>}
                  <p className={styles.stephint}>
                    ※ 꽃봉오리가 잘 보이도록 위에서 촬영해주세요
                  </p>
                </div>
              </div>
              <div className="w-[87vw] flex justify-center">
                {selectedItem && selectedItem.goodsName === '기타' && inputValue !== "" ? (
                  <button className={styles.successbutton} onClick={() => checkwithStep2(selectedItem.goodsPrice)}>저장</button>
                ) : selectedItem && selectedItem.goodsName === '기타' && inputValue === "" ? (
                  <button className={styles.printbutton}>저장</button>
                ) : (
                  <button className={styles.successbutton} onClick={checkStep2}>저장</button>
                )}
              </div>
              </>
            ) : (
              ''
            )}
          </>
        ) : (
          <>
          <div className={styles.stepone}>
            <p>1. 판매 상품을 선택해주세요</p>
            {myGoods.map((item) => (
              <div key={item.goodsId}>
                <div className={`${styles.items} ${selectedItem === item ? styles.selected : ''}`} onClick={() => handleSelectItem(item)}>
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
          { selectedItem !== null ? <button className={styles.successbutton} onClick={checkStep1}>다음</button> : <button className={styles.printbutton}>다음</button>}</div></>
        )}
        <button onClick={handleClick}>취소</button>
      </div>
    </div>
  );
}
