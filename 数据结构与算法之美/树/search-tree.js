const Node = require("./node");

function handleAddNode(currentNode, val) {
  while (true) {
    if (val > currentNode.val) {
      if (currentNode.right == null) {
        currentNode.right = new Node(val);
        currentNode.right.parent = currentNode;
        return;
      }
      currentNode = currentNode.right;
    } else if (val < currentNode.val) {
      if (currentNode.left == null) {
        currentNode.left = new Node(val);
        currentNode.left.parent = currentNode;
        return;
      }
      currentNode = currentNode.left;
    } else {
      // 头插, 维护一个链表存贮相同的val的node
      let tempNode = currentNode.next;
      currentNode.next = new Node(val);
      currentNode.next.next = tempNode;
      return;
    }
  }
}

// 找到节点右子树的最小节点
function findRightMinNode(node) {
  if (node == null) {
    return null;
  }

  let startNode = node.right;
  if (startNode == null) {
    return null;
  }
  while (startNode.left != null) {
    if (startNode.isLeaf()) {
      return startNode;
    }
    startNode = startNode.left;
  }
  return startNode;
}

function exchangeNodes(node1, node2) {
  // 交换val
  let temp = node1.val;
  node1.val = node2.val;
  node2.val = temp;

  // 交换next
  temp = node1.next;
  node1.next = node2.next;
  node2.next = node1.next;
}

// 二叉搜索树
// 快速地查找最大节点和最小节点、前驱节点和后继节点。
class SearchTree {
  constructor() {
    this.root = null;
  }

  // 这里没有处理相同值的处理, 仅仅是不处理
  add(val) {
    if (this.root == null) {
      this.root = new Node(val);
      return;
    }
    handleAddNode(this.root, val);
  }

  addByArray(array) {
    array.forEach((val) => {
      this.add(val);
    });
  }

  // 找不到返回null
  find(val) {
    let node = this.root;
    while (node != null) {
      if (val > node.val) {
        node = node.right;
      } else if (val < node.val) {
        node = node.left;
      } else {
        return node;
      }
    }
    return null;
  }

  // 删除比较复杂, 有三种情况要处理
  // 1. 删除的是叶子节点  直接删除即可
  // 2. 删除的节点只有一个左节点/有节点 把它的父节点和它的左/右节点接在一起
  // 3. 删除的节点有左右节点 找到右子树的最小节点, 替换删除的节点, 然后删除右子树的最小节点
  // 替换可以避免直接删除root节点

  // TODO: 如果删除的是根节点, 特殊处理一下. this.root 也要跟着变动

  delNode(node) {
    if (node == null) {
      return;
    }
    // 1. 删除的是叶子节点  直接删除即可
    if (node.isLeaf()) {
      if (this.root == node) {
        this.root = null;
        return;
      }
      let parent = node.parent;
      if (node.isLeftTree()) {
        parent.left = null;
      } else {
        parent.right = null;
      }
      return;
    }

    // 2. 删除的节点只有一个左节点/有节点 把它的父节点和它的左/右节点接在一起
    if (!(node.left && node.right)) {
      // 节点是左子树
      if (node.isLeftTree()) {
        if (node == this.root) {
          this.root = node.left;
          return;
        }
        node.parent.left = node.left;
      } else {
        // 节点是右子树
        if (node == this.root) {
          this.root = node.right;
          return;
        }
        node.parent.right = node.right;
      }
      return;
    }
    // 3. 删除的节点有左右节点 找到右子树的最小节点, 替换删除的节点, 然后删除右子树的最小节点
    // 找到右子树的最小节点
    const minNode = findRightMinNode(node);
    // 交换两个节点的val 和 next ,parent
    exchangeNodes(minNode, node);
    // 删除掉替换后的节点
    // 此时, 要删除的节点变成了原来要删除节点的右子树的最小节点(也是叶子节点, 或者right节点)
    this.delNode(minNode);
  }

  del(val) {
    // 如果找不到直接返回
    let node = this.find(val);
    this.delNode(node);
  }
}

// 添加的测试用例
let case0 = new SearchTree();
case0.addByArray([5, 5, 5, 1, 3, 7, 9]);
console.log(case0.root);
console.assert(case0.find(10) == null, "应该找不到10");
console.assert(case0.find(5), "5是第一元素");

// 删除的测试用例
let case1 = new SearchTree();
case1.add(3);
case1.del(3);
console.assert(
  case1.root == null,
  "删除仅有根节点的树, 删除完成后 root应该为null"
);

let case2 = new SearchTree();
case2.addByArray([5, 1, 6]);
case2.del(6);
console.assert(
  case2.root.left.val == 1 && case2.root.right == null,
  `删除6后, root的左边第一个val应该是5, 实际是${case2.root.left.val}, 右边第一个应该是Null, 实际是${case2.root.right}`
);

let case3 = new SearchTree();
case3.addByArray([5, 1, 6]);
case3.del(1);
console.assert(
  case3.root.left == null && case3.root.right.val == 6,
  `删除6后, root的左边第一个val应该是null, 实际是${case3.root.left}, 右边第一个应该是1, 实际是${case3.root.right}`
);

let case4 = new SearchTree();
case4.addByArray([9, 5, 4, 15, 13, 19, 21]);
case4.del(19);
console.assert(case4.find(21) != null, "删除掉19; 21应该还在");
console.assert(case4.find(19) == null, "没有删除掉19");

let case5 = new SearchTree();
case5.addByArray([9, 5, 4, 15, 13, 19, 21]);
case5.del(5);
console.assert(case5.find(4) != null, "删除掉5; 4应该还在");
console.assert(case5.find(5) == null, "没有删除掉5");

let case6 = new SearchTree();
case6.addByArray([9, 5, 4, 15, 13, 19, 16, 21]);
case6.del(19);
console.assert(case6.find(19) == null, "没有删除掉19");
console.assert(
  case6.find(21).right == null,
  "删除掉19之后, 21的right应改为null"
);

let case7 = new SearchTree();
case7.addByArray([9, 5, 4, 15, 13, 19, 16, 21]);
case7.del(15);
console.assert(case7.find(15) == null, "没有删除掉15");
console.assert(case7.find(4) != null, "");
