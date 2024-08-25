import { useRef, useState } from "react";
import { KeyboardIcon, ShareIcon } from "../../assets/icons";
import { ERRORS, HELPER_TEXTS, HSL_REGEX } from "../../constants/constants";
import { getShareText } from "../../utils/utils";

const Console = ({ todayColor, guesses, setGuesses }) => {
  const inputRef = useRef();
  const [helperText, setHelperText] = useState(HELPER_TEXTS.GUESS0);

  const handleSumbit = (event) => {
    event.preventDefault();
    if (guesses.length === 5 || guesses[0] === todayColor) return;

    const input = inputRef.current.value.trim();
    if (guesses.includes(input)) setHelperText(ERRORS.ALREADY_GUESSED);
    else if (input.split(" ").length !== 3) setHelperText(ERRORS.WRONG_FORMAT);
    else if (!input.match(HSL_REGEX)) setHelperText(ERRORS.OUT_OF_RANGE);
    else {
      const isLastTry = guesses.length === 4;
      const isCorrect = input === todayColor;
      setHelperText(
        isCorrect
          ? HELPER_TEXTS.SUCCESS
          : HELPER_TEXTS[`GUESS${guesses.length + 1}`]
      );
      if (isLastTry && !isCorrect) setHelperText(HELPER_TEXTS.FAILURE);
      setGuesses((prev) => [input, ...prev]);
    }
  };  

  const handleSwitchKeyboard = (e) => {
    e.preventDefault();
    const newValue =
      inputRef.current.inputMode === "numeric" ? "text" : "numeric";
    inputRef.current.inputMode = newValue;
    localStorage.setItem("keyboard", newValue);
    inputRef.current.focus();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(getShareText(guesses));
  };

  return (
    <div className="console | paper column">
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
          ref={inputRef}
          autoFocus={true}
          type="text"
          inputMode={localStorage.getItem("keyboard") || "numeric"}
          maxLength={11}
          placeholder="H S L"
          readOnly={guesses.length === 5 || guesses[0] === todayColor}
          className="color-input"
        />
        <button
          type="button"
          className="switch-keyboard"
          onClick={handleSwitchKeyboard}
        >
          <KeyboardIcon />
        </button>
      </form>
      <p className="helper">{helperText}</p>
      {guesses[0] === todayColor && (
        <button className="share-button" onClick={handleShare}>
          <ShareIcon />
        </button>
      )}
    </div>
  );
};

export { Console };
