import React, { useEffect, useState } from "react";
import picture1 from "../../../assets/flowershop1.jpg";
import picture2 from "../../../assets/example1.jpg";
import profile1 from "../../../assets/profile1.png";
import profile3 from "../../../assets/profile3.png";
import selectBtn from "../../../assets/select_button.png";

export default function ShopList() {
  const shops = [
    {
      content: "꽃들 info",
      title: "꽃들",
      address: "부산광역시 부산진구 부전동 번지 지하층 호 573-1",
      latlng: { lat: 35.1569, lng: 129.0591 },
      images: [picture1, picture2, picture1, picture2, picture1, picture2],
      profile: profile3,
    },
    {
      content: "써니플레르 info",
      title: "써니플레르",
      address: "경상남도 양산시 물금읍 야리3길 22 미건엘리시아 1층 써니플레르",
      latlng: { lat: 35.313, lng: 129.0103 },
      images: [picture1, picture2, picture1, picture2, picture1, picture2],
      profile: profile1,
    },
    {
      content: "써니플레르 info1",
      title: "써니플레르1",
      address: "경상남도 양산시 물금읍 야리3길 22 미건엘리시아 1층 써니플레르",
      latlng: { lat: 35.313, lng: 129.0103 },
      images: [picture1, picture2, picture1, picture2, picture1, picture2],
      profile: profile1,
    },
    {
      content: "써니플레르 info2",
      title: "써니플레르2",
      address: "경상남도 양산시 물금읍 야리3길 22 미건엘리시아 1층 써니플레르",
      latlng: { lat: 35.313, lng: 129.0103 },
      images: [picture1, picture2, picture1, picture2, picture1, picture2],
      profile: profile1,
    },
    {
      content: "써니플레르 info3",
      title: "써니플레르3",
      address: "경상남도 양산시 물금읍 야리3길 22 미건엘리시아 1층 써니플레르",
      latlng: { lat: 35.313, lng: 129.0103 },
      images: [picture1, picture2, picture1, picture2, picture1, picture2],
      profile: profile1,
    },
    {
      content: "써니플레르 info4",
      title: "써니플레르4",
      address: "경상남도 양산시 물금읍 야리3길 22 미건엘리시아 1층 써니플레르",
      latlng: { lat: 35.313, lng: 129.0103 },
      images: [picture1, picture2, picture1, picture2, picture1, picture2],
      profile: profile1,
    },
    {
      content: "써니플레르 info5",
      title: "써니플레르5",
      address: "경상남도 양산시 물금읍 야리3길 22 미건엘리시아 1층 써니플레르",
      latlng: { lat: 35.313, lng: 129.0103 },
      images: [picture1, picture2, picture1, picture2, picture1, picture2],
      profile: profile1,
    },
  ];

  return (
    <div className="flex flex-col">
      <p className="text-xl font-medium p-3 mb-2 bg-white border-solid border-2 border-b-b_bottom">
        가게선택
      </p>
      {shops.map((shop) => (
        <div key={shop.content} className="bg-white  border-solid border-2">
          <div className="flex space-x-4 ">
            <div className="flex-none w-20 h-20 overflow-hidden rounded-full border-solid border-2 mb-2">
              <img src={shop.profile} alt={shop.title} />
            </div>
            <div className="flex flex-col font-bold justify-center ">
              <div>{shop.title}</div>
              <div className="text-xs ">{shop.address}</div>
            </div>
            <div className="w-20 justify-center">
              <img src={selectBtn} />
            </div>
          </div>
          <div className="flex-none w-full h-20 border-solid border-2 mb-2">
            <div className="flex flex-row space-10">
              {Array.from({ length: 4 }, (_, index) => (
                <img
                  className="w-1/4"
                  src={shop.images[index]}
                  alt="shop.title"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
