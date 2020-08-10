// 622. 设计循环队列
// https://leetcode-cn.com/problems/design-circular-queue/
// 不应该通过 tail 来判断是否队满, 而应该通过 count 计数

/**
 * Initialize your data structure here. Set the size of the queue to be k.
 * @param {number} k
 */
var MyCircularQueue = function (k) {
  this.capacity = k
  this.array = []
  this.head = 0
  this.tail = 0
  this.count = 0
};

/**
 * Insert an element into the circular queue. Return true if the operation is successful. 
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function (value) {
  if (this.isFull()) {
    return false
  }
  this.array[(this.head + this.count) % this.capacity ] = value
  this.count++
  return true
};

/**
 * Delete an element from the circular queue. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function () {
  if (this.isEmpty()) {
    return false
  }
  this.array[this.head] = null
  this.head = (this.head + 1) % this.capacity
  this.count--
  return true
};

/**
 * Get the front item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Front = function () {
  // 队列为空返回 -1
  if (this.isEmpty()) {
    return -1
  }

  return this.array[this.head]
};

/**
 * Get the last item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function () {
  // 队列为空返回 -1
  if (this.isEmpty()) {
    return -1
  }

  return this.array[(this.head + this.count - 1) % this.capacity]
};

/**
 * Checks whether the circular queue is empty or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function () {
  return this.count == 0
};

/**
 * Checks whether the circular queue is full or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function () {
  return this.count == this.capacity
};

let circularQueue = new MyCircularQueue(3); // 设置长度为 3
console.log(circularQueue.enQueue(1));
console.log(circularQueue.enQueue(2));
console.log(circularQueue.enQueue(3));
console.log(circularQueue.enQueue(4));
console.log(circularQueue.Rear());
console.log(circularQueue.isFull());
console.log(circularQueue.deQueue());
console.log(circularQueue.enQueue(4));



