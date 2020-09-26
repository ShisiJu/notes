const Graph = require("./graph");

const graph = new Graph(8);

const edges = [
  [0, 1],
  [0, 3],
  [1, 2],
  [1, 4],
  [2, 5],
  [3, 4],
  [4, 5],
  [4, 6],
  [6, 7],
  [5, 7],
];

// 添加边
edges.forEach((e) => {
  graph.addEdge(e[0], e[1]);
});

console.log(graph);

let bfs_result = graph.breadth_first_search(0, 6);
console.log(bfs_result);

let dfs_result = graph.depth_first_search(0, 6);
console.log(dfs_result);
