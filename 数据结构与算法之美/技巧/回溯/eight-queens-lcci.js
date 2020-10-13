// https://leetcode-cn.com/problems/eight-queens-lcci/

function set_arr_val(arr, depth, i) {
  const _a = arr[depth];
  _a[i] = true;
  if (i > 0) {
    _a[i - 1] = false;
  }
}

function check_cross(p1, p2) {
  if (Math.abs(p1[0] - p2[0]) === Math.abs(p1[1] - p2[1])) {
    return true;
  }
  return false;
}

function get_points(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const _a = arr[i];
    let col = _a.indexOf(true);
    result.push([i, col]);
  }

  return result;
}

function is_valid(arr) {
  // 对角线
  // 找到点 一个点可能有1条或2条对角线
  // 四个点的坐标
  const points = get_points(arr);
  for (let i = 0; i < points.length; i++) {
    let p1 = points[i];
    for (let j = i + 1; j < points.length; j++) {
      let p2 = points[j];
      if (check_cross(p1, p2)) {
        return false;
      }
    }
  }
  return true;
}

// 转换要打印的输出
function to_Q_array(arr) {
  let result = [];
  arr.forEach((a) => {
    let row = "";
    a.forEach((col) => {
      if (col === true) {
        row += "Q";
      } else {
        row += ".";
      }
    });
    result.push(row);
  });

  return result;
}

function col_valid(arr) {
  // 列
  for (let col = 0; col < arr.length; col++) {
    let count = 0;
    for (let row = 0; row < arr.length; row++) {
      if (arr[row][col]) {
        count++;
        if (count > 1) {
          return false;
        }
      }
    }
  }
  return true;
}
function recur(result, arr, depth, MAX) {
  if (depth > MAX) {
    return;
  }
  // 说明这是最下一层, 不能再加1了
  for (let i = 0; i <= MAX; i++) {
    let arr_rep = JSON.parse(JSON.stringify(arr));
    set_arr_val(arr_rep, depth, i);
    if (col_valid(arr_rep) == false) {
      continue;
    }
    if (depth == MAX && is_valid(arr_rep)) {
      result.push(to_Q_array(arr_rep));
    }
    recur(result, arr_rep, depth + 1, MAX);
  }
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
  return result;
};

solveNQueens(4);
