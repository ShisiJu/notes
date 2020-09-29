// https://leetcode-cn.com/problems/kth-largest-element-in-an-array/
// 215. 数组中的第K个最大元素


let {SmallHeap} = require("./base-heap")

// 小顶堆
// 内部计数, 只存k个 返回 堆顶
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

var findKthLargest = function (nums, k) {
  let count = 0;
  let sh = new SmallHeap();
  for (let i = 0; i < nums.length; i++) {
    let val = nums[i];
    // 如果堆没有满直接插入
    if (count < k) {
      count++;
      sh.add(val);
    } else {
      // 堆满了, 且当前值大于堆顶, 则移除堆顶
      // 并将当前值插入堆
      if(val > sh.top()){
        sh.removeTop();
        sh.add(val);
      }
    }
  }
  return sh.top()

};

// [3,2,1,5,6,4]
// 2
// let result = findKthLargest([3,2,1,5,6,4] , 2)
let result = findKthLargest([-1,2,0] , 1)

console.log(result);
