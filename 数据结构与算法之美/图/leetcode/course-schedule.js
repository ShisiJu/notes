// 检查是否有循环依赖
// https://leetcode-cn.com/problems/course-schedule/

function courseToQueue(pre_array, finished_array, queue) {
  pre_array.forEach((pre, i) => {
    let flag = true;
    pre.forEach((c) => {
      if (finished_array[c] == false) {
        flag = false;
      }
    });

    if (flag && !finished_array[i]) {
      queue.push(i);
      finished_array[i] = true;
    }
  });
}

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */

var canFinish = function (numCourses, prerequisites) {
  // 广度优先
  // 一个数组记录 finished_array 课程是否上过 默认都是false
  const finished_array = new Array(numCourses).fill(false);
  // 一个数组记录 pre_array  0 - N-1 课程中需要的前置课程
  const pre_array = [];
  for (let index = 0; index < numCourses; index++) {
    pre_array.push(new Set());
  }

  prerequisites.forEach((p) => {
    //[1,0] 表示 学习课程 1 之前，你需要完成课程 0。
    pre_array[p[0]].add(p[1]);
  });

  // 一个 queue 存储可以学习的课程
  const queue = [];
  // finished 是 false
  // 且前置课程在 finished中都是true
  courseToQueue(pre_array, finished_array, queue);

  while (queue.length != 0) {
    let cur_c = queue.pop();
    finished_array[cur_c] = true;
    courseToQueue(pre_array, finished_array, queue);
  }

  return !finished_array.some((f) => {
    return f != true;
  });
};

// canFinish(2, [[1, 0]]);

canFinish(2, [
  [1, 0],
  [0, 1],
]);
