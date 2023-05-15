import React, { useEffect, useState } from "react";
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import imageSrc from "../../../assets/flowery_marker.png";
import "../../../assets/styles/variable.scss";
import ShopList from "./ShopList";
import { shopInfo } from "../../../recoil/atom";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import GetData from "./GetData";

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
  const [latLngX, setLatLngX] = useState(0);
  const [latLngY, setLatLngY] = useState(0);
  const [position, setPosition] = useState([] as any[]);
  const shopList = useRecoilValue(shopInfo);

  useEffect(() => {
    if (shopList.length === 0) return;
    const geocoder = new kakao.maps.services.Geocoder();
    // 첫 렌더링에만 실행
    shopList.map((shop: any) =>
      geocoder.addressSearch(`${shop.address}`, function (result: any, status) {
        // 정상적으로 검색이 완료됐으면

        if (status === kakao.maps.services.Status.OK) {
          setLatLngX(result[0].x);
          setLatLngY(result[0].y);
          setPosition((prevPosition: any) => [
            ...prevPosition,
            {
              title: `${shop.storeName}`,
              content: "",
              latlng: { lat: latLngX, lng: latLngY },
            },
          ]);
        }
      })
    );
  }, [shopList]);

  const initMarkers = () => {
    const marker: boolean[] = [];
    position.map((index: any) => {
      marker.push(false);
    });

    setMarkers(marker);
  };

  const handleMarkerClick = (index: number) => {
    const marker: boolean[] = [];
    position.map((index: any) => {
      marker.push(false);
    });

    marker[index] = true;

    setMarkers(marker);
  };

  // initMarkers();

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
          {position.map((value: any, index: number) => (
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
      <div className=" absolute z-10 rounded-xl inset-x-0 bottom-0 h-80 overflow-scroll ">
        <ShopList />
      </div>
    </div>
  );
}
