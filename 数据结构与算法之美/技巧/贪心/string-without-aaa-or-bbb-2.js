// https://leetcode-cn.com/problems/string-without-aaa-or-bbb/

/**
 * @param {number} A
 * @param {number} B
 * @return {string}
 */

function check_valid(a, b) {
  let max = Math.max(a, b);
  let min = Math.min(a, b);

  return min >= 0 && min <= max && max <= 2 * min + 2;
}

function add_char(count_a, count_b) {
  let result = "";
  let flag = "";

  while (!(count_a <= 0 && count_b <= 0)) {
    if (check_valid(count_a - 2, count_b) && flag != "a" && flag != "aa") {
      result += "aa";
      flag = "aa";
      count_a -= 2;
    } else if (check_valid(count_a - 1, count_b) && flag != "aa") {
      result += "a";
      flag = "a";
      count_a -= 1;
    } else if (
      check_valid(count_a, count_b - 2) &&
      flag != "b" &&
      flag != "bb"
    ) {
      result += "bb";
      flag = "bb";
      count_b -= 2;
    } else if (check_valid(count_a, count_b - 1) && flag != "bb") {
      result += "b";
      flag = "b";
      count_b -= 1;
    }
  }
  console.log(result);
  return result;
}

var strWithout3a3b = function (A, B) {
  // 多的一方 先出现
  // 拆分
  return add_char(A, B);
};

// strWithout3a3b(2, 5);
strWithout3a3b(5, 2);
strWithout3a3b(4, 4);
