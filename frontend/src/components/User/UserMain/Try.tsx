import React from "react";
import banner from "../../../assets/UserMain/banner_bouquet.png";
import flowerbe from "../../../assets/UserMain/flowerbe.jpg";
import circle from "../../../assets/UserMain/ai_circle.png";
import flower_icon from "../../../assets/UserMain/flower_icon.png";
import ai_icon from "../../../assets/UserMain/ai_icon.png";
import poem_icon from "../../../assets/UserMain/poem_icon.png";
import TryComponent from "./TryComponent";

export default function Try() {
  return (
    <div className="flex flex-col justify-center h-[fit-content]">
      <div className="h-[60vh] bg-user_beige pt-[30%]">
        <div className="absolute left-[10%] top-[55%] w-[60%] h-[15%] z-20 p-2 bg-user_green text-white ">
          <p className="font-ballet text-[2rem]">Flowery</p>
          <p className="font-nasq font-bold text-[0.8rem] pt-2">
            꽃다발 자동 인식 기능
          </p>
        </div>
        <div className="flex bg-user_beige">
          <div className="absolute left-3 top-[77%] flex flex-col gap-7 z-10">
            <div id="ai_tequnique" className="flex flex-col">
              <div className=" flex">
                <img
                  src={ai_icon}
                  alt="ai"
                  className=" w-[1.5rem] h-[1.5rem] mt-1 "
                />
                <div className="flex flex-col justify-end">
                  <div className="font-bold font-nasq text-[0.9rem] pt-1 pl-2">
                    사용 기술
                  </div>
                  <p className="text-[0.6rem] font-nasq text-[gray] pl-2 font-bold">
                    AI 객체 인식
                  </p>
                </div>
              </div>
            </div>
            <div id="ai_tequnique" className="flex flex-col">
              <div className=" flex">
                <img
                  src={flower_icon}
                  alt="ai"
                  className="w-[1.5rem] h-[1.5rem] mt-1"
                />

                <div className="flex flex-col justify-end">
                  <div className="font-bold font-nasq text-[0.9rem] pt-1 pl-2">
                    꽃다발 인식
                  </div>
                  <p className="text-[0.6rem] font-nasq text-[gray] pl-2 font-bold">
                    꽃 갯수, 종류 인식
                  </p>
                </div>
              </div>
            </div>
            <div id="ai_tequnique" className="flex flex-col">
              <div className=" flex">
                <img
                  src={poem_icon}
                  alt="ai"
                  className="w-[1.5rem] h-[1.3rem] mt-1"
                />

                <div className="flex flex-col justify-end">
                  <div className="font-bold font-nasq text-[0.9rem] pt-1 pl-2">
                    꽃 인식
                  </div>
                  <p className="text-[0.6rem] font-nasq text-[gray] pl-2 font-bold">
                    꽃 객체 당 꽃말 출력
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute w-[70vw] h-[80vw] z-0 right-0 bg-[#F1E4B9] mt-[10%]">
            <img
              src={banner}
              alt="banner"
              className="absolute w-[80%] left-[15%] top-[35%]"
            />
            <img
              src={circle}
              alt="circle"
              className="absolute w-[20%] right-[20%] top-[95%]"
            />
          </div>
        </div>
      </div>
      <div className="pt-[40%]">
        <p className="text-[3rem] font-nasq font-bold text-user_green pl-2">
          Example
        </p>
        <p className="text-[1rem] font-namyeong text-[gray] pt-2 pl-1 pr-1">
          Flowery에서는 ai 다중 객체 인식 기술을 통해서 고객님께서 선물 하신
          꽃다발을 분석, 여러가지 정보를 제공하고 있습니다.
        </p>
        <p className="text-[1rem] font-namyeong text-[gray] pt-2">
          밑 예시를 따라 직접 사진을 넣어보신 후, 이 놀라운 서비스를 경험하세요
        </p>
        <TryComponent />
      </div>
      <div className="pt-[30%]">
        <p className="text-[3rem] font-nasq font-bold text-user_green pl-2">
          DIY
        </p>
        <p className="text-[1rem] font-namyeong text-[gray] pt-2 pl-1 pr-1">
          직접 꽃다발 사진을 넣어보신 후, 꽃의 종류와 꽃말을 확인해 보세요!
        </p>
      </div>
    </div>
  );
}
