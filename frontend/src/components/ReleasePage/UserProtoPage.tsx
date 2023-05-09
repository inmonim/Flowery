import React from "react";
import Survey from "./ProtoPage/Survey";
import Letters from "./ProtoPage/Letters";
import ProtoIntro from "./ProtoPage/ProtoIntro";
import Memories from "./ProtoPage/Memories";
import More from "./ProtoPage/More";

export default function UserProtoPage() {
  return (
    <div className="md:w-1/2 md:mx-auto">
      <ProtoIntro />
      <Memories />
      <Letters />
      <More />
      <Survey />
    </div>
  );
}
