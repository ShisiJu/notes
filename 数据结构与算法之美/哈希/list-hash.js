// 链表法
Object.defineProperty(String.prototype, 'hashCode', {
  value: function () {
    var hash = 0, i, chr;
    for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
});

class Node {
  constructor(key, value, next = null) {
    this.value = value;
    this.key = key;
    this.next = next;
  }
}

function deleteKey(head, key) {
  while (head.next != null) {
    if (head.next.key == key) {
      head.next = head.next.next
    } else {
      head = head.next
    }
  }
  return head
}

class ListHash {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.array = []
    this.count = 0
  }

  isFull() {
    return this.loadFactor < this.count / this.capacity
  }

  size() {
    return this.count
  }

  add(key, value) {
    // 扩容处理
    const hashIndex = this.index(key)
    const newNode = new Node(key, value, null)
    this.count++
    if (this.array[hashIndex] == null) {
      this.array[hashIndex] = new Node(null, null, newNode)
      return
    }
    const tail = this.__delete(key)
    tail.next = newNode
  }

  index(key) {
    return key.hashCode() % this.capacity
  }

  keyHead(key) {
    return this.array[this.index(key)]
  }

  delete(key) {
    __delete(key)
  }

  __delete(key) {
    this.count--
    // 对应index中没有数据
    if (!this.keyHead(key)) {
      return
    }
    return deleteKey(this.keyHead(key), key)
  }

  get(key) {
    let head = this.array[this.index(key)]
    while (head != null) {
      head.key
      if (head.key === key) {
        return head.value
      }
      head = head.next
    }
    return undefined
  }


}

// 测试用例
let hash = new ListHash()

console.assert(hash.add('kjjl', 1) === undefined, true)
console.assert(hash.add('kjjl', 1) === undefined, true)
console.assert(hash.add('kjjl', 1) === undefined, true)
console.assert(hash.size() === 1, `size应该为1, 但是值却为${hash.size()}`)

