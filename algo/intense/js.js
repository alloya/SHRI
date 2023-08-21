const findPlace = (arr, start, val) => {
  let min = arr[start];
  let ind = start;
  for (let i = ind-1; i >= 0; i--) {
    let curr = arr[i]
    if (curr > min) {
      swap(arr, ind, i)
      ind = i
    }
    else {
      break
    }
  }
}

const swap = (arr, min, max) => {
  let temp = arr[min];
  arr[min] = arr[max];
  arr[max] = temp
}

const sortInsert = (arr) => {
  let len = arr.length;

  for (let i=1; i< len; i++) {
    if (arr[i] < arr[i-1]) {
      findPlace(arr, i);
    }
  }

  return arr
}

console.log(sortInsert([3, 4, 1, 5, 1, 7, 2]))
