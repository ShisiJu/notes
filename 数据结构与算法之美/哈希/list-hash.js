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

class ListHash {
  constructor(capacity = 4, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.array = []
    this.count = 0
  }

  isFull() {
    return this.loadFactor <= this.count / this.capacity
  }

  size() {
    return this.count
  }

  each(fn) {
    this.array.forEach(dummy => {
      let head = null
      // 头结点是 dummy 节点
      if (dummy != null) {
        head = dummy.next
      }
      while (head != null) {
        fn({ key: head.key, value: head.value })
        head = head.next
      }
    })
  }

  expansion() {
    this.capacity = this.capacity * 2
    let data = []
    this.each(entry => {
      data.push(entry)
    })
    this.array = []
    this.count = 0
    data.forEach(entry => {
      this.add(entry.key, entry.value)
    })
  }

  add(key, value) {
    // 扩容处理
    if (this.isFull()) {
      this.expansion()
    }
    this.count++
    const hashIndex = this.index(key)
    const newNode = new Node(key, value, null)

    if (this.array[hashIndex] == null) {
      this.array[hashIndex] = new Node(null, null, newNode)
      return
    }
    this.delete(key)
    let dummy = this.array[hashIndex]
    newNode.next = dummy.next
    dummy.next = newNode
  }

  index(key) {
    return key.hashCode() % this.capacity
  }

  keyHead(key) {
    return this.array[this.index(key)]
  }

  has(key) {
    let dummy = this.keyHead(key)
    if (dummy == null) {
      return false
    }
    let head = dummy.next
    while (head != null) {
      if (head.key == key) {
        return true
      }
      head = head.next
    }
    return false
  }

  delete(key) {
    let dummy = this.keyHead(key)
    if (dummy == null) {
      return false
    }

    while (dummy.next != null) {
      if (dummy.next.key == key) {
        dummy.next = dummy.next.next
        this.count--
        return true
      }
      dummy = dummy.next
    }
    return false
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
console.assert(hash.add('1jl', 1) === undefined, true)
console.assert(hash.add('k2jl', 1) === undefined, true)
console.assert(hash.delete('k2jl') === true, '删除存在的key失败')
console.assert(hash.size() === 2, `size应该为2, 实际为 ${hash.size()}`)
console.assert(hash.add('k3jl', 2131) === undefined, true)
console.assert(hash.add('k4l', 1312) === undefined, true)
console.assert(hash.size() === 4, `size应该为4, 实际为 ${hash.size()}`)



