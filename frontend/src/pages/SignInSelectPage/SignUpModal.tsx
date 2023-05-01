import React, { useEffect, useState } from "react";
import styles from "./SignUpModal.module.scss";
import { useSetRecoilState } from "recoil";

import { phoneNumberState } from "../../recoil/atom";
import { useNavigate } from "react-router-dom";

const SignUpModal = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  const [inputPhone, setInputPhone] = useState<string>("");
  const [verify, setVerify] = useState<boolean>(false);
  const [clickVerify, setClickVerify] = useState<boolean>(false);
  const [verifyCode, setVerifyCode] = useState<string>();

  const setPhoneNumber = useSetRecoilState(phoneNumberState);

  const navigate = useNavigate();

  // 휴대폰 번호 유효성 검사
  const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

  useEffect(() => {
    if (regPhone.test(inputPhone)) {
      setVerify(true);
    } else {
      setVerify(false);
    }
  }, [inputPhone]);

  // 휴대폰 번호 인증 버튼 클릭
  const checkVerify = () => {
    setClickVerify(true);
  };

  // 휴대폰 번호 인증 버튼 Enter
  const pressCheck = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      checkVerify();
    }
  };

  // 인증 번호 확인
  const checkCode = () => {
    console.log("인증번호 확인");

    // 인증 번호가 일치하면
    // if (verifyCode === 인증번호) {
    alert("인증되었습니다!"); // 모달창으로 예쁘게 만들기
    setPhoneNumber(inputPhone);
    navigate("/");
    // }
  };

  // 인증 번호 확인 Enter
  const pressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      checkCode();
    }
  };

  // 회원가입이 완료됐으면
  const signUpComplete = () => {
    // POST 요청
    // token 저장
    // atom에 로그인 정보(토큰, 전화번호) 저장
    alert("회원가입이 완료되었습니다!");
    navigate("/");
  };

  return (
    <div className={styles.nonMemberModal}>
      <div ref={ref} className={styles.nonMemberModalContent}>
        <p>회원가입</p>
        <div className={styles.certification}>
          <input
            type="tel"
            placeholder="전화번호"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInputPhone(event.target.value);
            }}
            onKeyDown={pressCheck}
          />
          <button disabled={!verify} onClick={checkVerify}>
            인증
          </button>
        </div>
        <div>
          <input
            placeholder="인증번호"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setVerifyCode(event.target.value);
            }}
            onKeyDown={pressEnter}
          />

          <input type="button" value="확인" onClick={checkCode} />
        </div>
        <div>
          <input type="text" placeholder="아이디" />
        </div>
        <div>
          <input type="text" placeholder="비밀번호" />
        </div>
        <div>
          <input type="text" placeholder="비밀번호 확인" />
        </div>
        <div>
          <button onClick={signUpComplete}>회원가입</button>
        </div>
      </div>
    </div>
  );
});

export default SignUpModal;
