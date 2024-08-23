// const getLevelList = () => {
//   const getRand = (max) => Math.floor(Math.random() * (max + 1));
//   const hslSet = new Set();
//   while (hslSet.size < 366)
//     hslSet.add(
//       `${getRand(36) * 10} ${(getRand(9) + 1) * 10} ${(getRand(8) + 1) * 10}`
//     );
//   return [...hslSet];
// };


export const getTodayLevelIndex = () => {
  return Math.floor(Math.random() * (1000)); //TODO daily?

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