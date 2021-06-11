import Immutable from 'seamless-immutable';

export function splice(arr, start, deleteCount, ...items) {
  return Immutable([...arr.slice(0, start), ...items, ...arr.slice(start + deleteCount)]);
}

export function pop(arr) {
  return arr.slice(0, -1);
}

export function shift(arr) {
  return arr.slice(1);
}

export function unshift(arr, newEntry) {
  return Immutable([newEntry, ...arr]);
}

export function remove(arr, index) {
  return Immutable(arr.slice(0, index).concat(arr.slice(index + 1)));
}

export function push(arr, newEntry) {
  return [].concat(arr, newEntry);
}

export function move(array, from, to) {
  const item = array[from];
  const diff = from - to;

  if (diff > 0) {
    return [
      ...array.slice(0, to),
      item,
      ...array.slice(to, from),
      ...array.slice(from + 1, array.length),
    ];
  }
  if (diff < 0) {
    const target = to + 1;
    return [
      ...array.slice(0, from),
      ...array.slice(from + 1, target),
      item,
      ...array.slice(target, array.length),
    ];
  }
  return array;
}
