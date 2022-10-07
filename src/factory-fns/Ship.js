const Ship = (name, length, direction) => {
  let hits = 0;
  function hit() {
    if (hits < length) {
      ++this.hits;
    }
  }
  function isSunk() {
    if (this.hits === this.length) {
      return true;
    } else {
      return false;
    }
  }
  return { direction, length, name, hits, hit, isSunk };
};

export default Ship;
