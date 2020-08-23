// 求一个数的平方根 求精确到小数点后 6 位。
// 介值定理
// 牛顿

function isOK(n, sqrtN) {
  return Math.abs(n - sqrtN * sqrtN) <= 0.0000001
}

// 负数情况
function compare(n, sqrtN) {
  if (n < 1) {
    return (n - sqrtN * sqrtN) <= 0
  }
  return (n - sqrtN * sqrtN) >= 0
}

function calcSqrt(n, res, sqrtN) {
  if (isOK(n, sqrtN)) {
    return sqrtN
  }
  let mid = (res + sqrtN) / 2
  if (compare(n, mid)) {
    return calcSqrt(n, res, mid)
  } else {
    return calcSqrt(n, mid, sqrtN)
  }
}

function sqrt(n) {
  // 负数不能开平方
  if (n <= 0) {
    return 0
  }

  return calcSqrt(n, n, 1)
}

console.log(sqrt(-1));
console.log(sqrt(1));
console.log(sqrt(4));
console.log(sqrt(0.01));


