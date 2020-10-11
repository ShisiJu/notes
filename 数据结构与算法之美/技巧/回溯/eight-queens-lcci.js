// https://leetcode-cn.com/problems/eight-queens-lcci/
// 判断是否在一条斜线上还有更加简便的做法，就是如果行互减的绝对值等于列互减的绝对值，那么就是在一条斜线上的。
// if (Math.abs(row - i) == Math.abs(column - result[i])) {
//                 return false;
//             }

// n 皇后问题
// 分治 递归

// 这里可以优化 看上级,如果有为true的, 就不能在同一列下为true
function set_arr_val(arr, depth, i) {
  let _a = arr[depth];
  let true_index = _a.indexOf(true);
  if (true_index == -1) {
    _a[0] = true;
  } else {
    _a[true_index] = false;
    _a[i] = true;
  }
}

function is_valid(arr) {
  // 行 数据就是按照行来遍历的, 因此不用检查
  // 列
  for (let col = 0; col < arr.length; col++) {
    let count = 0;
    for (let row = 0; row < arr.length; row++) {
      if (arr[row][col]) {
        count++;
      }
    }
    if (count > 1) {
      return false;
    }
  }
  // 对角线
  // 找到点 一个点可能有1条或2条对角线

  return true;
}

function recur(result, arr, depth, MAX) {
  if (depth > MAX) {
    return;
  }
  // 说明这是最下一层, 不能再加1了
  for (let i = 0; i <= MAX; i++) {
    let arr_rep = arr.slice();
    set_arr_val(arr_rep, depth, i);
    if (depth == MAX && is_valid(arr_rep)) {
      result.push(1);
    }
    recur(result, arr_rep, depth + 1, MAX);
  }

  // 如果不是最后一层
}

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  // n * n 的棋盘
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(new Array(n).fill(false));
  }
  const result = [];
  recur(result, arr, 0, n - 1);
  console.log(result.length);
  return result;
  // 每一行都必须 有且仅有一个
  // 遍历所有情况
  // 记录状态
  // 判断是否valid
};

solveNQueens(4);
