import React from "react";
import styles from "./GoodsInfo.module.scss";
import deletebtn from "../../assets/delete_btn.png";
import axios from "axios";

interface GoodsItem {
  goodsId: number;
  goodsName: string;
  goodsPrice: number;
  goodsDetail: string;
  samples: Array<string>;
}

export default function GoodsInfo(props: GoodsItem) {
  const images = props.samples[0];
  function deleteGoods(id: number) {
    axios
      .delete(`https://flowery.duckdns.org/api/stores/goods/${id}`)
      .then(() => {
        alert("삭제되었습니다.");
        window.location.reload();
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
      </div>
    </div>
  );
}
