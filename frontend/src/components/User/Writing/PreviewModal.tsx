import React from "react";

import UserProtoPage from "../../ReleasePage/UserProtoPage";

const PreviewModal = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  return (
    <div className="opacity-100 z-[60] p-10 bg-gray-300">
      <div ref={ref} className="">
        <div className="bg-white">
          <UserProtoPage excludeSurvey={true} />
        </div>
      </div>
    </div>
  );
});

export default PreviewModal;
