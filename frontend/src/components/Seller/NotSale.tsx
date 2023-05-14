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
  const [flowerData, setFlowerData] = useState<Array<object>>([]);
  const [message, setMessage] = useState<string>("");
  const [recogOK, setRecogOK] = useState<boolean>(false);

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
          .then((data) => {
            console.log(data.file_url, data.flower_object, data.message)
            setPhotoUrl1(data.file_url);
          
            const flowerDataArray = Object.entries(data.flower_object).map(([flower, count]) => ({ flower, count }));
            setFlowerData(flowerDataArray);
          
            setMessage(data.message);
          });
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

  function retry() {
    setPhotoUrl1(null);
    setFlowerData([]);
  }

  function confirm(datas: any) {
    const tmp: { [key: string]: number } = {};
    datas.forEach((item: any) => {
      tmp[item.flower] = item.count;
    });

    axios.post('https://flowery.duckdns.org/flask/saveSales', {
      flower_object : tmp,
      reservation_id : 0
    })
    .then(() => {
      setRecogOK(true);
    })
    .catch((err) => {
      console.log(err);
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
                {flowerData && flowerData.length > 0 ? (
    <>
      {flowerData.map((item: any, index: any) => (
        <div key={index}>
          <p className={styles.classTim}>{item.flower} : {item.count}</p>
        </div>
      ))}
      {recogOK ? <p className={styles.classTim}>인식이 완료되었습니다.</p> : <><p className={styles.classTim}>결과가 맞으시면 확인을 눌러주세요.</p>
      <div className="flex justify-between gap-[3rem] mt-3">
        <button className="text-center w-[50%] bg-[green] text-white" onClick={retry}>재시도</button>
        <button className="text-center w-[50%] bg-[#437ef7] text-white" onClick={() => confirm(flowerData)}>확인</button>
      </div></>}
    </>
  ) : (
    <div>
      {selectedItem && selectedItem.goodsName === '기타' ?
                  <p className={styles.steptitle}>Step2. 객체인식용 사진촬영</p> :
                  <p className={styles.steptitle}>Step1. 객체인식용 사진촬영</p>}
      <p className={styles.stephint}>
        ※ 인식 결과 미학습된 품목이 존재할 수 있습니다. 
        그 경우 확인을 누르지 마시고 저장해주십시오.
      </p>
    </div>
  )}
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
