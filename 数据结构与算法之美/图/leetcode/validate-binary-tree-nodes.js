// https://leetcode-cn.com/problems/validate-binary-tree-nodes/

/**
 * @param {number} n
 * @param {number[]} leftChild
 * @param {number[]} rightChild
 * @return {boolean}
 */

// 二叉树上有 n 个节点，按从 0 到 n - 1 编号，其中节点 i 的两个子节点分别是 leftChild[i] 和 rightChild[i]。
var validateBinaryTreeNodes = function (n, leftChild, rightChild) {
  // 先找到根节点 (有且仅有一个)
  const in_map = new Map();
  const out_map = new Map();
  for (let index = 0; index < n; index++) {
    in_map.set(index, new Set());
    out_map.set(index, new Set());
  }
  leftChild.forEach((node, index) => {
    if (node != -1) {
      out_map.get(index).add(node);
      in_map.get(node).add(index);
    }
  });

  rightChild.forEach((node, index) => {
    if (node != -1) {
      out_map.get(index).add(node);
      in_map.get(node).add(index);
    }
  });

  let count_0 = 0;
  let count_1 = 0;
  let no_conflict = true;
  in_map.forEach((set, key) => {
    if (no_conflict == false) {
      return;
    }
    if (set.size == 0) {
      count_0++;
    } else if (set.size == 1) {
      count_1++;
    }

    set.forEach((val, in_key) => {
      if (in_map.get(val).has(key)) {
        no_conflict = false;
        return;
      }
    });
  });

  return no_conflict && count_0 == 1 && count_1 == n - 1;
};

// validateBinaryTreeNodes(4, [1, -1, 3, -1], [2, -1, -1, -1]);

// validateBinaryTreeNodes(4, [1, -1, 3, -1], [2, 3, -1, -1]);
// 只考虑入度和出度是有问题的，还是要通过dfs(root)判断树的联通性

validateBinaryTreeNodes(4, [1, 0, 3, -1], [-1, -1, -1, -1]);
