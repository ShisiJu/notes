// 二叉树的遍历
class Node {
  constructor(val = null, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BTree {
  constructor(array) {
    this.array = array;
    this.root = new Node();
    this.index = 0
  }

  isNullSymbol(val) {
    return val == '#' || !val
  }

  // 根据先序遍历
  createByPreOrder() {
    this.createByPreOrderRec(this.root);
    this.index = 0
  }

  nodeOrNull(val) {
    if (this.isNullSymbol(val)) {
      return null;
    }
    return new Node()
  }

  createByPreOrderRec(node) {
    const val = this.array[this.index]
    if (this.isNullSymbol(val)) {
      this.index++
      return;
    }
    this.index++
    node.val = val
    // this.index 会随着递归的调用, 一直叠加
    node.left = this.nodeOrNull(this.array[this.index])
    this.createByPreOrderRec(node.left);
    node.right = this.nodeOrNull(this.array[this.index])
    this.createByPreOrderRec(node.right);
  }
}

const bt = new BTree("AB##CD##E##".split(""));
bt.createByPreOrder();

console.log(bt.root)
