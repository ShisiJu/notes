class Node {
  constructor(val = null) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.parent = null;
    // 为了处理相同val, 维护一个链表
    this.next = null;
  }

  isLeaf() {
    return this.left == null && this.right == null;
  }

  isRoot() {
    return this.parent == null;
  }
  isLeftTree() {
    if (this.isRoot()) {
      return false;
    }
    if (this.parent.left && this.parent.left.val == this.val) {
      return true;
    }
    return false;
  }

  isRightTree() {
    return !this.isRoot() && !this.isLeftTree();
  }
}

module.exports = Node;
