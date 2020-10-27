class SmallHeap {
  constructor() {
    this.array = [];
  }

  size() {
    return this.array.length;
  }

  add(vertex) {
    this.array.push(vertex);
    this.sort();
  }

  poll() {
    let first = this.array[0];
    this.array = this.array.slice(1);
    return first;
  }

  create_or_update(vertex) {
    let v = this.array.find((v) => {
      return v.vertex_index == vertex.vertex_index;
    });

    if (v) {
      v.weight = vertex.weight;
      this.sort();
    } else {
      this.add(vertex);
    }
  }

  sort() {
    this.array.sort(function (a, b) {
      return a.weight - b.weight;
    });
  }
}

class Vertex {
  constructor(vertex_index, weight) {
    this.vertex_index = vertex_index;
    this.weight = weight;
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
    // 初始化所有的顶点的 min_dist
    const min_dist = new Array(this.vertex_num).fill(Number.MAX_VALUE);
    // 给 start 点的min_dist 设置为0
    min_dist[start] = 0;
    // small_heap 加入 start点
    const small_heap = new SmallHeap();
    // 遍历 small_heap  直到它为空
    small_heap.create_or_update(new Vertex(start, 0));
    while (small_heap.size() != 0) {
      let cur_v = small_heap.poll();
      let cur_i =cur_v.vertex_index
      // TODO: 这里有些不太懂
      if(cur_i == end){
        break 
      }
      let cur_weight = min_dist[cur_i];
      for (let i = 0; i < this.adjacent_table[cur_i].length; i++) {
        const next_edge = this.adjacent_table[cur_i][i];
        const comp_weight = cur_weight + next_edge.weight;
        if (comp_weight < min_dist[next_edge.end]) {
          min_dist[next_edge.end] = comp_weight
          small_heap.create_or_update(new Vertex(next_edge.end, comp_weight));
        }
      }
    }
    return min_dist
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

g.dijkstra(0,5)