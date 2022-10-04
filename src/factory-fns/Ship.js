const Ship = (length) => {
  let hits = 0;
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
  return { length, hits, hit, isSunk };
};

export default Ship;
