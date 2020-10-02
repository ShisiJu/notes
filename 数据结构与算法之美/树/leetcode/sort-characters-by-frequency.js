// https://leetcode-cn.com/problems/sort-characters-by-frequency/

/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function (s) {
  const map = new Map();
  for (let index = 0; index < s.length; index++) {
    const cur_s = s[index];
    if (map.has(cur_s)) {
      map.set(cur_s, map.get(cur_s) + 1);
    } else {
      map.set(cur_s, 1);
    }
  }

  const array = [];
  map.forEach((val, key) => {
    array.push({ key, val });
  });

  array.sort((a, b) => {
    return b.val - a.val;
  });

  let result = "";
  array.forEach((obj) => {
    result = result + obj.key.repeat(obj.val);
  });

  return result;
};

frequencySort("Aabb");
