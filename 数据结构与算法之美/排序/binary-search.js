// 二分查找
// 数据必须是有序的数组

function searchFirstEq(array, value) {
  let start = 0;
  let end = array.length - 1;
  while (end >= start) {
    let mid = Math.floor((start + end) / 2)
    if (array[mid] === value) {
      return mid;
    }
    if (array[mid] >= value) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1
}


function searchLastEq(array, value) {
  let start = 0;
  let end = array.length - 1;
  while (end >= start) {
    let mid = Math.floor((start + end) / 2)
    if (array[mid] === value) {
      return mid;
    }
    if (array[mid] >= value) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1
}


let array = [-1, 3, 6, 88, 88, 234, 672, 1231]
let result = searchFirstEq(array, 88)
console.log(result);