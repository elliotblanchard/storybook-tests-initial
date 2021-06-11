const getStyleValueFromVarString = str => {
  if (typeof str === 'string' && typeof window !== 'undefined' && str.includes('var(')) {
    const regex = /var\(|\)/g;
    const strippedString = str.replace(regex, '');
    const value = window
      ?.getComputedStyle(document.documentElement)
      .getPropertyValue(strippedString)
      .trim();
    return value;
  } else {
    return str;
  }
};

export default getStyleValueFromVarString;
