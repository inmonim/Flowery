import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bouquet from "../../../assets/ReleasePage/releaseBG.jpg";
import bouquet2 from "../../../assets/ReleasePage/releaseBG2.jpg";
import bouquet3 from "../../../assets/ReleasePage/releaseBG3.jpg";
import bouquet4 from "../../../assets/ReleasePage/releaseBG4.jpg";
import bouquet5 from "../../../assets/ReleasePage/releaseBG5.jpg";

export default function ProtoIntro() {
  const nickname = "최창근";
  const introBackground = [bouquet, bouquet2, bouquet3, bouquet4, bouquet5];
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    // slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1200,
  };

  return (
    <div className="flex flex-col items-center h-[100vh]">
      <div className="absoulte w-[100%]">
        <Slider {...settings}>
          {introBackground.map((bg, index) => (
            <div key={index}>
              <img src={bg} alt="index" className="h-screen" />
            </div>
          ))}
        </Slider>
      </div>
      <div>
        <p className="absolute top-[33%] left-[28%] text-[4rem] text-white font-ballet">
          Flowery
        </p>
      </div>
      <div className="absolute bottom-[10%] text-white font-nasq">
        <section className="flex justify-center items-center">
          <span className=" text-[20px] text-[yellow]">{nickname}</span>
          님이
        </section>
        <section className="">
          <span>준비한 시들지 않는 선물</span>
        </section>
      </div>
    </div>
  );
}
