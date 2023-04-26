import { useEffect, useRef, useState } from "react";
import styles from "./SignInSelectPage.module.scss";
import NonMemberModal from "./NonMemberModal";
import { useNavigate } from "react-router-dom";
import SignUpModal from "./SignUpModal";

export default function SignInSelectPage() {
  //비회원 주문 Modal을 띄우기 위한 변수
  const [showModal, setShowModal] = useState<string>("");

  const navigate = useNavigate();

  // 로그인 시도
  const checkSignIn = () => {
    navigate("/");
  };

  // 회원가입 Modal
  const signUp = () => {
    setShowModal("signUp")
  }

  // 비회원 주문 Modal 띄우기
  const nonMember = () => {
    setShowModal("nonMember");
  };

  // 화면 클릭 또는 키보드 누름 감지
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Modal 이외의 곳을 클릭 하면 Modal 닫힘
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowModal("");
    }
  };

  // esc를 누르면 Modal 닫힘
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      setShowModal("");
    }
  };

  return (
    <div>
      <div className={styles.signIn}>
        <h1>로그인</h1>
        <div className={styles.idInput}>
          <input type="text" placeholder="아이디" className={styles.idInput} />
        </div>
        <div>
          <input
            type="text"
            placeholder="비밀번호"
            className={styles.passwordInput}
          />
        </div>
      </div>
      <input type="button" value="로그인" onClick={checkSignIn} />
      <input type="button" value="회원가입" onClick={signUp} />
      {showModal === "signUp" && (
        <SignUpModal ref={modalRef} onClose={() => setShowModal("")} />
      )}
      {showModal === "nonMember" && (
        <NonMemberModal ref={modalRef} onClose={() => setShowModal("")} />
      )}
      <div>
        <button className={styles.nonMember} onClick={nonMember}>
          비회원으로 계속
        </button>
      </div>
    </div>
  );
}
