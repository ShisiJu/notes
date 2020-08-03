// https://leetcode-cn.com/problems/next-greater-element-i/
// 496. 下一个更大元素 I



/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {

  return nums1.map(n1 => {
    let index = nums2.findIndex(n2 => {
      return n2 == n1
    })
    for (let cur = index + 1; cur < nums2.length; cur++) {
      const curN = nums2[cur];
      if (curN > n1) {
        return curN
      }
    }
    return -1
  })
};

let nums1 = [4, 1, 2]
let nums2 = [1, 3, 4, 2]


console.log(nextGreaterElement(nums1, nums2));