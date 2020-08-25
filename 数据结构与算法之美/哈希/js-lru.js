// https://leetcode-cn.com/problems/lru-cache-lcci/
// https://github.com/rsms/js-lru
// 在极客时间上, hnext 对应自己要维护的 hash
// 基于链表法解决冲突的散列表中链表的next指针
// 冲突是hash表内部解决的，
// 这里左边的不应该是hash表，而应该是数组才对。如果做左边是hash表，不需要这个hnext结构
class Node {
  constructor(pre, next, value) {
    this.pre = pre
    this.next = next
    this.value = value
    this.hmap = null
  }

  setNext(value) {
    this.next = value
  }

  setHmap(value) {
    this.hmap = value
  }
}


class LRUList {
  constructor(capacity = 16) {
    this.capacity = capacity
    this.count = 0
    this.map = new Map()
    this.dummy = new Node(null, null, null)
    this.tail = this.dummy
  }

  forEach(fn) {
    let node = this.dummy.next
    while (node != null) {
      fn(node)
      node = node.next
    }
  }

  get(key) {
    return this.map.get(key)
  }

  isFull() {
    return this.count >= this.capacity
  }

  isEmpty() {
    return this.count == 0
  }

  removeByKey(key) {
    let node = this.map.get(key)
    let pre = node.pre
    let next = node.next
    pre.next = next
    if (next != null) {
      next.pre = pre
    } else {
      this.tail = pre
    }
    this.map.delete(key)
    this.count--
  }

  removeOldest() {
    this.count--
    let n = this.dummy.next.next
    this.dummy.next = n
    n.pre = this.dummy
  }

  add(key, value) {

    if (this.map.has(key)) {
      this.removeByKey(key)
    }

    if (this.isFull()) {
      this.removeOldest()
    }

    // 直接加
    this.count++
    let newNode = new Node(this.tail, null, value)
    this.map.set(key, newNode)
    this.tail.setNext(newNode)
    this.tail = this.tail.next
  }
}


let lru = new LRUList()
lru.add('jkjk', 123)
lru.add('jk1jk', 13123)
lru.add('jkj2k', 132123)
lru.add('jk33jk', '1fs23')
lru.add('jkjk', 'fjdklsjfk')


lru.forEach(el => {
  console.log(el);
})

