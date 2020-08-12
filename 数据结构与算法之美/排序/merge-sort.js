function getMin(a1, a2) {
  if (a1.length == 0) {
    return a2.unshift();
  }

  if (a2.length == 0) {
    return a1.unshift();
  }

  if (a1[0] >= a2[0]) {
    return a1.unshift()
  } else {
    return a2.unshift()
  }
}


function merge(array, a1, a2, start, end) {

  for (let i = start; i <= end; i++) {
    array[i] = getMin(a1, a2)
  }

}

function merge_array(array, start, end) {
  if (end <= start) {
    return [array[start]]
  }

  let mid = Math.floor((start + end) / 2);
  let a1 = merge_array(array, start, mid)
  let a2 = merge_array(array, mid + 1, end)
  merge(array, a1, a2, start, end)
}


// 归并排序

function merge_sort(array) {
  if (array.length < 2) {
    return array;
  }
  return merge_array(array, 0, array.length - 1)
}





let array = [3, 1, -1, 9, 5, 3]

console.log(merge_sort(array));