import React from "react";
import gallery_img from "../../assets/ReleasePage/gallery_img.png";
import movie_img from "../../assets/ReleasePage/movie_img.png";
import letter_img from "../../assets/ReleasePage/letter_img.png";
import { Link } from "react-router-dom";
import ReleasePictures from "./ReleasePictures";

export default function ReleaseCategory() {
  return (
    <div className="bg-[#FFFAF5]">
      <p className="flex justify-center text-3xl">Flowery</p>
      <div>
        <Link
          to="/releasepictures"
          className=" h-[200px] flex items-center bg-[#AEBAA3] drop-shadow border-b m-2 rounded-2xl"
        >
          <p className="text-white font-bold text-[30px] pl-[40px]">PICTURES</p>
          <img src={gallery_img} alt="gallery" className="overflow-hidden" />
        </Link>
        <Link
          to="/releaseletter"
          className="h-[200px] flex items-center  bg-[#CECDC4] drop-shadow border-b m-2 rounded-2xl"
        >
          <p className="text-white font-bold text-[30px] pl-[40px]">LETTERS</p>
          <img src={letter_img} alt="letter" className="pl-3 overflow-hidden" />
        </Link>
        <div
          className="h-[200px] flex items-center bg-[#DEBFA1] drop-shadow border-b m-2 rounded-2xl"
          onClick={() => alert("해당 기능은 준비 중입니다. 기대해보시랑꼐")}
        >
          <p className="text-white font-bold text-[30px] pl-[40px]">VIDEOS</p>
          <img
            src={movie_img}
            alt="movie"
            className="pl-5 pr-7 overflow-hidden"
          />
        </div>
      </div>
    </div>
  );
}
