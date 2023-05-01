import React, { useState, useEffect } from "react";
import "./LetterPage.css";

const LetterPage = () => {
  const [text, setText] = useState("");
  const [pages, setPages] = useState([""]);

  const paperHeight = 1000; // Adjust the fixed size of the paper here
  const lineHeight = 20; // Adjust the line height here

  useEffect(() => {
    // Split text into pages
    const splitPages = (content: any) => {
      const lines = content.split("\n");
      const pages = [];
      let currentPage: any = [];

      lines.forEach((line: any) => {
        if (currentPage.length * lineHeight >= paperHeight) {
          pages.push(currentPage.join("\n"));
          currentPage = [];
        }
        currentPage.push(line);
      });

      pages.push(currentPage.join("\n"));
      return pages;
    };

    setPages(splitPages(text));
  }, [text, paperHeight, lineHeight]);

  return (
    <div className="letter-container">
      {pages.map((page, index) => (
        <>
          <textarea
            className="letter-input"
            value={pages[index]}
            onChange={(e) => setText(e.target.value)}
          />
          <div
            key={index}
            className="letter-page"
            style={{ height: paperHeight, lineHeight: `${lineHeight}px` }}
          >
            {page}
          </div>
        </>
      ))}
    </div>
  );
};

export default LetterPage;
