// https://leetcode-cn.com/problems/unique-paths/

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths_table = function (m, n) {
  const rows_num = new Array(m).fill(1);

  for (let row = 1; row < n; row++) {
    for (let col = 1; col < m; col++) {
      rows_num[col] = rows_num[col - 1] + rows_num[col];
    }
  }

  return rows_num[m - 1];
};

var uniquePaths = function (m, n) {
  const memo = new Map();
  return recur_c(m, n);
  function recur_c(row, col) {
    if (col == 1 || row == 1) {
      return 1;
    }
    const key = `${row}-${col}`;
    if (memo.has(key)) {
      return memo.get(key);
    }
    const result = recur_c(row - 1, col) + recur_c(row, col - 1);
    memo.set(key, result);
    return result;
  }
};

uniquePaths(3, 2);
