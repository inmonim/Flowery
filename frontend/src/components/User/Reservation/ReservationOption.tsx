import React from "react";
import Timeselect from "./TImeSelect";
import Dayselect from "./DaySelect";
export default function ReservationOption() {
  const positions = [
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
  return (
    <>
      <p>info</p>
      <Dayselect />
      <Timeselect />
    </>
  );
}
