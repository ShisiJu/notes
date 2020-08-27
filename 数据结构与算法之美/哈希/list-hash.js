// 链表法
// 字符串
// js hashing function
// 负数取模
// 处会报错，缘由是hashAddress = data % hashLength得到的结果是负数。为此，
// 需要加上语句 if(hashAddress < 0) hashAddress +=hashLength; 可以有效解决该问题。

// 字符串hashCode, 可能是负数
Object.defineProperty(String.prototype, 'hashCode', {
  value: function() {
    var hash = 0, i, chr;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }
});


// Test
class ListHash {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
  }

  add() {}

  delete() {}

  get() {}

  hash() {}

  hash(key) {
    
  }
}
