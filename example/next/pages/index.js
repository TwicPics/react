import React from "react";
import TwicImg from "react-twicpics";
import "react-twicpics/build/twicpics.css";

export default function Home() {
  return (
    <main>
      <TwicImg src="/football.jpg" step="100" />
      <TwicImg
        src="/football.jpg"
        ratio="16/9"
        step="100"
        focus="auto"
        placeholder="meancolor"
      />
      <TwicImg
        src="/football.jpg"
        step="100"
        focus="auto"
        width="500"
        height="800"
        placeholder="none"
      />
    </main>
  );
}
