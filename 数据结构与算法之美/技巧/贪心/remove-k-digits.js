// https://leetcode-cn.com/problems/remove-k-digits/

function max_num_index(num) {
  let char_num = -1;
  let result = -1;

  for (let index = 0; index < num.length; index++) {
    if (num[index] >= char_num) {
      char_num = num[index];
      result++;
    } else {
      break;
    }
  }
  return result;
}

function removeLeftZero(num) {
  let left = -1;
  for (let index = 0; index < num.length; index++) {
    const element = num[index];
    if (element == "0") {
      left++;
    } else {
      break;
    }
  }

  if (left >= 0) {
    num = num.slice(left + 1, num.length);
  }
  return num;
}

var removeKdigits = function (num, k) {
  for (let index = 0; index < k; index++) {
    if (k - index >= num.length) {
      return "0";
    }
    let max_index = max_num_index(num);
    num = num.slice(0, max_index) + num.slice(max_index + 1, num.length);
    num = removeLeftZero(num);
    // 如果字符串非常地长, 会Number失效 Infinity
  }
  if (num == "") {
    return "0";
  }
  return num;
};
