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

  print_path(s, t, prev) {
    const path = [];
    let cur_p = t;
    while (cur_p != -1) {
      path.unshift(prev[cur_p]);
      cur_p = prev[cur_p];
    }
    console.log(path.join("->"));
  }

  // 广度优先搜索
  // 最短路径
  breadth_first_search(s, t) {
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
    this.print_path(s, t, prev);
    return prev;
  }

  // 深度优先
  // 回溯 找到一条
  depth_first_search(s, t) {
    // 类变量found 用于标记是否找到t
    this.found = false;
    const visited = new Array(this.v).fill(false);
    const prev = new Array(this.v).fill(-1);
    this._recur_dfs(s, t, visited, prev);
    // 查询完成之后, 需要重新设置为false, 否则下一次搜索就直接是 true 了
    this.found = false;
    this.print_path(s, t, prev);
    return prev;
  }

  _recur_dfs(cur_p, t, visited, prev) {
    // 如果找到了就直接返回
    if (this.found) {
      return;
    }
    // 当前顶点的邻接表
    const cur_list = this.adj[cur_p];
    visited[cur_p] = true;
    // 遍历当前邻接表中没有被访问过的顶点
    cur_list.forEach((p) => {
      // 如果一个点也没有, 递归也就结束了
      if (!visited[p]) {
        prev[p] = cur_p;
        if (p === t) {
          this.found = true;
        }
        this._recur_dfs(p, t, visited, prev);
      }
    });
  }
}

module.exports = Graph;
