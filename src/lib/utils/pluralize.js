export const pluralize = (word, quantity, plural) => {
  if (quantity > 1 || quantity === 0) {
    return plural === undefined ? `${word}s` : plural;
  }
  return word;
};
