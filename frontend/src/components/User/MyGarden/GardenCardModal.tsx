import React, { useState } from "react";
import UserProtoPage from "../../ReleasePage/UserProtoPage";

const GardenCardModal = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="absolute inset-x-0 top-0 h-[300%] overflow-y-hidden-scroll bg-opacity-50 bg-black z-[20]">
      <div className="m-auto sm:w-full md:w-1/2 lg:w-[34%] p-10">
        <div ref={ref} className="bg-white ">
          <UserProtoPage isQR={false}  />
        </div>
      </div>
    </div>
  );
});

export default GardenCardModal;
