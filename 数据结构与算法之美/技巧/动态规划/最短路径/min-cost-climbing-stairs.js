// https://leetcode-cn.com/problems/min-cost-climbing-stairs/
/**
 * @param {number[]} cost
 * @return {number}
 */

//  这里也可以从后往前
var minCostClimbingStairs = function (cost) {
  const len = cost.length;
  let v1 = cost[0];
  let v2 = cost[1];
  for (let i = 2; i < len; i++) {
    let temp = v2;
    v2 = cost[i] + Math.min(v1, v2);
    v1 = temp;
  }

  return Math.min(v1, v2);
};

// f(n) = min(f(n-1) + cost[n-1], f(n-2) + cost[n-2])
// 如果没有备忘录则会超时了
var minCostClimbingStairs = function (cost) {
  // memo 备忘录
  const record_map = new Map();
  return recur_c(cost.length);

  function recur_c(index) {
    if (record_map.has(index)) {
      return record_map.get(index);
    }
    if (index < 2) {
      return 0;
    }

    let v1 = cost[index - 1] + recur_c(index - 1);
    let v2 = cost[index - 2] + recur_c(index - 2);
    const result = Math.min(v1, v2);
    record_map.set(index, result);
    return result;
  }
};

minCostClimbingStairs([10, 15, 20]);
