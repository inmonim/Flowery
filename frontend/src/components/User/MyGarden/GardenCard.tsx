import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { cardImg } from "../../../recoil/atom";
import "./GardenCard.css";

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

const GardenCard = (props: { card: cardType }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <div
      className={`flip-card ${isFlipped ? "flipped" : ""}`}
      onClick={handleClick}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={props.card.flowerPicture} alt="Avatar" className="" />
        </div>
        <div className="flip-card-back">
          <h1>John Doe</h1>
        </div>
      </div>
    </div>
  );
};

export default GardenCard;
