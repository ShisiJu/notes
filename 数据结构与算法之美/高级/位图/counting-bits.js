/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function (num) {
  num = num + 1;
  const count_arr = new Array(num).fill(0);
  const result = new Array(num);
  result[0] = 0;

  for (let i = 1; i < count_arr.length; i++) {
    let last = i & (i - 1);
    count_arr[i] = count_arr[last] + 1;
    result[i] = count_arr[i];
  }

  return result;
};




var hammingWeight = function (n) {
  n = n.toString()
  let count = 0
  for (let i = 0; i < n.length; i++) {
      let v = n[i]
      if (v == '1') {
          count++
      }
  }

  return count
};


hammingWeight('11111111111111111111111111111101')