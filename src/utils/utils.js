const getRand = (max) => Math.floor(Math.random() * (max + 1));

export const getRandomHsl = () => `${getRand(36) * 10} ${(getRand(9) + 1) * 10} ${(getRand(8) + 1) * 10}`;

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
  
  ${guesses.map(guess => guess.split(" ").map((value, i) => getSymbol(parseInt(value), parseInt(targetValues[i]))).join("")).join("\n")}
  ✅✅✅
  
  https://almogshoob.github.io/color-guesser/?color=${colorEncoding}
  `
}