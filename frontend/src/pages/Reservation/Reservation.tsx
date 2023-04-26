/* global kakao */
import React, { useEffect, useState } from "react";
import imageSrc from "../../assets/flowery_marker.png";

//  이거 왜 해야하더라? -> kakao 객체는 브라우저 전역 객체인 window 안에 포함
declare global {
  interface Window {
    kakao: any;
  }
}

// 꽃들 35.1569, 129.0591
// 써니플레르 양산 35.313, 129.0103

export default function Reservation() {
  // 인포윈도우 Open 여부를 저장하는 state 입니다.

  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(35.2352, 129.055),
      level: 9,
    };
    let map = new window.kakao.maps.Map(container, options);
    var positions = [
      {
        content: "<div>꽃들 info</div>",
        title: "꽃들",
        lating: new window.kakao.maps.LatLng(35.1569, 129.0591),
      },
      {
        content: "<div>써니플레르 info</div>",
        title: "써니플레르",
        lating: new window.kakao.maps.LatLng(35.313, 129.0103),
      },
    ];

    for (var i = 0; i < positions.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new window.kakao.maps.Size(25, 30);
      var clickedImageSize = new window.kakao.maps.Size(35, 40);
      var selectedMarker = null;
      // 마커 이미지를 생성합니다
      var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
      var clikcedMarkerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        clickedImageSize
      );
      // 마커를 생성합니다
      var marker = new window.kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].lating, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });

      // 마커에 표시할 인포윈도우를 생성합니다
      var infowindow = new window.kakao.maps.InfoWindow({
        content: positions[i].content, // 인포윈도우에 표시할 내용
      });
      markers.push(marker);
      window.kakao.maps.event.addListener(
        map,
        "click",
        closeInfoWindow(map, marker, infowindow)
      );

      window.kakao.maps.event.addListener(
        marker,
        "click",
        openInfoWindow(map, marker, infowindow)
      );
      // window.kakao.maps.event.addListener(
      //   marker,
      //   "mouseout",
      //   makeOutListener(infowindow)
      // );
    }

    function openInfoWindow(map: any, marker: any, infowindow: any) {
      return function () {
        if (infowindow.getMap()) {
          infowindow.close();
          marker.setImage(markerImage);
        } else {
          infowindow.open(map, marker);
          marker.setImage(clikcedMarkerImage);
        }
      };
    }

    function closeInfoWindow(map: any, marker: any, infowindow: any) {
      return function () {
        if (infowindow.getMap()) {
          infowindow.close();
          marker.setImage(markerImage);
        }
      };
    }

    // function closeAllInfoWindows(map: any, markers: any) {
    //   for (var i = 0; i < markers.length; i++) {
    //     if (markers[i].infowindow && markers[i].infowindow.getMap()) {
    //       markers[i].infowindow.close();
    //     }
    //   }
    // }
  };
  return <div id="map" style={{ width: "100vw", height: "100vh" }}></div>;
}
