// https://leetcode-cn.com/problems/minimum-path-sum/

/**
 * @param {number[][]} grid
 * @return {number}
 */

//  状态表
var minPathSum_1 = function (grid) {
  const row_len = grid.length;
  const col_len = grid[0].length;
  const row_start_array = new Array(row_len);
  row_start_array[0] = grid[0][0];
  for (let i = 1; i < grid[0].length; i++) {
    row_start_array[i] = grid[0][i] + row_start_array[i - 1];
  }

  for (let row = 1; row < row_len; row++) {
    row_start_array[0] += grid[row][0];
    for (let col = 1; col < col_len; col++) {
      const cur = grid[row][col];
      let min_val =
        cur + Math.min(row_start_array[col - 1], row_start_array[col]);

      row_start_array[col] = min_val;
    }
  }

  return row_start_array[col_len - 1];
};

// 递归公式
var minPathSum = function (grid) {
  const row_len = grid.length;
  const col_len = grid[0].length;
  const memo = new Map();
  return recur_c(row_len, col_len, grid[row_len - 1][col_len - 1]);
  function recur_c(row, col) {
    // 递归的结束条件
    if (row == 0 && col == 0) {
      memo.set("0-0", grid[0][0]);
      return grid[0][0];
    }
    // 当走到边界时; 要特殊处理
    let last_row;
    let last_col;
    if (row < 0) {
      last_row = Number.MAX_VALUE;
    }
    if (col < 0) {
      last_col = Number.MAX_VALUE;
    }

    last_row = recur_c(row - 1, col);
    last_col = recur_c(row, col - 1);

    const result = grid[row][col] + Math.min(last_col, last_row);
    return result;
  }
};

const grid = [
  [1, 4, 8, 6, 2, 2, 1, 7],
  [4, 7, 3, 1, 4, 5, 5, 1],
  [8, 8, 2, 1, 1, 8, 0, 1],
  [8, 9, 2, 9, 8, 0, 8, 9],
  [5, 7, 5, 7, 1, 8, 5, 5],
  [7, 0, 9, 4, 5, 6, 5, 6],
  [4, 9, 9, 7, 9, 1, 9, 0],
];

// 47
minPathSum(grid);
