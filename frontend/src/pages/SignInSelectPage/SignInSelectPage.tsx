import { useState } from "react";
import styles from "./SignInSelectPage.module.scss";
import MemberModal from "./MemberModal";
import NonMemberModal from "./NonMemberModal";

export default function SignInSelectPage() {
  // 로그인 or 비회원 주문 Modal 창을 띄우기 위한 변수
  const [showModal, setShowModal] = useState<number>(0);

  // 로그인 Modal 창 띄우기
  const member = () => {
    setShowModal(1);
  };
  // 비회원 주문 Modal 창 띄우기
  const nonMember = () => {
    setShowModal(2);
  };

  return (
    <div>
      {showModal === 1 ? <MemberModal /> : null}
      <div className={styles.signIn}>
        <span className={styles.member} onClick={member}>
          로그인
        </span>
      </div>
      {showModal === 2 ? <NonMemberModal /> : null}
      <div>
        <span className={styles.nonMember} onClick={nonMember}>
          비회원 주문
        </span>
      </div>
    </div>
  );
}
