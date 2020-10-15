// 求最大可以装多少个物品
// 回溯 一般使用递归
let max_count = 0;
function max_number(goods, max_weight) {
  // 期望
  // 结束条件 选中的物品的 weight 之和 不能超过 max_weight
  // 回溯要记录 之前的选择 即选了哪个, 没有选哪个
  let selected = new Array(goods.length).fill(false);
  recur_c(selected, goods, max_weight);
  return max_count;
}

function recur_c(selected, goods, available_weight) {
  for (let i = 0; i < goods.length; i++) {
    // 如果被选中了
    if (selected[i]) {
      continue;
    }
    const weight = goods[i];
    selected[i] = true;
    if (available_weight - weight >= 0) {
      let current_count = selected.filter((s) => {
        return s;
      }).length;
      if (max_count < current_count) {
        max_count = current_count;
      }
      recur_c(selected, goods, available_weight - weight);
    }
    selected[i] = false;
  }
}

let goods = [2, 2, 3, 5];
let max_weight = 9;
max_number(goods, max_weight);
