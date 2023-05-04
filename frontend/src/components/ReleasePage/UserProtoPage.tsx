import React from "react";
import Survey from "./ProtoPage/Survey";
import Letters from "./ProtoPage/Letters";
import ProtoIntro from "./ProtoPage/ProtoIntro";
import Memories from "./ProtoPage/Memories";

export default function UserProtoPage() {
  return (
    <div className="">
      <ProtoIntro />
      <Memories />
      <Letters />
      <Survey />
    </div>
  );
}
