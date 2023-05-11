import React, { useState, useRef, useEffect } from "react";
import ProtoIntro from "../ProtoPage/ProtoIntro";
import Letters from "../ProtoPage/Letters";
import More from "../ProtoPage/More";
import { useRecoilValue } from "recoil";
import { imageState, totalTextState, videoState } from "../../../recoil/atom";
import { useNavigate } from "react-router-dom";
import ReleaseMemories from "./ReleaseMemories";
import ReleaseSubmitModal from "./ReleaseSubmitModal";

const ReleasePreviewModal = React.forwardRef<HTMLDivElement, any>(
  (props, ref) => {
    const [reservationConfirm, setReservationConfirm] =
      useState<boolean>(false);
    const letter = useRecoilValue<string>(totalTextState);
    const image = useRecoilValue<Array<File>>(imageState);
    const video = useRecoilValue<File | null>(videoState);

    const navigate = useNavigate();

    const reserve = () => {
      alert("제출이 완료되었습니다!");
      window.close();
    };

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

    return (
      <div className="absolute inset-x-0 bg-opacity-50 bg-black z-[20]">
        <div className="m-auto sm:w-full md:w-1/2 lg:w-[34%] p-10">
          {reservationConfirm && <ReleaseSubmitModal ref={modalRef} />}
          <div ref={modalRef} className="bg-white ">
            <ProtoIntro />
            {(image.length > 0 || video) && <ReleaseMemories />}
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
                제출하기
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ReleasePreviewModal;
