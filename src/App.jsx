import { useMemo, useState } from "react";
import "./App.css";
import levels from "./assets/data/levels.json";
import { Console, Guesses, Navbar } from "./components";
import { getTodayLevelIndex } from "./utils/utils";

function App() {
  const [guesses, setGuesses] = useState([]);
  const todayColor = useMemo(() => levels.list[getTodayLevelIndex()], []);

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
