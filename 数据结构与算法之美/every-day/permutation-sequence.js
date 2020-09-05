// https://leetcode-cn.com/problems/permutation-sequence/
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */

function factorial(n) {
  if (n == 0) {
    return 1;
  }
  let result = 1;
  while (n > 1) {
    result = result * n;
    n--;
  }
  return result;
}

var getPermutation = function (n, k) {
  let array = [];
  for (let i = 1; i < n + 1; i++) {
    array[i] = i;
  }
  let str = "";
  while (array.length != 0) {
    if (array.length == 1) {
      if (array[0]) {
        str += array[0];
      }
      break;
    }
    let n_1_fa = factorial(n - 1);
    let m = Math.floor((k - 1) / n_1_fa);
    array.sort();
    k = k % n_1_fa;
    n--;
    if (array[m]) {
      str += array[m];
    }
    array.splice(m, 1);
    // 删除m所在的索引
  }
  return str;
};

let result = getPermutation(1, 1);
console.log(result);
