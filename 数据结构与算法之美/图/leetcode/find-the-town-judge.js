// https://leetcode-cn.com/problems/find-the-town-judge/

/**
 * @param {number} N
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function (N, trust) {
  const out_map = new Map();
  const in_map = new Map();
  for (let index = 1; index <= N; index++) {
    out_map.set(index, new Set());
    in_map.set(index, new Set());
  }

  // [1,2] 表示 1信任2
  trust.forEach((array) => {
    let out_set = out_map.get(array[0]);
    out_set.add(array[1]);

    let in_set = in_map.get(array[1]);
    in_set.add(array[0]);
  });

  const result_array = [];

  for (let index = 1; index <= N; index++) {
    let out_set = out_map.get(index);
    let in_set = in_map.get(index);
    if (in_set.size === N - 1 && out_set.size === 0) {
      result_array.push(index);
    }
  }

  // 法官只能有一个
  if (result_array.length != 1) {
    return -1;
  } else {
    return result_array[0];
  }
};

// 这样我们无需同时维护入度和出度的信息，转而维护入读和出度的差值即可

findJudge(2, [[1, 2]]);
