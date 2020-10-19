// 贪心
// 背包装豆子

function get_max_value(beans, pack_weight) {
  let result = 0;
  let available_weight = pack_weight;
  // 让豆子根据单价从大到小排序
  beans = beans.sort((a, b) => {
    return b.unit_price - a.unit_price;
  });

  for (let i = 0; i < beans.length; i++) {
    const bean = beans[i];
    if (available_weight >= bean.gross) {
      result += bean.gross * bean.unit_price;
      available_weight -= bean.gross;
    } else {
      result += available_weight * bean.unit_price;
      break;
    }
  }

  return result;
}

const beans = [
  { name: "黄豆", unit_price: 1, gross: 100 },
  { name: "绿豆", unit_price: 3, gross: 30 },
  { name: "红豆", unit_price: 2, gross: 20 },
  { name: "黑豆", unit_price: 4, gross: 20 },
  { name: "青豆", unit_price: 2.5, gross: 50 },
];
get_max_value(beans, 100);
