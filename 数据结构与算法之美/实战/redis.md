
- string 
- list 
  - ziplist
  - 双向循环列表
- hash
  - ziplist
  - 散列表
- set
  - 有序数组
  - 散列表 
- zset 有序结合
  - ziplist
  - 跳表




## list

列表保持的单个数据小于64字节
列表中数据个数小于512个


```c
// 以下是C语言代码，因为Redis是用C语言实现的。
typedef struct listnode {
  struct listNode *prev;
  struct listNode *next;
  void *value;
} listNode;


typedef struct list {
  listNode *head;
  listNode *tail;
  unsigned long len;
  // ....省略其他定义
} list;
```


## 字典

- 字典中保存的键和值的大小都要小于 64 字节；
- 字典中键值对的个数要小于 512 个


Redis 就使用散列表来实现字典类型。
Redis 使用[MurmurHash2](https://zh.wikipedia.org/wiki/Murmur%E5%93%88%E5%B8%8C)这种运行速度快、随机性好的哈希算法作为哈希函数。对于哈希冲突问题，Redis 使用链表法来解决。除此之外，Redis 还支持散列表的动态扩容、缩容。

渐进式扩容缩容策略，将数据的搬移分批进行，避免了大量数据一次性搬移导致的服务停顿。