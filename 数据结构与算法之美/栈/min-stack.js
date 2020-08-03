/**
 * initialize your data structure here.
 */
var MinStack = function () {
  this.stack = []
  this.minStack = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.stack.push(x)
  const len = this.minStack.length
  if (len == 0 || this.minStack[len - 1] >= x) {
    this.minStack.push(x)
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  let popValue = this.stack.pop()
  if (this.minStack[this.minStack.length - 1] == popValue) {
    this.minStack.pop()
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.minStack[this.minStack.length - 1]
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */