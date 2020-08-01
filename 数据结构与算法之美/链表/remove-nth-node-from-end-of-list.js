function ListNode(val, next) {
  this.val = val;
  this.next = next;
}


// 找到要删除节点的前一个节点
function findNthBeforeNodeFromEnd(head, n) {
  let cur = 1
  let nthNode = head
  while (head != null) {
    if (cur > n) {
      nthNode = nthNode.next
    }
    head = head.next
    cur++
  }
  return nthNode
}

function deleteNode(head, delNode) {
  let result = head
  while (head != null) {
    if (head.next == delNode) {
      head.next = delNode.next
      return result
    }

    head = head.next
  }
}

var removeNthFromEnd = function (head, n) {
  // 给head 加一个pre , 为了方便删除
  let pre = new ListNode(-1, head)
  // 先找到倒数第n个的前一个节点
  let delNode = findNthBeforeNodeFromEnd(head, n)
  // 删除这个
  deleteNode(pre, delNode)
  return pre.next
};


let testNode = new ListNode(1, new ListNode(2, null))
removeNthFromEnd(testNode, 2)