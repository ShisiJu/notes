// https://leetcode-cn.com/problems/last-stone-weight/

const { BigHeap } = require("../base-heap");

//  暴力解法
var lastStoneWeight_brute_force = function (stones) {
  stones = JSON.parse(JSON.stringify(stones));
  while (stones.length > 1) {
    stones.sort((a, b) => {
      return b - a;
    });
    let x = stones.shift();
    let y = stones.shift();
    let res = Math.abs(x - y);
    stones.push(res);
  }
  let result = stones.pop();
  if (result) {
    return result;
  } else {
    return 0;
  }
};

var lastStoneWeight = function (stones) {
  // 大顶堆
  const bigHeap = new BigHeap();
  stones.forEach((s) => {
    bigHeap.add(s);
  });
  while (bigHeap.size() > 1) {
    let x = bigHeap.removeTop();
    let y = bigHeap.removeTop();
    let res = Math.abs(x - y);
    bigHeap.add(res);
  }
  return bigHeap.removeTop();
};

console.assert(lastStoneWeight([2, 2]) === 0, "");
console.assert(lastStoneWeight([2, 7, 4, 1, 8, 1]) === 1, "");
