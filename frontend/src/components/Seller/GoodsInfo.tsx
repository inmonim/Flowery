import React, { useEffect, useState } from "react";
import styles from "./GoodsInfo.module.scss";
import flower from "../../assets/example1.jpg";
import deletebtn from "../../assets/delete_btn.png";
import axios from "axios";

interface GoodsItem {
  goodsId: number;
  goodsName: string;
  goodsPrice: number;
  goodsDetail: string;
}

export default function GoodsInfo(props: GoodsItem) {
  const [images, setImages] = useState<string>("");
  useEffect(() => {
    axios
      .get(`https://flowery.duckdns.org/api/goods/${props.goodsId}/sample`)
      .then((response) => {
        setImages(response.data[0].picture);
      });
  });
  function deleteGoods(id: number) {
    axios
      .delete(`https://flowery.duckdns.org/api/stores/goods/${id}`)
      .then(() => {
        alert("삭제되었습니다.");
      });
  }
  return (
    <div className={styles.maincontainer}>
      <div className={styles.itemcontainer}>
        <div className={styles.items}>
          <div className={styles.picture}>
            <img src={images} alt="flower" />
          </div>
          <div className={styles.description}>
            <div className={styles.number}>{props.goodsName}</div>
            <div className={styles.time}>₩ {props.goodsPrice}</div>
          </div>
          <div className={styles.imgbtn}>
            <img
              src={deletebtn}
              alt=""
              onClick={() => deleteGoods(props.goodsId)}
            ></img>
          </div>
        </div>
        {/* <div className={styles.printing} onClick={handleModal}>
          보기
        </div> */}
      </div>
      {/* {props.permission === null && showModal && (
        <CheckOrder
          closeModal={closeModal}
          goodsName={props.goodsName}
          reservationId={props.reservationId}
          reservationName={props.reservationName}
          demand={props.goodsName}
          date={props.date}
        />
      )} */}
    </div>
  );
}
