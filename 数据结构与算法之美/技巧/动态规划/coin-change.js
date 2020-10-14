// https://leetcode-cn.com/problems/coin-change/
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  let over_coin = false;
  if (amount == 0) {
    return 0;
  }
  const amount_arr = new Array(amount + 1).fill(-1);
  // 去掉大于总数的coin
  coins = coins.filter((c) => {
    return c <= amount;
  });

  amount_arr[0] = 0;
  for (let i = 0; i < amount_arr.length; i++) {
    let count = amount_arr[i];
    if (count != -1) {
      coins.forEach((c) => {
        // 如果为-1 或则 大于 count + 1
        if (amount_arr[i + c] == -1 || amount_arr[i + c] > count + 1) {
          amount_arr[i + c] = count + 1;
        }
      });
    }
  }

  return amount_arr[amount];
};

coinChange([1, 2147483647], 2);
