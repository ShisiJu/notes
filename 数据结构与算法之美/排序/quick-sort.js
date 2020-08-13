function swap(array, i, j) {

}


function partition(array, start, end) {
  let p = array[end]
  let j = start
  for (let i = start; i < end; i++) {

    if (array[i] >= p) {
      swap(array, i, j);
    } else {
      j++
    }
  }

}

function quick_sort_c(array, start, end) {
  // 结束条件
  if (end <= start) {
    return
  }

  // 获取分区点
  let pviot = partition(array, start, end)
  quick_sort_c(array, start, pviot)
  quick_sort_c(array, pviot + 1, end)
}



function quick_sort(array) {
  return quick_sort_c(array, 0, array.length - 1)
}





let array = [3, 1, -1, 9, 5, 3]

console.log(quick_sort(array));