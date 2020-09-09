// 归并排序

function merge_sort(array) {
  return merge_sort_c(array, 0, array.length - 1);
}

function merge_sort_c(array, start, end) {
  if (start >= end) {
    return [array[end]];
  }

  let mid = Math.floor((start + end) / 2);

  return merge_array(
    merge_sort_c(array, start, mid),
    merge_sort_c(array, mid + 1, end)
  );
}

// 合并两个有序的数组
function merge_array(a1, a2) {
  let result = [];
  while (a1.length != 0 || a2.length != 0) {
    if (!a2[0] || a1[0] <= a2[0]) {
      result.push(a1.shift());
    } else {
      result.push(a2.shift());
    }
  }
  return result;
}

// 快速排序
function quick_sort(array) {
  return quick_sort_c(array, 0, array.length - 1);
}

function quick_sort_c(array, start, end) {
  if (start >= end) {
    return start;
  }
  let pivot = partition(array, start, end);
  quick_sort_c(array, start, pivot - 1);
  quick_sort_c(array, pivot + 1, end);
  return array;
}

function partition(array, start, end) {
  let pivot = array[end];
  let quick = start;
  let slow = start;
  while (quick < end) {
    if (array[quick] < pivot) {
      swap(array, slow, quick);
      slow++;
    }
    quick++;
  }
  swap(array, end, slow);
  return slow;
}

function swap(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

let case1 = [3, 1, 4, 1, 9, 43, 2];
console.log(merge_sort(case1));

// let case2 = [3, 1, 4, 1, 9, 43, 2];
// console.log(quick_sort(case2));

let case3 = [1, 9, 6, 3];
console.log(quick_sort(case3));
