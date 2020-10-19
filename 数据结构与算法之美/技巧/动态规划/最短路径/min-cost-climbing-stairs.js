// https://leetcode-cn.com/problems/min-cost-climbing-stairs/
/**
 * @param {number[]} cost
 * @return {number}
 */

var minCostClimbingStairs_dynamic = function (cost) {
  const len = cost.length;
  const result_array = new Array().fill(0);
  result_array[0] = cost[0];
  result_array[1] = cost[1];
  for (let i = 2; i < len; i++) {
    result_array[i] =
      cost[i] + Math.min(result_array[i - 1], result_array[i - 2]);
  }

  return Math.min(result_array[len - 1], result_array[len - 2]);
};

var minCostClimbingStairs = function (cost) {
  return recur_c(cost.length, 0);

  function recur_c(index, val) {
    if (index < 2) {
      return val + cost[index];
    }

    const v1 = recur_c(index - 1, val);
    const v2 = recur_c(index - 2, val);
    return val + Math.min(v1, v2);
  }
};
