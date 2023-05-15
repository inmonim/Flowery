import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { cardImg } from "../../../recoil/atom";

interface cardType {
  flowerPicture: string;
  font: number;
  mean: string;
  message: string;
  messageDate: string;
  messageId: string;
  pictures: string[];
  poem: string;
  video: string;
}

const GardenCard = (props: {card: cardType}) => {
  const [imgUrl, setImgUrl] = useRecoilState<string>(cardImg);

  return <div>카드
    <img src={imgUrl} alt="" />
  </div>;
};

export default GardenCard;
