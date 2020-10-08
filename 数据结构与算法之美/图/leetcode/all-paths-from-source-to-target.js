// https://leetcode-cn.com/problems/all-paths-from-source-to-target/

function recur_c(graph, node, target, result, prev) {
  graph[node].forEach((item) => {
    let cur_prev = prev.slice();
    cur_prev.push(item);
    if (item === target) {
      result.push(cur_prev);
    } else {
      recur_c(graph, item, target, result, cur_prev);
    }
  });
}

/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function (graph) {
  // 二维数组的第 i 个数组中的单元都表示有向图中 i 号结点所能到达的下一些结点
  const result = [];
  const target = graph.length - 1;

  // 从 0 开始
  recur_c(graph, 0, target, result, [0]);
  return result;
};

// 输入：graph = [[4,3,1],[3,2,4],[3],[4],[]]
// 输出：[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]

// 输入：graph = [[1],[]]
// 输出：[[0,1]]

let testCase = [[4, 3, 1], [3, 2, 4], [3], [4], []];
// allPathsSourceTarget([[1], []]);

allPathsSourceTarget(testCase);
