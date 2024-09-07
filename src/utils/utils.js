import { GRADIENT_STOPS } from "../constants/constants";

const getRand = (max) => Math.floor(Math.random() * (max + 1));

export const getRandomHsl = () => `${getRand(35) * 10} ${(getRand(9) + 1) * 10} ${(getRand(8) + 1) * 10}`;

// const getLevelList = () => {
//   const hslSet = new Set();
//   while (hslSet.size < 366)
//     hslSet.add(getRandomHsl());
//   return [...hslSet];
// };

export const getTodayLevelIndex = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  return (day * month * year) % 1000;
}

export const getSymbol = (guess, target) => {
  if (guess === target) return "✅";
  else if (guess > target) return (guess - target > 20) ? "⏬" : "🔽";
  else return (target - guess > 20) ? "⏫" : "🔼";
}

export const parseSharedColor = (sharedParam) => {
  try {
    return atob(sharedParam)
      .replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')
      .replace(/\b0*(\d{1,3})\b/g, '$1');
  } catch (err) {
    return null;
  }
}

export const getShareText = (guessesList) => {
  const [target, ...guesses] = guessesList;
  const targetValues = target.split(" ");
  const colorEncoding = btoa(`${targetValues.map(value => value.padStart(3, "0")).join("")}`);
  return `
I guessed this HSL in ${guessesList.length}!

${guesses.reverse().map(guess => guess.split(" ").map((value, i) => getSymbol(parseInt(value), parseInt(targetValues[i]))).join("")).join("\n")}
✅✅✅

https://almogshoob.github.io/color-guesser/?color=${colorEncoding}
`
}

export const hsl2safari = (h, s, l, model = "rgb") => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return model === "rgb" ? 255 * color : Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return model === "rgb" ? `rgb(${f(0)},${f(8)},${f(4)})` : `#${f(0)}${f(8)}${f(4)}`;
}

export const hslString2Array = (hslString) => hslString.split(" ").map((n) => parseInt(n))

export const getLinearGradient = (guesses) => {
  return guesses.length > 1
    ? `linear-gradient(to left, ${guesses
      .map(
        // safari sucks
        // (guess, i) => `hsl(${guess}) ${GRADIENT_STOPS[guesses.length][i]}`
        (guess, i) => `${hsl2safari(...hslString2Array(guess))} ${GRADIENT_STOPS[guesses.length][i]}`
      )
      .join()})`
    : `hsl(${guesses[0]})`;
};