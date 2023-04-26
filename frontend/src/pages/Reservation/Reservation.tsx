/* global kakao */
import React, { useEffect } from "react";
import imageSrc from "../../assets/flowery_marker.png";

declare global {
  interface Window {
    kakao: any;
  }
}

// 꽃들 35.1569, 129.0591
// 써니플레르 양산 35.313, 129.0103

export default function Reservation() {
  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(35.2352, 129.055),
      level: 9,
    };
    let map = new window.kakao.maps.Map(container, options);
    var positions = [
      {
        title: "꽃들",
        lating: new window.kakao.maps.LatLng(35.1569, 129.0591),
      },
      {
        title: "써니플레르",
        lating: new window.kakao.maps.LatLng(35.313, 129.0103),
      },
    ];

    for (var i = 0; i < positions.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new window.kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new window.kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].lating, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
    }
  }, []);

  return <div id="map" style={{ width: "100vw", height: "100vh" }}></div>;
}
