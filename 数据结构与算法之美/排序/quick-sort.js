function swap(array, i, j) {
  if (i == j) {
    return array
  }

  let temp = array[i]
  array[i] = array[j]
  array[j] = temp
  return array
}


function partition(array, start, end) {
  let pivot = array[end]
  let i = start
  let j = start;
  for (j = start; j < end; j++) {
    if (array[j] <= pivot) {
      swap(array, i, j)
      i++
    }
  }
  swap(array, i, end)
  return i
}

function quick_sort_c(array, start, end) {
  // 结束条件
  if (end <= start) {
    return
  }

  // 获取分区点
  let pivot = partition(array, start, end)
  quick_sort_c(array, start, pivot - 1)
  quick_sort_c(array, pivot + 1, end)
}



function quick_sort(array) {
  quick_sort_c(array, 0, array.length - 1)
  return array
}





let array = [3, 1, -1, 9, 5, 3]

console.log(quick_sort(array));