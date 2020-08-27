// 开放寻址法
// 线性探测（Linear Probing）。

class Node {
  constructor(value) {
    this.value = value
    this.deleted = false
  }
}
class HashMap {
  constructor(capacity) {
    this.capacity = capacity
    this.array = []
    this.count = 0
    this.loadFactor = 0.5
  }

  overCapacity() {
    return this.loadFactor <= this.count / this.capacity
  }

  // 假设key都是数字
  index(key) {
    return key % this.capacity
  }

  add(key, value) {
    const hashIndex = this.index()
    if (this.overCapacity()) {

    }

    if (this.array[hashIndex] == null) {
      this.array[hashIndex] = new Node(value)
    } else {
      // while(availableIndex)

    }


  }
}