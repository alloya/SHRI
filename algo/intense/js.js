const sort = (arr) => {
  let len = arr.length;

  while (len > 0) {
    for (let i = 0; i < len; i++ ) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i + 1];
        arr[i + 1] = arr[i];
        arr[i] = temp;
      }
    }
    len--
  }
  return arr
}

console.log(sort([1, 4, 2, 5, 3]))