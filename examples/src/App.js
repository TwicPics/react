import TwicImg from "@twicpics/react";
import "@twicpics/react/dist/twicpics.css";

function App() {
  return (
    <main>
      <TwicImg
        src="https://assets.twicpics.com/examples/football.jpg"
        step="100"
      />
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
        alt="custom alt attribute"
      />
    </main>
  );
}

export default App;
