// https://leetcode-cn.com/problems/backspace-string-compare/
// 844. 比较含退格的字符串
function getText(str) {
  let arr = []
  for (let i = 0; i < str.length; i++) {
    let char = str[i]
    if (char != '#') {
      arr.push(char)
    } else {
      arr.pop()
    }
  }
  return arr.join('')
}



/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
var backspaceCompare = function (S, T) {
  let s = getText(S)
  let t = getText(T)
  return s == t
};


backspaceCompare('')