import React from "react";
import surveyicon from "../../../assets/ReleasePage/survey_icon.png";
import { Link } from "react-router-dom";

export default function Survey() {
  return (
    <div className="h-[50vh] flex flex-col gap-3 justify-center items-center">
      <p className="w-11/12 font-namyeong text-center text-[0.9rem] whitespace-pre-wrap">
        좀 더 나은 서비스를 위해 설문조사에 참여해 주세요
      </p>
      <Link
        to="https://docs.google.com/forms/d/12A10S-J8Xq3Nyt7fJMSRkFrnHIkubND_9_aRqYtjVvE/edit"
        className="flex justify-center"
      >
        <img src={surveyicon} className="w-1/4 " />
      </Link>
    </div>
  );
}
