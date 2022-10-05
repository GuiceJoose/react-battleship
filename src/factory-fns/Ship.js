const Ship = (length) => {
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
  return { length, hits, hit, isSunk };
};

export default Ship;
