import React, { useState } from "react";
import ReactFullpage, { fullpageOptions } from "@fullpage/react-fullpage";

interface Section {
  text: string;
  id?: number;
}

const originalColors = [
  "blue",
  "#0798ec",
  "#fc6c7c",
  "#435b71",
  "orange",
  "blue",
  "purple",
  "yellow",
];

type Credits = {
  enabled?: boolean;
  label?: string;
  position?: "left" | "right";
};

const pluginWrapper = () => {
  /*
   * require('../static/fullpage.scrollHorizontally.min.js'); // Optional. Required when using the "scrollHorizontally" extension.
   */
};

const FullpageJsExample = () => {
  const [sectionsColor, setSectionsColor] = useState([...originalColors]);
  const [fullpages, setFullpages] = useState<Section[]>([
    {
      text: "Section 1",
    },
    {
      text: "Section 2",
    },
    {
      text: "Section 3",
    },
  ]);

  const onLeave = (origin: any, destination: any, direction: any) => {
    console.log("onLeave", { origin, destination, direction });
  };

  const handleChangeColors = () => {
    const newColors =
      sectionsColor[0] === "yellow" ? [...originalColors] : ["yellow", "blue", "white"];
    setSectionsColor(newColors);
  };

  const handleAddSection = () => {
    setFullpages((prevFullpages) => [
      ...prevFullpages,
      {
        text: `section ${prevFullpages.length + 1}`,
        id: Math.random(),
      },
    ]);
  };

  const handleRemoveSection = () => {
    setFullpages((prevFullpages) => {
      const newPages = [...prevFullpages];
      newPages.pop();
      return newPages;
    });
  };

  if (!fullpages.length) {
    return null;
  }



  const credits: Credits = {
    enabled: true,
    label: "my custom",
    position: "left",
  };

  return (
    <div className="App">
      <ReactFullpage
        licenseKey={"OPEN-SOURCE-GPLV3-LICENSE"}
        navigation
        onLeave={onLeave}
        sectionsColor={sectionsColor}
        pluginWrapper={pluginWrapper}
        debug={false}
        credits={credits}
        render={(comp: any) => (
          <ReactFullpage.Wrapper>
            {fullpages.map(({ text }) => (
              <div key={text} className="section">
                <h1>{text}</h1>
              </div>
            ))}
          </ReactFullpage.Wrapper>
        )}
      />
    </div>
  );
};

export default FullpageJsExample;