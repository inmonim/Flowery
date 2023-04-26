import React from "react";
import styles from "./NonMemberModal.module.scss";

function NonMemberModal() {
  return (
    <div className={styles.nonMemberModal}>
      <div className={styles.nonMemberModalContent}>
        <p>전화번호를 인증해주세요!</p>
        <input type="text" placeholder="전화번호"/>
        </div>
    </div>
  );
}

export default NonMemberModal;
