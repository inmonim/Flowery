import React, { useState, useRef, useEffect } from "react";
import Letters from "../ProtoPage/Letters";
import { useRecoilValue } from "recoil";
import { imageState, totalTextState, videoState } from "../../../recoil/atom";
import { useNavigate } from "react-router-dom";
import ReleaseMemories from "./ReleaseMemories";
import ReleaseSubmitModal from "./ReleaseSubmitModal";
import ReleaseMore from "./ReleaseMore";
import ReleaseProtoIntro from "./ReleaseProtoIntro";
import ReleaseLetters from "./ReleaseLetters";
import ReleaseCard from "./ReleaseCard";

const ReleasePreviewModal = React.forwardRef<HTMLDivElement, any>(
  (props, ref) => {
    const [reservationConfirm, setReservationConfirm] =
      useState<boolean>(false);
    const letter = useRecoilValue<string>(totalTextState);
    const image = useRecoilValue<Array<File>>(imageState);
    const video = useRecoilValue<File | null>(videoState);
    const [clickQR, setClickQR] = useState<boolean>(false);

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
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setReservationConfirm(false);
      }
    };

    // esc를 누르면 Modal 닫힘
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        setReservationConfirm(false);
      }
    };

    const testQr =
      "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAFeUlEQVR4Xu3Q0apcOQxE0fn/n87MPFxolqjIljs4Dw7sQO2S1Tr3n1+/fv3z+Hso4nGXIh53KeJxlyIedynicZciHncp4nGXIh53KeJxlyIedynicZciHncp4nGXIh53KeJxlyIedyliwn///v9vm9X3zvn7kt5P+1XcM6GICR62yup75/x9Se+n/SrumVDEhN2D0rzeD064R9K8ufOJ3fnfUcSE3YPSvP4nd7hH0ry584nd+d9RxAQP+vz4T+x3s77rk+/6lMXe/ROKmOBBHp763azv+uS7PmWxd/+EIiZ4kIen3pzw99I7+zQnad4s9u6ZUMQED/Lw1JsT/l56Z5/mJM2bxd49E4qY4EEenvq0x14/7Xd/zyz27p9QxAQP8vDUpz32+mm/+3tmsXf/hCIm7B7kvDl5c/I/ucP5lDt2539HERN2D3LenLw5+Z/c4XzKHbvzv6OICX7oKr7/2/IuP+9PKGKCh63i+78t7/Lz/oQibuAH7WZ916/6GxRxA/8gu1nf9av+BkWc4IelvIrvzPquN4vvnO+8+yYUcYKHpbyK78z6rjeL75zvvPsmFPEnSB8iXS+7e6XrnZPVuR2K+BOsHt71srtXut45WZ3boYgTPFCc832H73Zz8inLan9CESd4oDjn+w7f7ebkU5bV/oQiTvDA7tDVuW5+NXc4b9b/CYo4wcO7D1id6+ZXc4fzZv2foIgJ3aF+UMJ3vjfr7fXiHknzKX+DIiZ0h/mhCd/53qy314t7JM2n/A2K+Abdh3VzKYt92r/qU5+yuGdCEd9g9dA0l7LYp/2rPvUpi3smFHFCOlAvaY9enDMn//nbK6R9qT+hiBPSoXpJe/TinDn5z99eIe1L/QlFnOChkubNenuz7Pbpd1LvnP6EIk7wQyTNm/X2Ztnt0++k3jn9CUWc4Id4cPL2+in+XofvUu78CUWc4Ad6cPL2+in+XofvUu78CUV8k/TB9uZE977DebPYd/kbFPFNfg5Oh+udl+59h/Nmse/yNyjihJ8DPTTlDvcnfOf7LstqL85NKOKEdGDKHe5P+M73XZbVXpybUMQ38dAudz71KSfSPnuzpHcnFPFNPLTLnU99yom0z94s6d0JRUzYPaybc5+kubTH3OG8e2V1boUiJqQPSnRz7pM0l/aYO5x3r6zOrVDECR7W5V1+3runy7verE84P6GIEzysy7ukP0CXd71Zn3B+QhETPCwdmPrkJc3pE8673z6R5vUTipjgwenA1CcvaU6fcN799ok0r59QxAke3h2a+tX3znfevfaJNG/+BkWc4OHdwalffe98591rn0jz5m9QxITVw1Y/zCxpj71Zn/oO37nvhCImrB62+mFmSXvszfrUd/jOfScUcQM/WLr55Lte7+/Yp7nkJxRxAz9Yuvnku17v79inueQnFDHBg1fxvXvFOffZO6dPfcoJ951QxAQPXMX37hXn3GfvnD71KSfcd0IRE3YPc96sT/0uaZ9ZTvsdipiwe5DzZn3qd0n7zHLa71DEBA/6/OhP7NMe6eb05uTNq3ze8m2KmOChfkDq0x7p5vTm5M2rfN7ybYqY4KF+QOrN+kSac0+aS/P6lDt/QhETPOzzIz+xN+sTac49aS7N61Pu/AlFTPCwz4/8xN49Hb5b3W/WS5rTr/Y7FDHBg/zA1Lunw3er+816SXP61X6HIibsHuT85x/jE/uUpduTcI+szp1QxITdQ533D5P6lKXbk3CPrM6dUMQEP2wV96yS3ne+67ucvPtOKGKCB6/inlXS+853fZeTd98JRTzuUsTjLkU87lLE4y5FPO5SxOMuRTzuUsTjLkU87lLE4y5FPO5SxOMuRTzuUsTjLkU87lLE4y5FPO7yLzlfyaZBh5WvAAAAAElFTkSuQmCC";

    return (
      <div className="absolute inset-x-0 h-[600%] overflow-y-hidden-scroll bg-opacity-50 bg-black z-[20]">
        <div className="m-auto sm:w-full md:w-1/2 lg:w-[34%] p-10">
          {reservationConfirm && <ReleaseSubmitModal ref={ref} />}
          <div ref={ref} className="bg-white ">
            {!clickQR ? (
              <div className="w-full relative">
                  <ReleaseCard />

                <div className="absolute w-full text-sm text-center text-[#FEF7F1] top-[30%] ">
                  카드 qr을 찍었을 때의 미리보기입니다!
                </div>
                {/* <div className="absolute w-full text-sm text-center text-[#FEF7F1] top-[30%] animate-fadeIn animation-delay-4000">
                  카드 qr을 찍었을 때의 미리보기입니다!
                </div> */}
                <div className="w-full mx-auto flex items-center justify-center">
                <img
                  src={`data:image/png;base64,${testQr}`}
                  alt="qr"
                  onClick={() => setClickQR(true)}
                  className="absolute mx-auto  w-[24%] top-[22.9%] cursor-pointer "
                />
                </div>
                  </div>
            ) : (
              <div>
                <ReleaseProtoIntro />
                {(image.length > 0 || video) && <ReleaseMemories />}
                {letter && <ReleaseLetters />}
                <ReleaseMore />
                <div className="flex justify-center pb-6">
                  <span
                    onClick={() => {
                      window.scrollTo({ top: 0 });
                      setReservationConfirm(true);
                    }}
                    className="cursor-pointer border rounded-full p-2 px-4 font-bold text-white bg-[#eed3b5]"
                  >
                    제출하기
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default ReleasePreviewModal;
