// https://leetcode-cn.com/problems/baseball-game/
// 682. 棒球比赛
// 1.整数（一轮的得分）：直接表示您在本轮中获得的积分数。
// 2. "+"（一轮的得分）：表示本轮获得的得分是前两轮有效 回合得分的总和。
// 3. "D"（一轮的得分）：表示本轮获得的得分是前一轮有效 回合得分的两倍。
// 4. "C"（一个操作，这不是一个回合的分数）：表示您获得的最后一个有效 回合的分数是无效的，应该被移除。

function getNumber(num) {
  if (!num) {
    return 0
  }
  return Number(num)
}

function operate(stack, op) {
  if (op == '+') {
    const addNum = getNumber(stack[stack.length - 1]) + getNumber(stack[stack.length - 2])
    stack.push(addNum)
    return
  }

  if (op == 'D') {
    stack.push(stack[stack.length - 1] * 2)
    return
  }

  if (op == 'C') {
    stack.pop()
    return
  }

}


/**
 * @param {string[]} ops
 * @return {number}
 */
var calPoints = function (ops) {
  let stack = []
  let sum = 0

  ops.forEach(o => {
    // 不是数字
    if (isNaN(Number(o))) {
      operate(stack, o)
    } else {
      // 是数字
      stack.push(getNumber(o))
    }
  })

  sum = stack.reduce((total, num) => {
    return total + num
  })

  return sum
};


let testCase = ["5", "2", "C", "D", "+"]
calPoints(testCase)

