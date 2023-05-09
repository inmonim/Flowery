import React from "react";

import UserProtoPage from "../../ReleasePage/UserProtoPage";

const PreviewModal = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  return (
    <div className="absolute inset-x-0 bg-opacity-50 bg-black z-[20]">
      <div className="m-auto sm:w-full md:w-1/2 lg:w-1/4 p-10">
        <div ref={ref} className="bg-white ">
          <UserProtoPage excludeSurvey={true} />
        </div>
      </div>
    </div>
  );
});

export default PreviewModal;
