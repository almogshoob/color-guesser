import { useMemo } from "react";
import { getSymbol } from "../../utils/utils";

const gradientStops = {
  // 2: ["0 40%", "60% 100%"],
  // 3: ["0 22%", "39% 61%", "78% 100%"],
  // 4: ["0 16%", "28% 44%", "56% 72%", "84% 100%"],
  // 5: ["0 16%", "21% 37%", "42% 58%", "63% 79%", "84% 100%"],
  2: ["0 50%", "50% 100%"],
  3: ["0 33%", "33% 66%", "66% 100%"],
  4: ["0 25%", "25% 50%", "50% 75%", "75% 100%"],
  5: ["0 20%", "20% 40%", "40% 60%", "60% 80%", "80% 100%"],
};

const Guesses = ({ todayColor, guesses }) => {
  const todayColorValues = todayColor.split(" ").map((n) => parseInt(n));

  const colorProgressGradient = useMemo(() => {
    return guesses.length > 1
      ? `linear-gradient(to left, ${guesses
          .map(
            (guess, i) => `hsl(${guess}) ${gradientStops[guesses.length][i]}`
          )
          .join()})`
      : `hsl(${guesses[0]}`;
  }, [guesses.length]);

  return (
    <div className="guesses | paper column">
      <h2>Guesses</h2>
      <div
        className="color-progress"
        style={{ background: colorProgressGradient }}
      />
      <div className="hsl-helper | row">
        <p>Hue</p>
        <p>Saturation</p>
        <p>Lightness</p>
      </div>
      <div className="guesses-list | column">
        {guesses.map((guess) => (
          <div className="guess-item | row" key={guess}>
            {guess.split(" ").map((colorField, i) => (
              <div key={i} className="guess-field">
                {colorField} <br />
                {getSymbol(parseInt(colorField), todayColorValues[i])}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export { Guesses };
