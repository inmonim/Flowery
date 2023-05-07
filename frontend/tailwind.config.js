/** @type {import('tailwindcss').Config} */
module.exports = {
  // 템플릿 파일의 경로 설정 👀
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ballet: ["ballet"],
        namyeong: ["namyeong"],
        nasq: ["nasq"],
      },
      colors: {
        sub: "#FFFAF5",
        b_bottom: "#EADED0",
      },
      animation: {
        fadeOut: "fadeOut 2s ease-out forwards",
        fadeIn: "fadeIn 1s ease-in forwards",
        slider: "slider 1s ease-in forwards",
        textSlideLtoR: "textSlideLtoR 1s ease-in-out forwards",
        textSlideRtoL: "textSlideRtoL 1s ease-in-out forwards",
        heartBeat: "heartBeat 1s ease-in-out infinite",
        typing: "typing 3.5s steps(40, end)",
      },
      keyframes: {
        typing: {
          from: { width: "0" },
          to: { width: "14ch" },
        },
        heartBeat: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "60%": { opacity: 0 },
          "100%": { opacity: 1, color: "black" },
        },
        slider: {
          "0%": {
            transform: "translateY(0px)",
          },
          "100%": {
            transform: "translateY(100px)",
          },
        },
        textSlideLtoR: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        textSlideRtoL: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animation-delay"),
    // ...
  ],
};
