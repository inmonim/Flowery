import React, { useEffect, useState } from "react";
import styles from "./PreviewModal.module.scss";
import { useSetRecoilState } from "recoil";

import { phoneNumberState } from "../../recoil/atom";
import { useNavigate } from "react-router-dom";

const PreviewModal = React.forwardRef<HTMLDivElement, any>((props, ref) => {
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

  return (
    <div>
      <div
        id="hs-scroll-inside-viewport-modal"
        className="hs-overlay w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto bg-gray-600"
      >
        <div
          ref={ref}
          className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-100 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto"
        >
          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-white">
                Modal title
              </h3>
              <button
                type="button"
                className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                data-hs-overlay="#hs-scroll-inside-viewport-modal"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-3.5 h-3.5"
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Be bold
                  </h3>
                  <p className="mt-1 text-gray-800 dark:text-gray-400">
                    Motivate teams to do their best work. Offer best practices
                    to get users going in the right direction. Be bold and offer
                    just enough help to get the work started, and then get out
                    of the way. Give accurate information so users can make
                    educated decisions. Know your user's struggles and desired
                    outcomes and give just enough information to let them get
                    where they need to go.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Be optimistic
                  </h3>
                  <p className="mt-1 text-gray-800 dark:text-gray-400">
                    Focusing on the details gives people confidence in our
                    products. Weave a consistent story across our fabric and be
                    diligent about vocabulary across all messaging by being
                    brand conscious across products to create a seamless flow
                    across all the things. Let people know that they can jump in
                    and start working expecting to find a dependable experience
                    across all the things. Keep teams in the loop about what is
                    happening by informing them of relevant features, products
                    and opportunities for success. Be on the journey with them
                    and highlight the key points that will help them the most -
                    right now. Be in the moment by focusing attention on the
                    important bits first.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Be practical, with a wink
                  </h3>
                  <p className="mt-1 text-gray-800 dark:text-gray-400">
                    Keep our own story short and give teams just enough to get
                    moving. Get to the point and be direct. Be concise - we tell
                    the story of how we can help, but we do it directly and with
                    purpose. Be on the lookout for opportunities and be quick to
                    offer a helping hand. At the same time realize that novbody
                    likes a nosy neighbor. Give the user just enough to know
                    that something awesome is around the corner and then get out
                    of the way. Write clear, accurate, and concise text that
                    makes interfaces more usable and consistent - and builds
                    trust. We strive to write text that is understandable by
                    anyone, anywhere, regardless of their culture or language so
                    that everyone feels they are part of the team.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
              <button
                type="button"
                className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                data-hs-overlay="#hs-scroll-inside-viewport-modal"
              >
                Close
              </button>
              <a
                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                href="#"
              >
                Save changes
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className={styles.nonMemberModal}>
    //   <div ref={ref} className={styles.nonMemberModalContent}>
    //     <p>전화번호를 인증해주세요!</p>
    //     <div className={styles.certification}>
    //       <input
    //         type="tel"
    //         placeholder="전화번호"
    //         onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    //           setInputPhone(event.target.value);
    //         }}
    //         onKeyDown={pressCheck}
    //       />
    //       <button disabled={!verify} onClick={checkVerify}>
    //         인증
    //       </button>
    //     </div>
    //     <div>
    //       {clickVerify && (
    //         <input
    //           placeholder="인증번호"
    //           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    //             setVerifyCode(event.target.value);
    //           }}
    //           onKeyDown={pressEnter}
    //         />
    //       )}
    //     </div>
    //     <input type="button" value="확인" onClick={checkCode} />
    //   </div>
    // </div>
  );
});

export default PreviewModal;
