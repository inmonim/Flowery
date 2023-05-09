import React, { useState } from "react";
import ProtoIntro from "../../ReleasePage/ProtoPage/ProtoIntro";
import Memories from "../../ReleasePage/ProtoPage/Memories";
import Letters from "../../ReleasePage/ProtoPage/Letters";
import More from "../../ReleasePage/ProtoPage/More";
import { useRecoilValue } from "recoil";
import { imageState, totalTextState, videoState } from "../../../recoil/atom";
import { useNavigate } from "react-router-dom";

const PreviewModal = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  const [reservationConfirm, setReservationConfirm] = useState<boolean>(false);
  const letter = useRecoilValue<string>(totalTextState);
  const image = useRecoilValue<Array<File>>(imageState);
  const video = useRecoilValue<File | null>(videoState);

  const navigate = useNavigate();
  const reserve = () => {
    alert("예약이 완료되었습니다!");
    navigate("/");
  };

  return (
    <div className="absolute inset-x-0 bg-opacity-50 bg-black z-[20]">
      <div className="m-auto sm:w-full md:w-1/2 lg:w-[34%] p-10">
        {reservationConfirm ? (
          <div className="h-screen">
            <div ref={ref} className="justify-center pb-6 bg-white">
              <div className="flex flex-col space-y-4 items-center justify-center">
                <h1 className="flex w-full pl-4 pt-4">예약 정보</h1>
                <div className="flex w-full px-4 justify-between">
                  <div>예약자명</div>
                  <div className="border-b-2 border-red-300">최창근근</div>
                </div>
                <div className="flex w-full px-4 justify-between">
                  <div>전화번호</div>
                  <div className="border-b-2 border-red-300">010-1111-1111</div>
                </div>
                <div className="flex w-full px-4 justify-between">
                  <div>방문지점</div>
                  <div className="border-b-2 border-red-300">인모네 꽃집</div>
                </div>
                <div className="flex w-full px-4 justify-between">
                  <div>방문예약일</div>
                  <div className="border-b-2 border-red-300">2021.04.23</div>
                </div>
                <div className="flex w-full px-4 justify-between">
                  <div>방문예약시간</div>
                  <div className="border-b-2 border-red-300">15:30</div>
                </div>
                <div className="flex w-full px-4 justify-between">
                  <div>선택상품</div>
                  <div className="border-b-2 border-red-300">직접주문</div>
                </div>
                <div className="flex w-full px-4 justify-between">
                  <div>상품가격</div>
                  <div className="border-b-2 border-red-300">직접주문</div>
                </div>
                <div className="flex w-full px-4 justify-between">
                  <div>주문사항</div>
                  <div className="border-b-2 border-red-300">
                    덜맵게 해주세요
                  </div>
                </div>
                <h1 className="flex w-full pl-4">오시는 길</h1>
                <div className="flex w-full pl-4">지도</div>
              </div>
              <div className="flex justify-center">
                <span
                  onClick={reserve}
                  className="cursor-pointer border rounded-full p-2 px-4 font-bold text-white bg-[#B89060]"
                >
                  예약 확정
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div ref={ref} className="bg-white ">
            <ProtoIntro />
            {(image.length > 0 || video) && <Memories />}
            {letter && <Letters />}
            <More />
            <div className="flex justify-center pb-6">
              <span
                onClick={() => {
                  window.scrollTo({ top: 0 });
                  setReservationConfirm(true);
                }}
                className="cursor-pointer border rounded-full p-2 px-4 font-bold text-white bg-[#B89060]"
              >
                예약하기
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default PreviewModal;
