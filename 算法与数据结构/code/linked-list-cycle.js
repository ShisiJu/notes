// 141. 环形链表
// https://leetcode-cn.com/problems/linked-list-cycle
var hasCycle = function(head) {
  let nodeSet = new Set()
  while(head!=null){
      if(nodeSet.has(head)){
          return true
      }
      nodeSet.add(head)
      head = head.next
  }
  return false
};