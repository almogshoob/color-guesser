import { useMemo, useRef, useState } from "react";
import { KeyboardIcon, ShareIcon } from "../../assets/icons";
import {
  ERRORS,
  FORMAT_REGEX,
  HELPER_TEXTS,
  HSL_REGEX,
} from "../../constants/constants";
import { getShareText, hsl2safari, hslString2Array } from "../../utils/utils";

const Console = ({ todayColor, guesses, setGuesses }) => {
  const isMobile = useMemo(() => navigator.maxTouchPoints > 0, []);
  const isFinished = useMemo(
    () => guesses.length === 5 || guesses[0] === todayColor,
    [guesses]
  );

  const inputRef = useRef();
  const buttonRef = useRef();
  const [helperText, setHelperText] = useState(HELPER_TEXTS.GUESS0);
  const [autoFocus, setAutoFocus] = useState(!isMobile);
  const [inputmode, setInputmode] = useState(
    localStorage.getItem("keyboard") || "numeric"
  );

  const handleSumbit = (event) => {
    event.preventDefault();
    if (isFinished) return;

    const input = inputRef.current.value.trim();
    if (guesses.includes(input)) setHelperText(ERRORS.ALREADY_GUESSED);
    else if (!input.match(FORMAT_REGEX)) setHelperText(ERRORS.WRONG_FORMAT);
    else if (!input.match(HSL_REGEX)) setHelperText(ERRORS.OUT_OF_RANGE);
    else {
      const isCorrect = input === todayColor;
      const isLastTry = guesses.length === 4;
      if (isCorrect) {
        setHelperText(HELPER_TEXTS.SUCCESS);
        event.target.children[0].blur();
      } else if (isLastTry) {
        setHelperText(HELPER_TEXTS.FAILURE);
        event.target.children[0].blur();
      } else setHelperText(HELPER_TEXTS[`GUESS${guesses.length + 1}`]);
      setGuesses((prev) => [input, ...prev]);
    }
  };

  const handleSwitchKeyboard = () => {
    const newValue = inputmode === "numeric" ? "text" : "numeric";
    localStorage.setItem("keyboard", newValue);
    setAutoFocus(true);
    setInputmode(newValue);
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
            style={{
              // safari sucks
              // backgroundColor: `hsl(${todayColor})`
              backgroundColor: hsl2safari(...hslString2Array(todayColor)),
            }}
          />
        </div>
        <div className="column">
          <h2>Guess</h2>
          <div
            className="color-box"
            style={{
              backgroundColor: guesses.length
                ? // safari sucks
                  // `hsl(${guesses[0]})`
                  hsl2safari(...hslString2Array(guesses[0]))
                : "var(--bg-color)",
            }}
          />
        </div>
      </div>
      <form onSubmit={handleSumbit} className="input-form">
        <input
          ref={inputRef}
          autoFocus={autoFocus}
          type="text"
          inputMode={inputmode}
          key={inputmode} // safari sucks if not key need to inputRef.current.focus()
          maxLength={11}
          placeholder="H S L"
          disabled={isFinished}
          className="color-input"
        />
        {isMobile && (
          <button
            tabIndex={-1} // safari sucks
            ref={buttonRef}
            type="button"
            id="switch-keyboard-button"
            className="switch-keyboard"
            onClick={handleSwitchKeyboard}
          >
            <KeyboardIcon />
          </button>
        )}
        {/* safari sucks */}
        <input type="submit" className="hidden-safari-submit" value="" />
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
