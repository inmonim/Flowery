import React from "react";
import Survey from "./ProtoPage/Survey";
import Letters from "./ProtoPage/Letters";
import ProtoIntro from "./ProtoPage/ProtoIntro";
import Memories from "./ProtoPage/Memories";
import More from "./ProtoPage/More";

interface UserProtoPageProps {
  excludeSurvey?: boolean;
}

export default function UserProtoPage(props: UserProtoPageProps) {
  return (
    <div className="md:w-1/2 md:mx-auto">
      <ProtoIntro />
      <Memories />
      <Letters />
      <More />
      {!props.excludeSurvey && <Survey />}
    </div>
  );
}
