// 二分查找
// 数据必须是有序的数组
function getNearIndex(array, value) {
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

// 查找近似值的index
function getNearValueIndex(array, value) {
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
  return start
}


function searchFirstEq(array, value) {
  let index = getNearIndex(array, value)
  // 向前查找
  if (index == -1) {
    return index
  }
  while (array[index] == value && index > -1) {
    index--
  }
  return index + 1
}

function searchLastEq(array, value) {
  let index = getNearIndex(array, value)
  // 向前查找
  if (index == -1) {
    return index
  }
  while (array[index] == value && index < array.length) {
    index++
  }
  return index - 1
}


function searchFirstGt(array, value) {
  let index = getNearValueIndex(array, value)
  if (array[index] < value) {
    // 向右找到一个大于等于value的index
    while (index < array.length) {
      if (array[index] >= value) {
        return index
      }
      index++
    }
  } else {
    // 向左找到最后一个大于等于value的index
    while (index > -1) {
      if (array[index] >= value) {
        index--
      } else {
        return index + 1
      }
    }
  }
  return -1
}



function bsearch(a, n, value) {
  let low = 0;
  let high = n - 1;
  while (low <= high) {
    let mid = low + ((high - low) >> 1);
    if (a[mid] >= value) {
      if ((mid == 0) || (a[mid - 1] < value)) return mid;
      else high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
}

// 查找第一个大于等于给定值的元素

function findFirstGte(array, value) {
  if (array[0] > value) {
    return -1
  }

  let start = 0
  let end = array.length - 1
  while (start <= end) {
    let mid = Math.floor((start + end) / 2)
    if (array[mid] >= value) {
      if (mid == 0 || array[mid - 1] < value) {
        return mid
      }
      end = mid - 1
    } else {
      start = mid + 1
    }
  }
}



let array = [-1, 3, 6, 88, 88, 88, 88, 234, 672, 1231]

console.log(findFirstGte(array, 88));
console.log(searchFirstEq(array, 88));
console.log(searchLastEq(array, 88));
console.log(searchFirstGt(array, 88));




