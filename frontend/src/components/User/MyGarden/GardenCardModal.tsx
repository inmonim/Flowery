import React, { useState } from "react";
import card from "../../../assets/Card0.png"

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

const GardenCardModal = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  console.log(props.card)

  return (
    <div className="absolute inset-x-0 h-[100%] overflow-y-hidden-scroll bg-opacity-50 bg-black z-[20]">
      <div className="m-auto sm:w-full md:w-1/2 lg:w-[34%] p-10">
        <div ref={ref} className="bg-white ">
          <div
            className={`flip-card ${isFlipped ? "flipped" : ""}`}
            onClick={handleClick}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                {/* <img src={props.card.pictures[0]} className="" /> */}
                <img src={card} className="w-" />
              </div>
              <div className="flip-card-back ">
                <img src={props.card.flowerPicture} className="" />
                <div>
                    <input type="button"  value="확인" className="h-100vh" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div
    //   className={`flip-card ${isFlipped ? "flipped" : ""}`}
    //   onClick={handleClick}
    // >
    //   <div className="flip-card-inner">
    //     <div className="flip-card-front">
    //       <img src={props.card.flowerPicture} alt="Avatar" className="" />
    //     </div>
    //     <div className="flip-card-back">
    //       <h1>John Doe</h1>
    //     </div>
    //   </div>
    // </div>
  );
});

export default GardenCardModal;
