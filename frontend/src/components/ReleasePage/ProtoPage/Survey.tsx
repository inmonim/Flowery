import React from "react";
import surveyicon from "../../../assets/ReleasePage/survey_icon.png";

export default function Survey() {
  return (
    <div className="h-[50vh] flex flex-col gap-3 justify-center items-center">
      <p className="w-11/12 font-namyeong whitespace-pre-wrap">
        서비스가 마음에 드셨다면 설문조사 함 해주이소 큰 힘이 됩디다
      </p>
      <img src={surveyicon} className="w-1/4 animate-bounce" />
    </div>
  );
}
