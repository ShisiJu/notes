// https://leetcode-cn.com/problems/basic-calculator/
// 224. 基本计算器

function isNumber(chr) {
  let n = Number(chr)
  if (isNaN(n)) {
    return false
  }
  return true
}


function handleAddOrSub(num, opt, chr) {
  let isPush = opt[opt.length - 1] == '('
  if (isPush) {
    opt.push(chr)
    return
  }

  handleCal(num, chr)
}

function handleCal(num, chr) {
  let n2 = num.pop()
  let n1 = num.pop()
  if (chr == '-') {
    num.push(n1 - n2)
  }
  if (chr == '+') {
    num.push(n1 + n2)
  }
}

function handle(num, opt, chr) {
  if (chr == '(') {
    opt.push(chr)
    return
  }
  if (chr == ')') {
    while (opt.length > 0) {
      let popChr = opt.pop()
      if (popChr == '(') {
        return
      }
      handleCal(num, popChr)
    }
  }
  if (opt[opt.length - 1] == '(') {
    opt.push(chr)
    return
  }
  handleCal(num, opt.pop())
  opt.push(chr)
}

/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
  let expr = s.replace(' ', '')
  let opt = []
  let num = []

  for (let i = 0; i < expr.length; i++) {
    let chr = expr[i]
    if (isNumber(chr)) {
      num.push(Number(chr))
      continue
    }
    handle(num, opt, chr)
  }

  while (opt.length != 0) {
    handleCal(num, opt.pop())
  }
  return num[0]
};


calculate("(1+(4+5+2)-3)+(6+8)")