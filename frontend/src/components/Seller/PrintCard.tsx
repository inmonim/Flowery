import React from "react";
import styles from "./PrintCard.module.scss";

interface PrintCardProps {
  closeModal: () => void; // 부모 컴포넌트에서 전달되는 closeModal 함수를 받아옵니다.
}

export default function PrintCard(props: PrintCardProps) {
  function handleClick() {
    props.closeModal(); // 모달을 닫기 위해 부모 컴포넌트에서 전달된 closeModal 함수를 실행합니다.
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h1>Print Card</h1>
        <p>This is a print card modal</p>
        <button onClick={handleClick}>Close Modal</button>
      </div>
    </div>
  );
}
