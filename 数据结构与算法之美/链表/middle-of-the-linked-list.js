// https://leetcode-cn.com/problems/middle-of-the-linked-list/


function ListNode(val, next) {
  this.val = val;
  this.next = next;
}
// 最朴素的解法
var middleNodeNormal = function (head) {
  let n = 0
  let mid = head
  while (head != null) {
    n++
    head = head.next
  }

  let midNum = n % 2 == 0 ? n / 2 : n / 2 - 1
  for (let i = 0; i < midNum; i++) {
    mid = mid.next
  }
  return mid
};




// 快慢指针
var middleNode = function (head) {
  let slow = head
  let fast = head.next
  while (fast != null) {
    slow = slow.next
    if (fast.next == null) {
      return slow
    }
    fast = fast.next.next
  }
  return slow
};

let test = new ListNode(1, new ListNode(2, null))
console.log(middleNode(test));
