import { useMemo } from "react";
import {
  getLinearGradient,
  getSymbol,
  hslString2Array,
} from "../../utils/utils";

const Guesses = ({ todayColor, guesses }) => {
  const todayColorValues = hslString2Array(todayColor);

  const colorProgressGradient = useMemo(
    () => getLinearGradient(guesses),
    [guesses.length]
  );

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
