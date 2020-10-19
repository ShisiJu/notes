// goods_weight = [2, 2,4,5]
// pack_weight = 9
// 回溯
// 穷举出 所有可能
// 剪枝 如果当前重量大于9 那么, 就没有必要再往下进行了

function add_count(map, key) {
  // 记一个调用的总数
  set_0_num("amount");
  set_0_num(key);

  function set_0_num(current_key) {
    if (map.has(current_key)) {
      map.set(current_key, map.get(current_key) + 1);
    } else {
      map.set(current_key, 1);
    }
  }
}
function get_max_weight(goods_weight, pack_weight) {
  let max_weight = 0;
  //
  let record_map = new Map();
  recur_c(0, 0);
  return max_weight;
  function recur_c(current_weight, current_index) {
    if (current_weight > max_weight) {
      max_weight = current_weight;
      // 如果当前重量已经达到最大值了, 就没有必要继续计算了
      if (max_weight == pack_weight) {
        return;
      }
    }

    add_count(record_map, `w:${current_weight}-i:${current_index}`);

    for (let i = current_index; i < goods_weight.length; i++) {
      const weight = goods_weight[i];
      // 把当前物品放入
      if (current_weight + weight <= pack_weight) {
        recur_c(current_weight + weight, i + 1);
      }
      // 不把当前物品放入
      recur_c(current_weight, i + 1);
    }
  }
}

// 获取最大重量 带有备忘录(缓存效果)
function get_max_weight_with_memo(goods_weight, pack_weight) {
  let max_weight = 0;
  const memo = new Set();
  const record_map = new Map();
  recur_c(0, 0);
  return max_weight;
  function recur_c(current_weight, current_index) {
    const key = `w:${current_weight}-i:${current_index}`;
    if (memo.has(key)) {
      return;
    } else {
      memo.add(key);
    }

    if (current_weight > max_weight) {
      max_weight = current_weight;
      // 如果当前重量已经达到最大值了, 就没有必要继续计算了
      if (max_weight == pack_weight) {
        return;
      }
    }

    add_count(record_map, key);

    for (let i = current_index; i < goods_weight.length; i++) {
      const weight = goods_weight[i];
      // 把当前物品放入
      if (current_weight + weight <= pack_weight) {
        recur_c(current_weight + weight, i + 1);
      }
      // 不把当前物品放入
      recur_c(current_weight, i + 1);
    }
  }
}

function get_max_weight_dynamic(goods_weight, pack_weight) {
  const result_array = new Array(pack_weight + 1).fill(false);
  // 设置起点
  result_array[0] = true;
  result_array[goods_weight[0]] = true;

  for (let i = 1; i < goods_weight.length; i++) {
    const weight = goods_weight[i];
    // 背包能装得下需要满足 j = pack_weight - weight
    for (let j = pack_weight - weight; j >= 0; j--) {
      // 可达
      if (result_array[j]) {
        result_array[j + weight] = true;
      }
    }
  }

  // 返回结果
  return result_array.lastIndexOf(true);
}

// get_max_weight([2, 2, 4, 5], 9);
get_max_weight_with_memo([2, 2, 4, 5], 9);
// get_max_weight_dynamic([2, 2, 4, 5], 9);
