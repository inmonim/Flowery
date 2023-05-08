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
  const [markers, setMarkers] = useState([] as boolean[]);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [draggedY, setDraggedY] = useState(0);
  const [maxDragY, setMaxDragY] = useState(1200); // 허용되는 최대 드래그

  const handleMouseDown = (event: any) => {
    setIsDragging(true);
    setDragStartY(event.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedY(0);
  };

  const handleMouseMove = (event: any) => {
    if (!isDragging) return;

    const dragDistance = event.clientY - dragStartY;
    const newDraggedY = draggedY + dragDistance;

    if (newDraggedY > maxDragY) {
      setDraggedY(maxDragY);
    } else {
      setDraggedY(newDraggedY);
    }

    setDragStartY(event.clientY);
  };
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

  const initMarkers = () => {
    const marker: boolean[] = [];
    positions.map((index) => {
      marker.push(false);
    });

    setMarkers(marker);
  };

  const handleMarkerClick = (index: number) => {
    const marker: boolean[] = [];
    positions.map((index) => {
      marker.push(false);
    });

    marker[index] = true;

    setMarkers(marker);
  };

  useEffect(() => {
    initMarkers();
  }, []);

  return (
    <div className="flex flex-col w-screen h-auto">
      <div>
        <Map // 지도를 표시할 Container
          center={{
            // 지도의 중심좌표
            lat: 35.2,
            lng: 129.055,
          }}
          isPanto={true}
          style={{
            // 지도의 크기
            zIndex: 0,
            width: "100vw",
            height: "50vh",
          }}
          level={11} // 지도의 확대 레벨
          onClick={initMarkers} // 클릭 초기화
        >
          {positions.map((value: any, index: number) => (
            <MapMarker
              position={value.latlng} // 마커를 표시할 위치
              image={{ src: imageSrc, size: { width: 35, height: 45 } }}
              onClick={() => handleMarkerClick(index)}
              key={index}
            >
              {markers[index] && <div>{value.title}</div>}
            </MapMarker>
          ))}
        </Map>
      </div>
      <div className="flex-auto absolute z-10 rounded-xl inset-x-0 bottom-0 h-80 overflow-scroll ">
        <div
          style={{ transform: `translateY(${draggedY}px)` }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          This div can be dragged vertically up to {maxDragY}px.
        </div>
        <ShopList />
      </div>
    </div>
  );
}
