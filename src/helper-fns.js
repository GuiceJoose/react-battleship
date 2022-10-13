function isArray1InArray2(arr1, arr2) {
  const stringyArr1 = JSON.stringify(arr1);
  const stringyArr2 = JSON.stringify(arr2);
  const result = stringyArr2.indexOf(stringyArr1);
  if (result === -1) {
    return false;
  } else {
    return true;
  }
}

function indexOf2d(val, arr, comparer) {
  for (let i = 0; i < arr.length; i++) {
    if (i in arr && comparer(val, arr[i])) {
      return i;
    }
  }
  return -1;
}

function generateRandomCoords() {
  const coord = Math.floor(Math.random() * 10);
  return coord;
}
function pickRandomDirection() {
  return Math.random() >= 0.5 ? "horizontal" : "vertical";
}

export {
  isArray1InArray2,
  indexOf2d,
  generateRandomCoords,
  pickRandomDirection,
};
