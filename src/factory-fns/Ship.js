const Ship = (name, length, direction) => {
  let hits = [];
  function hit() {
    if (hits < length) {
      ++hits;
    }
  }
  function isSunk() {
    if (hits === length) {
      return true;
    } else {
      return false;
    }
  }
  return { direction, length, name, hits, hit, isSunk };
};

export default Ship;
