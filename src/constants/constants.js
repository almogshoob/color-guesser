export const HELPER_TEXTS = {
  GUESS0: "Start by typing your guess above!",
  GUESS1: "Not quite! 4 guesses left",
  GUESS2: "Keep going! 3 guesses left",
  GUESS3: "Almost there! 2 guesses left",
  GUESS4: "Last try! 1 guess left",
  SUCCESS: "Well done!",
  FAILURE: "Maybe next time :)",
};

export const ERRORS = {
  ALREADY_GUESSED: "You already guesses it, try something else",
  WRONG_FORMAT: "Not in format: enter 3 numbers separated with spaces",
  OUT_OF_RANGE:
    "Out of range: hue (0-360) saturation (0-100) luminance (0-100)",
};

export const FORMAT_REGEX = /^(\d)+ (\d)+ (\d)+$/

export const HSL_REGEX =
  /^([12]?[0-9]?[0-9]|3[0-5][0-9]|360) ([0-9]|[1-9][0-9]|100) ([0-9]|[1-9][0-9]|100)$/;

export const GRADIENT_STOPS = {
  // 2: ["0 40%", "60% 100%"],
  // 3: ["0 22%", "39% 61%", "78% 100%"],
  // 4: ["0 16%", "28% 44%", "56% 72%", "84% 100%"],
  // 5: ["0 16%", "21% 37%", "42% 58%", "63% 79%", "84% 100%"],
  2: ["0 50%", "50% 100%"],
  3: ["0 33%", "33% 66%", "66% 100%"],
  4: ["0 25%", "25% 50%", "50% 75%", "75% 100%"],
  5: ["0 20%", "20% 40%", "40% 60%", "60% 80%", "80% 100%"],
};