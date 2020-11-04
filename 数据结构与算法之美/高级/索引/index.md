# 索引




B+树首先是有序结构，为了不至于树的高度太高，影响查找效率，在叶子节点上存储的不是单个数据，而是一页数据






跳表
[聊聊Mysql索引和redis跳表](https://zhuanlan.zhihu.com/p/61900308)



[redis为何单线程 效率还这么高 为何使用跳表不使用B+树做索引(阿里)](https://my.oschina.net/u/4335884/blog/3367826)





因为B+树的原理是 叶子节点存储数据，非叶子节点存储索引，
B+树的每个节点可以存储多个关键字，它将节点大小设置为磁盘页的大小，
充分利用了磁盘预读的功能。每次读取磁盘页时就会读取一整个节点,

每个叶子节点还有指向前后节点的指针，为的是最大限度的降低磁盘的IO;

因为数据在内存中读取耗费的时间是从磁盘的IO读取的百万分之一

而Redis是 内存中读取数据，不涉及IO，因此使用了跳表； 

"在磁盘上数据是分磁道、分簇存储的，而数据往往并不是连续排列在同一磁道上，所以磁头在读取数据时往往需要在磁道之间反复移动，因此这里就有一个寻道耗时！另外，盘面旋转将请求数据所在扇区移至读写头下方也是需要时间，这里还存在一个旋转耗时！"

那么，在这一时间段（即"I/O等待"）内，线程是在“阻塞”着等待磁盘，
此时操作系统可以将那个空闲的CPU核心用于服务其他线程。

因此在I/O操作的情况下，使用多线程，效率会更高！


redis

There are a few reasons:

1) They are not very memory intensive. It's up to you basically. Changing parameters about the probability of a node to have a given number of levels will make then less memory intensive than btrees.

2) A sorted set is often target of many ZRANGE or ZREVRANGE operations, that is, traversing the skip list as a linked list. With this operation the cache locality of skip lists is at least as good as with other kind of balanced trees.

3) They are simpler to implement, debug, and so forth. For instance thanks to the skip list simplicity I received a patch (already in Redis master) with augmented skip lists implementing ZRANK in O(log(N)). It required little changes to the code.




索引的数据结构
https://www.javazhiyin.com/65086.html
