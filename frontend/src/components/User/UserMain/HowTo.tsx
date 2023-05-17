import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
// import layout from "../../../assets/UserMain/flower_layout.png";
import howto from "../../../assets/UserMain/howto.jpg";
import store from "../../../assets/UserMain/shop_select.png";
import reservation from "../../../assets/UserMain/t_d_select.png";
import product from "../../../assets/UserMain/product_select.png";

export default function HowTo() {
  AOS.init();
  return (
    <div className="w-[100%] flex justify-center overflow-hidden">
      <div className="flex flex-col w-[90%]">
        <div
          data-aos="zoom-in"
          data-aos-delay="200"
          className="h-[80vh] mt-[10%] bg-white m-4 flex justify-center"
        >
          {/* feedback 노란색이미지가 배경과 어울리지 않는다는 의견 고칠것 */}
          <img src={howto} alt="howto" className="w-full h-full" />
          <p className="absolute bottom-[25%] text-[2.4rem] text-white font-nasq font-bold">
            How To Use
          </p>
          <p className="absolute bottom-[10%] text-[3.6rem] text-user_pink font-ballet ">
            Flowery
          </p>
        </div>
        <div
          id="how to section"
          className="flex flex-col w-[100%] gap-10 pt-[10%] h-[fit-content]"
        >
          <div className="h-[60vh] flex justify-between items-center overflow-hidden">
            <img
              data-aos="fade-right"
              src={store}
              alt="sf"
              className="w-[50%] ml-[5%]"
            />
            <div
              data-aos="fade-left"
              className="flex flex-col absolute right-0 mr-[10%] items-center overflow-hidden"
            >
              <p className="font-nasq font-bold">예약할 가게를</p>
              <p className="font-nasq font-bold">
                <span className="text-[3rem] text-user_pink">선택</span>
                합니다
              </p>
            </div>
          </div>
          <div className="h-[60vh] flex justify-end items-center overflow-x-hidden">
            <div
              data-aos="fade-right"
              className="flex flex-col absolute left-0 ml-[10%] items-center overflow-hidden"
            >
              <p className="font-nasq font-bold">시간과 날짜를</p>
              <p className="font-nasq font-bold">
                <span className="text-[3rem] text-user_pink">선택</span>
                합니다
              </p>
            </div>
            <img
              data-aos="fade-left"
              src={reservation}
              alt="sf"
              className="w-[50%] mr-[5%]"
            />
          </div>
          <div className="h-[60vh] flex justify-between items-center overflow-hidden">
            <img
              data-aos="fade-right"
              src={product}
              alt="sf"
              className="w-[50%] ml-[5%]"
            />
            <div
              data-aos="fade-left"
              className="flex flex-col absolute right-0 mr-[10%] items-center overflow-hidden"
            >
              <p className="font-nasq font-bold">예약할 상품을</p>
              <p className="font-nasq font-bold">
                <span className="text-[3rem] text-user_pink">선택</span>
                합니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
