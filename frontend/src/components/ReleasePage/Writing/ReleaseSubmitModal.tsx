import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  cardContent,
  cardName,
  cardState,
  imageState,
  totalTextState,
  videoState,
} from "../../../recoil/atom";
import axios from "axios";
import { letterFontState } from "../../../recoil/atom";
import { letterPaperState } from "../../../recoil/atom";
import Loading from "./LoadingIcon";

const ReleaseSubmitModal = React.forwardRef<HTMLDivElement, any>(
  (props, ref) => {
    const letter = useRecoilValue<string>(totalTextState);
    const letterFont = useRecoilValue<number>(letterFontState);
    const letterPaper = useRecoilValue<number>(letterPaperState);
    const image = useRecoilValue<Array<File>>(imageState);
    const video = useRecoilValue<File | null>(videoState);

    const name = useRecoilValue<string>(cardName);
    const content = useRecoilValue<string>(cardContent);
    const card = useRecoilValue<number>(cardState);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // axios
    const submitCardInfo = (messageId: string) => {
      const offset = new Date().getTimezoneOffset() * 60000;
      const date = new Date(Date.now() - offset).toISOString().slice(0, -5);
      const jsonData = {
        userId: 2,
        storeId: 3,
        messageId: messageId,
        goodsName: "기타",
        price: 0,
        demand: "없음",
        date: date,
        reservationName: name,
        phrase: content,
        card: card,
      };

      axios
        .post("https://flowery.duckdns.org/api/reservation/make", jsonData)
        .then((response) => {
          alert("제출이 완료됐습니다!");
          localStorage.clear();
          navigate("/releaseexit");
        })
        .catch((error) => {
          alert("다시 시도해주세요!");
          setLoading(false);
        });
    };

    const submitReservationInfo = () => {
      const formData = new FormData();

      const offset = new Date().getTimezoneOffset() * 60000;
      const date = new Date(Date.now() - offset).toISOString().slice(0, -5);

      formData.append("message", letter);

      if (video) {
        formData.append("video", video);
      } else {
        formData.append("video", new Blob(undefined));
      }
      if (image.length > 0) {
        for (let i = 0; i < image.length; i++) {
          formData.append(`pictures`, image[i]);
          console.log(image);
        }
      } else {
        formData.append(`pictures`, new Blob(undefined));
      }
      formData.append("font", String(letterFont));
      formData.append("paper", String(letterPaper));
      formData.append("date", date);
      axios
        .post("https://flowery.duckdns.org/api/messages/card", formData)
        .then((response) => {
          submitCardInfo(response.data.messageId);
        })
        .catch((e) => setLoading(false));
    };

    return (
      <div className="relative z-[50]">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-16 text-center w-full sm:items-center sm:p-0">
            <div
              ref={ref}
              className="relative w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  sm:max-w-lg"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="justify-center sm:flex sm:items-start">
                  <div className="text-center justify-center items-center sm:mt-0">
                    <h3
                      className="text-base mb-4 font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      확인
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">제출하시겠습니까?</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 justify-center items-center mx-auto flex sm:px-6">
                <div
                  onClick={() => {
                    if (!loading) {
                      setLoading(true);
                      submitReservationInfo();
                    }
                  }}
                  className={`inline-flex justify-center rounded-md px-3 py-2 mb-4 text-sm font-semibold shadow-sm z-[67] sm:ml-3 sm:w-auto ${
                    loading ? "bg-gray-300" : "bg-[#eed3b5]"
                  }`}
                >
                  제출하기
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ReleaseSubmitModal;
