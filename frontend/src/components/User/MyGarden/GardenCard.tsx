import React, { useState } from "react";

function Card() {
  const [isEnlarged, setIsEnlarged] = useState(false);

  const handleCardClick = () => {
    setIsEnlarged(!isEnlarged);
  };

  return (
    <div
      className={`${
        isEnlarged
          ? "fixed top-0 left-0 h-full w-full flex justify-center items-center z-10"
          : ""
      } transition-all duration-500 ease-in-out`}
    >
      <div
        className={`${
          isEnlarged
            ? "bg-white rounded-lg shadow-lg p-6 transform rotate-180"
            : "bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:scale-105"
        } transition-all duration-500 ease-in-out`}
        onClick={handleCardClick}
      >
        <h2 className="text-2xl font-bold mb-4">Card Title</h2>
        <p className="text-gray-700">Card Content</p>
      </div>
    </div>
  );
}

export default Card;
