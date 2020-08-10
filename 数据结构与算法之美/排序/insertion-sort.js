function move(array, start, end) {
  for (let index = end; index > start; index--) {
    array[index] = array[index - 1]
  }
  return array
}


/**
 * 升序
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  for (let index = 1; index < nums.length; index++) {
    const element = nums[index];
    if (element < nums[index - 1]) {
      // 迁移元素 
      // 先找到要插入的位置, 从左边起第一个大于等于它的
      let insertIndex = 0
      for (let i = 0; i < index; i++) {
        if (element >= nums[i]) {
          continue
        }
        insertIndex = i
        break;
      }
      // 该位置之后的数据, 向后移动
      move(nums, insertIndex, index)
      nums[insertIndex] = element
    }
  }
  return nums
};


let arr = sortArray([1, 3, 1, 2, 9])

console.log(arr);