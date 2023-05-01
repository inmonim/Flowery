import React, { useEffect, useState } from "react";
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import imageSrc from "../../../assets/flowery_marker.png";
import "../../../assets/styles/variable.scss";
import ShopList from "./ShopList";

//  이거 왜 해야하더라? -> kakao 객체는 브라우저 전역 객체인 window 안에 포

// 꽃들 35.1569, 129.0591
// 써니플레르 양산 35.313, 129.0103
interface Position {
  content: string;
  title: string;
  latlng: {
    lat: number;
    lng: number;
  };
}
export default function Reservation() {
  const positions: Position[] = [
    {
      content: "꽃들 info",
      title: "꽃들",
      latlng: { lat: 35.1569, lng: 129.0591 },
    },
    {
      content: "써니플레르 info",
      title: "써니플레르",
      latlng: { lat: 35.313, lng: 129.0103 },
    },
  ];
  const EventMarkerContainer = ({
    position,
    content,
  }: {
    position: { lat: number; lng: number };
    content: string;
  }) => {
    const map = useMap();
    const [isVisible, setIsVisible] = useState(false);

    return (
      <MapMarker
        position={position} // 마커를 표시할 위치
        image={{ src: imageSrc, size: { width: 35, height: 45 } }}
        // @ts-ignore
        onClick={(marker) => {
          map.panTo(marker.getPosition());
          // setIsVisible(false);
          // marker.setImage({ src: imageSrc, size: { width: 45, height: 45 } });
        }}
        onMouseOver={() => setIsVisible(true)}
        onMouseOut={() => setIsVisible(false)}
      >
        {isVisible && content}
      </MapMarker>
    );
  };

  return (
    <div className="flex flex-col w-screen h-auto">
      <div className="z-1">
        <Map // 지도를 표시할 Container
          center={{
            // 지도의 중심좌표
            lat: 35.2,
            lng: 129.055,
          }}
          style={{
            // 지도의 크기
            zIndex: 0,
            width: "100vw",
            height: "50vh",
          }}
          level={11} // 지도의 확대 레벨
        >
          {positions.map((value) => (
            <EventMarkerContainer
              key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
              position={value.latlng}
              content={value.content}
            />
          ))}
        </Map>
      </div>
      <div className="flex-auto absolute z-10 rounded-xl inset-x-0 bottom-0 h-80 overflow-scroll ">
        <ShopList />
      </div>
    </div>
  );
}
