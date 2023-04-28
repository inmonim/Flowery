import React, { useEffect, useState } from "react";
import picture1 from "../../../assets/flowershop1.jpg";
import picture2 from "../../../assets/example1.jpg";
import profile1 from "../../../assets/profile1.png";
import profile3 from "../../../assets/profile3.png";

export default function ShopList() {
  const shops = [
    {
      content: "꽃들 info",
      title: "꽃들",
      latlng: { lat: 35.1569, lng: 129.0591 },
      images: [picture1, picture2, picture1, picture2, picture1, picture2],
      profile: profile3,
    },
    {
      content: "써니플레르 info",
      title: "써니플레르",
      latlng: { lat: 35.313, lng: 129.0103 },
      images: [picture1, picture2, picture1, picture2, picture1, picture2],
      profile: profile1,
    },
  ];

  return (
    <div className="flex flex-col">
      <p className="text-xl font-medium p-3 ">가게선택</p>
      {shops.map((shop) => (
        <div key={shop.content}>
          <div className="w-20 h-20 overflow-hidden rounded-full border-solid border-2">
            <img src={shop.profile} alt={shop.title} />
          </div>
          <div>flower</div>
        </div>
      ))}
    </div>
  );
}
