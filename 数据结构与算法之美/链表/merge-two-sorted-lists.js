/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

var l1 = new ListNode(1, null)
var l2 = new ListNode(1, null)

var mergeTwoLists = function (l1, l2) {
  let sorted = new ListNode()
  let head = sorted
  while (l1 != null || l2 != null) {
    // l1 小
    if (compareSmall(l1, l2)) {
      sorted.next = l1
      l1 = l1.next
    } else {
      sorted.next = l2
      l2 = l2.next
    }
    sorted = sorted.next
  }

  return head.next
};

function compareSmall(l1, l2) {
  if (l1 == null ) {
    return false
  }

  if (l2 == null ) {
    return true
  }

  if(l1.val <= l2.val){
    return true
  }

  return false
}



mergeTwoLists(l1, l2)