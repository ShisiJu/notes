// 无向图
class Graph {
  constructor(v) {
    // v 表示顶点的个数
    this.v = v;
    // 邻接表
    this.adj = [];
    for (let i = 0; i < this.v; i++) {
      this.adj[i] = [];
    }
  }
  // 无向图一条边存两次
  addEdge(s, t) {
    this.adj[s].push(t);
    this.adj[t].push(s);
  }

  // 广度优先搜索
  breadth_first_search(s, t) {
    // if (s == t) {
    //   return [];
    // }
    const prev = new Array(this.v).fill(-1);
    // 用于记录 顶点是否被访问过
    const visited = new Array(this.v).fill(false);
    // 用于记录 访问到该节点的前一个节点
    // 用于遍历顶点, 一层一层地遍历
    const queue = [s];
    // 循环结束的条件
    // 找到t, 或者queue为空
    let prev_v = null;
    while (queue.length !== 0) {
      let cur = queue.shift();
      visited[cur] = true;
      // 当前顶点的邻接表
      let cur_list = this.adj[cur];

      let unvisited = cur_list
        // 遍历 cur_list中没有被访问过的节点
        .filter((node) => {
          return !visited[node];
        });

      for (let index = 0; index < unvisited.length; index++) {
        const node = unvisited[index];
        // 设置 prev 和 visited
        prev[node] = cur;
        visited[node] = true;
        // 如果有t 结束
        if (node === t) {
          return prev;
        } else {
          // 没有 将其放入 queue中,继续循环
          queue.push(node);
        }
      }
    }

    return prev;
  }
}

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

edges.forEach((e) => {
  graph.addEdge(e[0], e[1]);
});

console.log(graph);

let result = graph.breadth_first_search(0, 6);
console.log(result);
