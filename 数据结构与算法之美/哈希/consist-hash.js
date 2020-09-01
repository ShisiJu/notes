// 一致性哈希算法
// http://www.zsythink.net/archives/1182

class Node {
  constructor(index, map) {
    this.index = index
    this.map = map
  }
}

class ConsistHash {
  constructor(nodes) {
    this.nodes = nodes
    this.ring = Math.pow(2, 32) - 1
    // 节点分布, 避免偏斜, 添加虚拟节点(映射物理节点)
    this.ringArray = []
    this.distributeNode(this.nodes, 0)
  }

  distributeNode(nodes, start = 0) {
    let length = this.nodes.length
    let step = Math.floor(this.ring / length)
    for (let index = start; index < length * 3; index++) {
      const node = this.nodes[index % length % this.ring];
      this.ringArray.push({ node: node, value: step * index })
    }
  }

  get(key) {
    // 根据key, 获取环中的index
    let ringIndex = key % this.ring
    // 根据index, 顺时针找到对应的节点
    // 使用二分查找
    let node = getNode(ringIndex)
    let value = node.get(key)
    if (value == null) {
      // 请求数据
      value = node.requestKey(key)
    }
    return value
  }

  // 难点在于 如何处理新的节点加入
  // 怎样能够让节点平均分布, 但是又不让太多缓存失效
  // 我想到的方式是 逐步变迁, 一小步一小步地移动在环上的节点
  addNode(nodes) {
    this.nodes.push(node)
    // 取一个随机数的值
    let random = Math.random() * this.ring
    this.distributeNode(nodes, random)
  }
}


