// https://leetcode-cn.com/problems/binary-tree-paths/

function isLeaf(node) {
  return node.left == null && node.right == null;
}

var binaryTreePaths = function (root) {
  let result = [];
  let queue = [];
  let prefix = "";
  queue.push(root);
  while (queue.length != 0) {
    node = queue.shift();
    if (node == null) {
      continue;
    }

    //TODO:  应该在一层结束后, 再更改prefix
    if (node == root) {
      prefix += node.val;
    } else {
      prefix += "->" + node.val;
    }

    if (isLeaf(node)) {
      result.push(prefix + node.val);
    }

    queue.push(node.left);
    queue.push(node.right);
  }
  return result;
};
