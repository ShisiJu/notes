为了让二叉查找树支持按照区间来查找数据，
我们可以对它进行这样的改造：
树中的节点并不存储数据本身，
而是只是作为索引。



为什么树的高度不要超过3

因为 如果索引是存放在 硬盘中的; 为了减少IO


我们前面讲到，比起内存读写操作，磁盘 IO 操作非常耗时，所以我们优化的重点就是尽量减少磁盘 IO 操作，
也就是，尽量降低树的高度。那如何降低树的高度呢？


管是内存中的数据，还是磁盘中的数据，
操作系统都是按页（一页大小通常是 4KB，这个值可以通过 getconfig PAGE_SIZE 命令查看）来读取的，一次会读一页的数据。

如果要读取的数据量超过一页的大小，就会触发多次 IO 操作。所以，我们在选择 m 大小的时候，要尽量让每个节点的大小等于一个页的大小。

读取一个节点，只需要一次磁盘 IO 操作。



数据的写入过程，会涉及索引的更新，这是索引导致写入变慢的主要原因。


 b+树主要是用在外部存储上，为了减少磁盘IO次数。
跳表比较适合内存存储。
实际上，两者本质的设计思想是雷同的，性能差距还是要具体看应用场景，无法从时间复杂度这么宽泛的度量标准来度量了。



## 为什么不适用

[why-are-skip-lists-not-preferred-over-b-trees-for-databases](https://stackoverflow.com/questions/21828834/why-are-skip-lists-not-preferred-over-b-trees-for-databases)



[what-is-skiplist-why-skiplist-index-for-memsql](https://www.singlestore.com/blog/what-is-skiplist-why-skiplist-index-for-memsql)



https://opensource.googleblog.com/2013/01/c-containers-that-save-memory-and-time.html
