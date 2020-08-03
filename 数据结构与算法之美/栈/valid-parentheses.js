// 20. 有效的括号
// https://leetcode-cn.com/problems/valid-parentheses/submissions/
function isLeft(char) {
  return ['{', '[', '('].includes(char)
}

function isRelated(left, right) {
  const map = new Map()
  map.set('{', '}')
  map.set('[', ']')
  map.set('(', ')')
  return map.get(left) == right
}
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let stack = []
  for (let i = 0; i < s.length; i++) {
    let char = s[i]
    if (isLeft(char)) {
      stack.push(char)
      continue
    }
    if (isRelated(stack.pop(), char)) {
      continue
    }
    return false
  }
  return stack.length == 0
};


isValid('{}')