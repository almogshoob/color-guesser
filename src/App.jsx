import { useMemo, useState } from "react";
import "./App.css";
import { Console, Guesses, Navbar } from "./components";
import { getRandomHsl, parseSharedColor } from "./utils/utils";

function App() {
  const [guesses, setGuesses] = useState([]);
  const todayColor = useMemo(() => {
    const queryParams = Object.fromEntries(
      new URLSearchParams(window.location.search)
    );
    if (queryParams.color)
      return parseSharedColor(queryParams.color) || "0 0 0";
    else return getRandomHsl();
  }, []);

  return (
    <>
      <Navbar />
      <main className="content">
        <Console
          guesses={guesses}
          setGuesses={setGuesses}
          todayColor={todayColor}
        />
        <Guesses guesses={guesses} todayColor={todayColor} />
      </main>
    </>
  );
}

export default App;
