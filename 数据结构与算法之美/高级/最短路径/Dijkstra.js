class SmallHeap {
  constructor() {
    this.array = [];
  }

  create_or_update(node){
    

  }

  sort() {
    this.array.sort(function (a, b) {
      return a - b;
    });
  }
}

class Edge {
  constructor(start, end, weight) {
    this.start = start;
    this.end = end;
    this.weight = weight;
  }
}

class Graph {
  constructor(vertex_num) {
    this.vertex_num = vertex_num;
    this.adjacent_table = [];
    for (let i = 0; i < vertex_num; i++) {
      // 如果数据量大, 可以使用 hashmap , 跳表 等数据结构
      this.adjacent_table[i] = new Array();
    }
  }

  // 这里没有做错误处理
  add_edge(s, e, w) {
    this.adjacent_table[s].push(new Edge(s, e, w));
  }

  add_edge_by_array(array) {
    array.forEach((edge) => {
      this.add_edge(edge[0], edge[1], edge[2]);
    });
  }

  dijkstra(start, end) {
    // 初始化所有的顶点
  }
}

let g = new Graph(6);
let ar = [
  [0, 1, 10],
  [1, 2, 15],
  [2, 5, 5],
  [1, 3, 2],
  [3, 2, 1],
  [3, 5, 12],
  [0, 4, 15],
  [4, 5, 10],
];

g.add_edge_by_array(ar);
