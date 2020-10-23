// https://leetcode-cn.com/problems/unique-paths-ii/

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  const n = obstacleGrid.length;
  const m = obstacleGrid[0].length;
  // 只要遇到障碍物就是 0
  if (obstacleGrid[0][0] == 1 || obstacleGrid[n - 1][m - 1] == 1) {
    return 0;
  }
  const rows_num = new Array(m);
  for (let f_col = 0; f_col < obstacleGrid[0].length; f_col++) {
    if (obstacleGrid[0][f_col] == 0) {
      rows_num[f_col] = 1;
    } else {
      rows_num[f_col] = 0;
    }
  }

  for (let row = 1; row < n; row++) {
    for (let col = 0; col < m; col++) {
      if (obstacleGrid[row][col] == 1) {
        rows_num[col] = 0;
        continue;
      }
      if (col != 0) {
        rows_num[col] = rows_num[col - 1] + rows_num[col];
      }
    }
  }

  return rows_num[m - 1];
};

const test = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const test2 = [[0], [1]];
const test3 = [
  [0, 0],
  [1, 0],
];

const test4 = [
  [0, 0],
  [1, 1],
  [0, 0],
];

uniquePathsWithObstacles(test4);
