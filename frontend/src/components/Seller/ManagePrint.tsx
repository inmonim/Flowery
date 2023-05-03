import React from "react";
import styles from "./ManagePrint.module.scss";
// import Title from "./PrintTitle";
// import ItemInfo from "./ItemInfo";

export default function ManagePrint() {
  return (
    <div className={styles.mainbox}>
      <div className={styles.secondbox}>
        <div className={styles.title}>{/* <Title /> */}</div>
        <div>{/* <ItemInfo /> */}</div>
      </div>
    </div>
  );
}
