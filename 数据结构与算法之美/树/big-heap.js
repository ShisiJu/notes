// 大顶堆

class BigHeap {
  constructor() {
    this.array = [null];
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
      if (currentValue >= parentValue) {
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  removeTop() {
    // 删除最后一个元素, 并把最后一个元素的值替换堆顶
    let tailIndex = this.array.length - 1;
    const tailValue = this.array[tailIndex];
    this.array.splice(tailIndex, 1);
    const originHead = this.array[1];
    this.array[1] = tailValue;
    // 从上到小堆化
    let currentIndex = 1;
    // 直到
    while (!!this.array[currentIndex]) {
      let currentValue = this.array[currentIndex];
      let leftIndex = currentIndex * 2;
      let rightIndex = currentIndex * 2 + 1;
      let leftValue = this.array[leftIndex];
      let rightValue = this.array[rightIndex];
      if (leftValue && leftValue >= currentValue && leftValue >= rightValue) {
        this.swap(currentIndex, leftIndex);
        currentIndex = leftIndex;
      } else if (
        rightValue &&
        rightValue >= currentValue &&
        rightValue >= leftValue
      ) {
        this.swap(currentIndex, rightIndex);
        currentIndex = rightIndex;
      } else {
        break;
      }
    }

    return originHead;
  }
}

let h = new BigHeap();

h.add(7);
h.add(9);
h.add(3);
h.add(11);

h.removeTop();
console.log(h);
