// https://leetcode-cn.com/problems/course-schedule-ii/

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  const in_degree = new Map();
  const out_degree = new Map();
  for (let i = 0; i < numCourses; i++) {
    in_degree.set(i, new Set());
    out_degree.set(i, new Set());
  }

  //  [[1,0]]  表示 1 依赖于 0
  prerequisites.forEach((p) => {
    in_degree.get(p[0]).add(p[1]);
    out_degree.get(p[1]).add(p[0]);
  });

  // vertex 对应的入度数
  const dep_array = [];
  // 遍历时用到的queue, 存储入度为0的顶点
  const queue = [];
  in_degree.forEach((val, key) => {
    dep_array[key] = val.size;
    if (val.size === 0) {
      queue.push(key);
    }
  });

  const visited = new Array(numCourses).fill(false);
  const result = [];

  while (queue.length != 0) {
    const vertex = queue.shift();
    visited[vertex] = true;
    result.push(vertex);

    // 依赖该顶点的且没有被访问过的, 依赖数减一
    out_degree.get(vertex).forEach((key) => {
      dep_array[key] = dep_array[key] - 1;
      if (dep_array[key] === 0 && visited[key] == false) {
        queue.push(key);
      }
    });
  }

  if (result.length === numCourses) {
    return result;
  } else {
    return [];
  }
};

findOrder(4, [
  [1, 0],
  [2, 0],
  [3, 1],
  [3, 2],
]);
