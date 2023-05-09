import React from "react";

import UserProtoPage from "../../ReleasePage/UserProtoPage";

const PreviewModal = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  return (
    <div className="absolute inset-x-0 bg-opacity-50 bg-black z-[20]">
      <div className="flex justify-center p-10">
        <div ref={ref} className="bg-white lg:w-1/4">
          <UserProtoPage excludeSurvey={true} />
        </div>
      </div>
    </div>
  );
});

export default PreviewModal;
