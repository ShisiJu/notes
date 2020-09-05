// 二叉树的遍历
class Node {
  constructor(val = null, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  isLeaf() {
    return this.left == null && this.right == null;
  }
}

class BTree {
  constructor(array) {
    this.array = array;
    this.root = null;
    this.index = 0;
  }

  isNullSymbol(val) {
    return val == "#" || !val;
  }

  // 递归先序遍历
  createByPreOrder() {
    this.root = new Node();
    this.createByPreOrderRecursive(this.root);
    this.index = 0;
  }

  nodeOrNull(val) {
    if (this.isNullSymbol(val)) {
      return null;
    }
    return new Node();
  }

  createByPreOrderRecursive(node) {
    const val = this.array[this.index];
    if (this.isNullSymbol(val)) {
      this.index++;
      return;
    }
    this.index++;
    node.val = val;
    // this.index 会随着递归的调用, 一直叠加
    node.left = this.nodeOrNull(this.array[this.index]);
    this.createByPreOrderRecursive(node.left);
    node.right = this.nodeOrNull(this.array[this.index]);
    this.createByPreOrderRecursive(node.right);
  }

  // 最大深度
  // https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/
  maxDepth() {
    // return this.maxDepthRecursive(this.root)
    return this.maxDepthIterate(this.root);
  }

  // 解法1: 先序递归 深度优先
  maxDepthRecursive(node) {
    if (!node) {
      return 0;
    }
    if (node.isLeaf()) {
      return 1;
    }
    let leftMax = this.maxDepthRecursive(node.left);
    let rightMax = this.maxDepthRecursive(node.right);
    return Math.max(leftMax, rightMax) + 1;
  }

  // 解法2: 层序遍历 广度优先
  maxDepthIterate(node) {
    if (node == null) {
      return 0;
    }
    let queue = [];
    let depth = 0;
    queue.unshift(node);
    while (queue.length != 0) {
      let size = queue.length;
      while (size > 0) {
        size--;
        const tempNode = queue.shift();
        if (tempNode.left) {
          queue.push(tempNode.left);
        }
        if (tempNode.right) {
          queue.push(tempNode.right);
        }
      }
      depth++;
    }
    return depth;
  }
}

// https://leetcode-cn.com/problems/same-tree/submissions/
// 判断两棵树是否相同
BTree.prototype.isSameTree = function (bt1, bt2) {
  // 如果说两个数一样, 那么它们在遍历时, 顺序和值都应该一一致的
  if (bt1 == null && bt2 == null) {
    return true;
  }
  if (bt1 == null || bt2 == null) {
    return false;
  }
  if (bt1.val != bt2.val) {
    return false;
  }
  return (
    BTree.isSameTree(bt1.left, bt2.left) &&
    BTree.isSameTree(bt1.right, bt2.right)
  );
};

const bt = new BTree("AB##CD##E##".split(""));
bt.createByPreOrder();
console.log(bt.root);
console.log(bt.maxDepth());
