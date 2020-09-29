// 大顶堆 比较函数
var is_not_empty = function (val) {
  return val !== null && val !== undefined;
};

var is_empty = function (val) {
  return !is_not_empty(val);
};

// 这里不能直接用 a , !a 这种形式
// 因为 a=0 时, a == false
var compareBigger = function (a, b) {
  // a,b 都不存在
  if (is_empty(a) && is_empty(b)) {
    return 0;
  }
  if (is_not_empty(a) && is_empty(b)) {
    return 1;
  }
  if (is_empty(a) && is_not_empty(b)) {
    return -1;
  }

  return a - b;
};

var compareSmaller = function (a, b) {
  // a,b 都不存在
  if (is_empty(a) && is_empty(b)) {
    return 0;
  }
  if (is_not_empty(a) && is_empty(b)) {
    return 1;
  }
  if (is_empty(a) && is_not_empty(b)) {
    return -1;
  }

  return b - a;
};

// 应该传入比较函数
class BaseHeap {
  constructor(compare) {
    this.array = [null];
    this.compare = compare;
  }

  size() {
    // 第0个元素是占位的 , 并没有实际意义
    return this.array.length - 1;
  }

  swap(i, j) {
    if (i == j) {
      return;
    }

    let temp = this.array[i];
    this.array[i] = this.array[j];
    this.array[j] = temp;
  }

  add(val) {
    this.array.push(val);
    let currentIndex = this.array.length - 1;
    // 从下到上遍历
    while (currentIndex != 1) {
      let parentIndex = Math.floor(currentIndex / 2);
      let parentValue = this.array[parentIndex];
      let currentValue = this.array[currentIndex];
      if (this.compare(currentValue, parentValue) > 0) {
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  firstLeafIndex() {
    return Math.floor((this.array.length - 1) / 2) + 1;
  }

  removeTop() {
    // 删除最后一个元素, 并把最后一个元素的值替换堆顶
    let tailIndex = this.array.length - 1;
    const originHead = this.array[1];
    const tailValue = this.array[tailIndex];
    this.array.splice(tailIndex, 1);
    // 如果只剩堆顶时, 直接return
    if (tailIndex === 1) {
      return originHead;
    }
    this.array[1] = tailValue;
    let currentIndex = 1;
    const leafIndex = this.firstLeafIndex();
    // 从上到小堆化
    // 直到叶子节点 ()
    while (currentIndex < leafIndex) {
      let currentValue = this.array[currentIndex];
      let leftIndex = currentIndex * 2;
      let rightIndex = currentIndex * 2 + 1;
      let leftValue = this.array[leftIndex];
      let rightValue = this.array[rightIndex];
      // 不是叶子节点, 不存在左右叶子没有值的情况
      if (
        this.compare(leftValue, rightValue) > -1 &&
        this.compare(leftValue, currentValue) > 0
      ) {
        this.swap(currentIndex, leftIndex);
        currentIndex = leftIndex;
      } else if (
        this.compare(rightValue, leftValue) > -1 &&
        this.compare(rightValue, currentValue) > 0
      ) {
        this.swap(currentIndex, rightIndex);
        currentIndex = rightIndex;
      } else {
        break;
      }
    }

    return originHead;
  }

  top() {
    return this.array[1];
  }

  tail() {
    return this.array[this.array.length - 1];
  }
}

const BigHeap = function () {
  return new BaseHeap(compareBigger);
};

const SmallHeap = function () {
  return new BaseHeap(compareSmaller);
};

const sh = new SmallHeap();

sh.add(1);
sh.add(10);
sh.add(8);
sh.add(2);
sh.add(7);
sh.removeTop();

console.log(sh);

module.exports = { BaseHeap, BigHeap, SmallHeap };
