const deepObjectTransform = (obj, callback) => {
  const newObj = {};
  Object.keys(obj).forEach(key => {
    // handle nested loop
    if (typeof obj[key] === 'object') {
      if (Array.isArray(obj[key])) {
        const newArray = obj[key].map(item => {
          if (typeof item === 'object') {
            return deepObjectTransform(item, callback);
          }
          return callback(item);
        });
        newObj[key] = newArray;
      } else {
        newObj[key] = deepObjectTransform(obj[key], callback);
      }
    } else {
      // string, bool, number can be treated with callback
      newObj[key] = callback(obj[key]);
    }
  });
  return newObj;
};

export default deepObjectTransform;
