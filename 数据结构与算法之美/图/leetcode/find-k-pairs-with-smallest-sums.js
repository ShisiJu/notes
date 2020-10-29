// https://leetcode-cn.com/problems/find-k-pairs-with-smallest-sums/

// 输入: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
// 输出: [1,2],[1,4],[1,6]
// 解释: 返回序列中的前 3 对数：
//      [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]

class NodeSum {
  constructor(first_index, second_index, value) {
    this.first_index = first_index;
    this.second_index = second_index;
    this.value = value;
  }
}

class SmallHeap {
  constructor() {
    this.array = [];
  }

  is_not_empty() {
    return this.array.length != 0;
  }

  size() {
    return this.array.length;
  }

  add(node) {
    this.array.push(node);
    this.sort();
  }

  poll() {
    const result = this.array[0];
    this.array = this.array.slice(1);
    return result;
  }

  sort() {
    this.array.sort((a, b) => {
      return a.value - b.value;
    });
  }
}

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
var kSmallestPairs = function (nums1, nums2, k) {
  if (nums1.length == 0 || nums2.length == 0) {
    return [];
  }

  // dijkstra
  // 需要记录两个位置, 记录两个值的和
  // 第一个 NodeSum 肯定是 0，0
  const first_node = new NodeSum(0, 0, nums1[0] + nums2[0]);
  const visited = new Array(nums1.length);
  for (let i = 0; i < visited.length; i++) {
    visited[i] = new Array(nums2.length).fill(false);
  }

  // 放入 small_heap 中
  const small_heap = new SmallHeap();
  small_heap.add(first_node);
  // 让 node_sum 分别读取下一个节点
  const result = [];
  while (small_heap.is_not_empty()) {
    let cur_node = small_heap.poll();
    if (visited[cur_node.first_index][cur_node.second_index]) {
      continue;
    }
    result.push([nums1[cur_node.first_index], nums2[cur_node.second_index]]);
    visited[cur_node.first_index][cur_node.second_index] = true;
    // result 中等于 k 就可以返回了
    if (result.length == k) {
      return result;
    }

    if (cur_node.first_index < nums1.length - 1) {
      small_heap.add(
        new NodeSum(
          cur_node.first_index + 1,
          cur_node.second_index,
          nums1[cur_node.first_index + 1] + nums2[cur_node.second_index]
        )
      );
    }

    if (cur_node.second_index < nums2.length - 1) {
      small_heap.add(
        new NodeSum(
          cur_node.first_index,
          cur_node.second_index + 1,
          nums1[cur_node.first_index] + nums2[cur_node.second_index + 1]
        )
      );
    }
  }

  return result;
};

// kSmallestPairs([1, 7, 11], [2, 4, 6], 3);

// [[1,1],[1,1],[2,1],[1,2],[1,2],[2,2],[1,3],[1,3],[2,3]]
// 最多就有9 个
// kSmallestPairs([1, 1, 2], [1, 2, 3], 10);
