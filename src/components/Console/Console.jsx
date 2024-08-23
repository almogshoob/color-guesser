import { useRef, useState } from "react";

const helperTexts = {
  0: "Start by typing your guess above!",
  1: "Not quite! 4 guesses left",
  2: "Keep going! 3 guesses left",
  3: "Almost there! 2 guesses left",
  4: "Last try! 1 guess left",
  5: "Well done!",
};

const Console = ({ todayColor, guesses, setGuesses }) => {
  const inputRef = useRef();
  const [helperText, setHelperText] = useState(helperTexts[0]);

  const handleSumbit = (event) => {
    event.preventDefault();
    if (guesses.length === 5 || guesses[0] === todayColor) return;

    const input = inputRef.current.value.trim();
    if (guesses.includes(input))
      setHelperText("You already guesses it, try something else");
    else if (input.split(" ").length !== 3)
      setHelperText("Error: enter 3 number separated with spaces");
    else if (
      !input.match(
        /^(360|3[0-5][0-9]|[12]?[0-9]?[0-9]) ([0-9]|[1-9][0-9]|100) ([0-9]|[1-9][0-9]|100)$/
      )
    )
      setHelperText(
        "Out of range: hue (0-360) saturation (0-100) luminance (0-100)"
      );
    else {
      const isLastTry = guesses.length === 4;
      const isCorrect = input === todayColor;
      setHelperText(
        isCorrect ? helperTexts[5] : helperTexts[guesses.length + 1]
      );
      if (isLastTry && !isCorrect) setHelperText("Maybe next time :)");
      setGuesses((prev) => [input, ...prev]);
    }
  };

  return (
    <div className="paper column">
      <div className="colors | row">
        <div className="column">
          <h2>Target</h2>
          <div
            className="color-box"
            style={{ backgroundColor: `hsl(${todayColor})` }}
          />
        </div>
        <div className="column">
          <h2>Guess</h2>
          <div
            className="color-box"
            style={{
              backgroundColor: guesses.length
                ? `hsl(${guesses[0]})`
                : "var(--bg-color)",
            }}
          />
        </div>
      </div>
      <form onSubmit={handleSumbit}>
        <input
          autoFocus={true}
          ref={inputRef}
          type="tel" // TODO text or tel?
          maxLength={11}
          className="color-input"
          readOnly={guesses.length === 5 || guesses[0] === todayColor}
          placeholder="H S L"
        />
      </form>
      <p className="helper">{helperText}</p>
    </div>
  );
};

export { Console };
