
// https://leetcode-cn.com/problems/reverse-linked-list/
// 单链表反转

var reverseList = function (head) {
  let p1 = null
  let p2 = null

  while (head != null) {
    p2 = head
    head = head.next
    p2.next = p1
    p1 = p2
  }
  return p2
};


// 递归
var reverseList = function (head) {
  return reverse(null, head)
};


function reverse(p1, p2) {
  if (p2 == null) {
    return p1
  }
  let cur = p2.next
  p2.next = p1
  p1 = p2
  return reverse(p2, cur)
}


// 链表中环的检测
// 两个有序的链表合并删除链表倒数第 n 个结点
// 求链表的中间结点