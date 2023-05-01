import React from "react";
import picture1 from "../../../assets/flowershop1.jpg";
import picture2 from "../../../assets/example1.jpg";
import profile1 from "../../../assets/profile1.png";
import profile3 from "../../../assets/profile3.png";

export default function ShopInfo() {
  const positions = [
    {
      content: "오늘도 꽃을 열심히 팔아봅시다",
      title: "꽃들",
      address: "부산광역시 부산진구 부전동 번지 지하층 호 573-1",
      latlng: { lat: 35.1569, lng: 129.0591 },
      images: [picture1, picture2, picture1, picture2, picture1, picture2],
      profile: profile3,
    },
  ];
  return (
    <div className="flex flex-col ">
      <div className="p-1">
        <img src={picture1} alt="main" className="" />
      </div>
      {positions.map((position, index) => (
        <div key={index} className="mx-auto font-bold">
          <p>{position.title}</p>
        </div>
      ))}
      {positions.map((position, index) => (
        <div key={index} className="mx-auto pt-2 text-xs">
          <p>{position.address}</p>
        </div>
      ))}
      {positions.map((position, index) => (
        <div key={index} className="mx-auto text-center p-2">
          <p>{position.content}</p>
        </div>
      ))}
      {positions.map((position, index) => (
        <div className="flex flex-row space-10 gap-1 pl-2.5 pr-2.5  overflow-scroll">
          {Array.from({ length: 4 }, (_, index) => (
            <img
              className="w-1/4"
              src={position.images[index]}
              alt="shop.title"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
