import React, { Component } from "react";
import couple1 from "../../../assets/ReleasePage/couple1.jpg";
import couple2 from "../../../assets/ReleasePage/couple2.jpg";
import couple3 from "../../../assets/ReleasePage/couple3.jpg";
import couple4 from "../../../assets/ReleasePage/couple4.jpg";
import couple5 from "../../../assets/ReleasePage/couple5.jpg";
import couple6 from "../../../assets/ReleasePage/couple6.jpg";
import Video1 from "../../../assets/ReleasePage/Video1.mp4";
import test1 from "../../../assets/profile1.png";
import test2 from "../../../assets/profile1.png";
import test3 from "../../../assets/profile1.png";
import test4 from "../../../assets/ReleasePage/test1.jpg";
import test5 from "../../../assets/ReleasePage/test2.jpg";
import test6 from "../../../assets/ReleasePage/test3.jpg";
import test7 from "../../../assets/ReleasePage/test4.jpg";
import test8 from "../../../assets/ReleasePage/test5.jpg";

import sellerpic from "../../../assets/flower_sample.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Memories() {
  const pictures = [
    couple1,
    couple2,
    couple3,
    couple4,
    couple5,
    couple6,
    test1,
    test2,
    test3,
    test4,
    test5,
    test6,
    test7,
    test8,
  ];
  const nickname = "창근";

  return (
    <div>
      {/* <div className="mb-[25%] flex justify-center">
        <img src={sellerpic} alt="s" />
      </div> */}

      <div className="h-[10rem] flex flex-col mt-[25%] ml-5">
        <p className="text-[2rem] text-[#8D8E90] font-namyeong">Memories</p>
        <p className="text-[1.2rem] font-namyeong">추억</p>
        <p className="text-[0.7rem] text-[#82877C] font-namyeong pt-2">
          {nickname}님이 꽃과 함께 업로드 해주신 추억들입니다.
        </p>
      </div>

      {/* 사용자 input 사진 왼쪽 오른쪽 정렬 */}
      {pictures.map((picture, index) => (
        <div
          key={index}
          className={`pb-[10%] w-[90%] overflow-hidden ${
            index % 2 === 0 ? "mr-auto" : "ml-auto"
          }`}
        >
          <img src={picture} alt="couple" />
        </div>
      ))}
      <div>
        <video src={Video1} className="w-[100%]" controls />
      </div>
    </div>
  );
}
