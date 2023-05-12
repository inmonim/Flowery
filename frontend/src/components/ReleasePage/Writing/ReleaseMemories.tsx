import React, { Component } from "react";
import sellerpic from "../../assets/flower_sample.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRecoilValue } from "recoil";
import { imageState, videoState } from "../../../recoil/atom";

export default function ReleaseMemories() {
  const images = useRecoilValue<Array<File>>(imageState);
  const video = useRecoilValue<File | null>(videoState);
  const nickname = "창근";

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    // slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    speed: 1200,
  };

  return (
    <div>
      {/* <div className="mb-[25%] flex justify-center">
        <img src={sellerpic} alt="s" />
      </div> */}

      <div className="h-[10rem] flex flex-col mt-[25%] ml-5">
        <p className="text-[3rem] text-[#8D8E90] font-namyeong">Memories</p>
        <p className="text-[2rem] font-namyeong">추억</p>
        <p className="text-[0.8rem] text-[#82877C] font-namyeong">
          {nickname}님이 꽃과 함께 업로드 해주신 추억들입니다.
        </p>
      </div>

      {/* 사용자 input 사진 왼쪽 오른쪽 정렬 */}
      {images.length > 0 &&
        images.map((image, index) => (
          <div
            key={index}
            className={`mb-[10%] w-[90%] overflow-hidden ${
              index % 2 === 0 ? "mr-auto" : "ml-auto"
            }`}
          >
            <img src={URL.createObjectURL(image)} alt="couple" />
          </div>
        ))}
      {video && (
        <div>
          <video src={URL.createObjectURL(video)} controls className="w-full"/>
        </div>
      )}
    </div>
  );
}
