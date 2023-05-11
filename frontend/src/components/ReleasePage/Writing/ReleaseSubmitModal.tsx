import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  cardContent,
  cardName,
  imageState,
  totalTextState,
  videoState,
} from "../../../recoil/atom";
import axios from "axios";
import { letterFontState } from "../../../recoil/atom";
import { letterPaperState } from "../../../recoil/atom";

const ReleaseSubmitModal = React.forwardRef<HTMLDivElement, any>(
  (props, ref) => {
    const letter = useRecoilValue<string>(totalTextState);
    const letterFont = useRecoilValue<number>(letterFontState);
    const letterPaper = useRecoilValue<number>(letterPaperState);
    const image = useRecoilValue<Array<File>>(imageState);
    const video = useRecoilValue<File | null>(videoState);

    const name = useRecoilValue<string>(cardName);
    const content = useRecoilValue<string>(cardContent);

    const navigate = useNavigate();

    // axios
    const submitInfo = () => {
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
          alert("제출이 완료됐습니다!");
        });
    };

    return (
      <div
        className="relative z-[50]"
        // aria-labelledby="modal-title"
        // role="dialog"
        // aria-modal="true"
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

        <div ref={ref} className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Deactivate account
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to deactivate your account? All of
                        your data will be permanently removed. This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                onClick={submitInfo}
                className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
              >
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  제출하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ReleaseSubmitModal;
