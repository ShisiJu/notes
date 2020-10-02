// 检索最近的十条推文。每个推文都必须是由此用户关注的人或者是用户自己发出的。推文必须按照时间顺序由最近的开始排序。
// 小顶堆
// 时间顺序 固定长度  也可以使用queue

// 图 去维护 邻接表
// 关注列表
// 自己 + 关注的人

var Twitter = function () {
  this.msg_queue = [];
  this.follow_map = new Map();
};

Twitter.prototype.postTweet = function (userId, tweetId) {
  this.msg_queue.unshift({ userId, tweetId });
};

Twitter.prototype.getNewsFeed = function (userId) {
  let follow = this.follow_map.get(userId);
  if (!follow) {
    follow = new Set();
  }
  follow.add(userId);
  const result = [];
  // 获取到前10条
  for (let index = 0; index < this.msg_queue.length; index++) {
    const msg = this.msg_queue[index];
    if (follow.has(msg.userId)) {
      result.push(msg.tweetId);
      if (result.length == 10) {
        return result;
      }
    }
  }
  return result;
};

Twitter.prototype.follow = function (followerId, followeeId) {
  let set = this.follow_map.get(followerId);
  if (!set) {
    set = new Set();
  }
  set.add(followeeId);
  this.follow_map.set(followerId, set);
};

Twitter.prototype.unfollow = function (followerId, followeeId) {
  const set = this.follow_map.get(followerId);
  if (!set) {
    return;
  }
  set.delete(followeeId);
};

var obj = new Twitter();
obj.postTweet(1, 5);
var param_2 = obj.getNewsFeed(1);
obj.follow(1, 3);
obj.unfollow(1, 3);
