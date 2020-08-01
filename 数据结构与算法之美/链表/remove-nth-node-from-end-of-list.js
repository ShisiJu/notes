function ListNode(val, next) {
  this.val = val;
  this.next = next;
}


function findNthBeforeNodeFromEnd(head, n) {
  let cur = 1
  let nthNode = head
  let fast = head
  while (cur <= n) {
    cur++
    fast = fast.next
  }

  while (fast != null) {
    fast = fast.next
    nthNode = nthNode.next
  }
  return nthNode
}

function deleteNode(delNode) {
  delNode.next = delNode.next.next
}

var removeNthFromEnd = function (head, n) {
  // 给head 加一个pre , 为了方便删除
  let pre = new ListNode(-1, head)
  // 先找到倒数第n个的前一个节点
  let delNode = findNthBeforeNodeFromEnd(pre, n + 1)
  // 删除这个
  deleteNode(delNode)
  return pre.next
};


let testNode = new ListNode(1, new ListNode(2, null))
removeNthFromEnd(testNode, 2)