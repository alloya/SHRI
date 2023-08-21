const findMin = (arr, start) => {
  let min = arr[start];
  let ind = start;
  for (let i = start; i < arr.length; i++) {
    if (min > arr[i]) {
      min = arr[i];
      ind = i;
    }
  }
  return {min, ind}
}

const sortSelect = (arr) => {
  let len = arr.length;
  let iteration = 0;

  while (iteration < len ) {
    let min = findMin(arr, iteration)

    let temp = arr[iteration];
    arr[iteration] = min.min;
    arr[min.ind] = temp

    iteration++
  }
  

  return arr
}

console.log(sortSelect([3, 4, 2, 5, 1, 7, 2]))



const sort = (arr) => {
  let len = arr.length;

  while (len > 0) {
    for (let i = 0; i < len; i++) {
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