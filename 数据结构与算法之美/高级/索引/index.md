# 数据库索引

带着问题去学习! 学习起来才有趣;

下面的每一个小节, 都由若干个问题组成;
希望这些问题能够给大家带来一定的帮助;

同时, 也希望大家提出好的问题, 一起分享!

## 数据准备

为了更好的说明和演示;
我们需要事前造一些数据;  
一个 有`1000w` 数据的产品表: 

```sql
-- Table: public.product
-- DROP TABLE public.product;
CREATE TABLE public.product
(
    id bigint NOT NULL,
    name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    price numeric(30,6) NOT NULL,
    created_at time without time zone NOT NULL,
    comment text COLLATE pg_catalog."default",
    CONSTRAINT product_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.product
    OWNER to postgres;
COMMENT ON TABLE public.product
    IS '产品表';
```

创建一个 获取随机字符串的函数; 执行一下就好;

```sql
create or replace function f_random_str(length INTEGER) 
returns character varying AS $$
DECLARE
    result varchar(50);
BEGIN
    SELECT array_to_string(ARRAY(SELECT chr((65 + round(random() * 25)) :: integer)
    FROM generate_series(1,length)), '') INTO result;
    
    return result;
END;
$$ LANGUAGE plpgsql;
```

造1000w数据, 大概需要5分钟;

```sql
insert into product
select 
generate_series(1,10000000),
f_random_str(12) ,
(random()*(1000))::decimal, 
clock_timestamp(),
md5(random()::text)
```

## 数据存储

### 数据存放在哪里


当然是存放在硬盘中了;
但是, 我们怎么找到具体数据库文件的物理地址呢?

首先, 我们要先查找到表的oid, 然后再去数据库存储数据的目录;

```sql
select oid,relfilenode from pg_class where relname='product';
```

**图一**

安装pg的时候, 会让你指定数据存放的地址; 
我的是 D:\env\pg\data; 

所以, 我需要找的地址是: 
`D:\env\pg\data\base\16394\16502`


### 如何存储数据

我们找到了具体的位置.
那么, 数据库是如何储存这些数据的呢? 

我们知道计算机中的最小单位是bit;
而操作系统管理计算机硬件的最小单位是 一页 (4KB); 
所以文件大小和文件所占磁盘空间大小是不一样的;
可能文件只有1kb, 但是却占了磁盘空间的4kb;

同样, 数据库管理文件也有一个最小单位: block_size 或者 page_size


```sql
SELECT current_setting('block_size');
```

通过sql 我们可以得知:
pg 数据库默认的page大小是 8KB;

我们可以在   `D:\env\pg\data\base\16394` 这个目录下, 查看文件:
会发现很多文件都是 8kb的倍数;


推荐阅读: 

[linux空白文件大小为4kb简单解释](https://blog.csdn.net/weixin_43944305/article/details/103578222)

[InnoDB一棵B+树可以存放多少行数据？](https://www.cnblogs.com/leefreeman/p/8315844.html)


### 为什么block_size设置成8kb

是为了性能!

但是, 为什么8kb是相对较好的选择呢?


我找到了一些有趣问题与回答

推荐阅读

[Should the database block size always be 8K?](https://knowledgebase.progress.com/articles/Article/18293)

[Re: Performance block size.](https://www.postgresql.org/message-id/irnvt4%24es5%241%40dough.gmane.org)

[storage-page-layout](https://www.postgresql.org/docs/current/storage-page-layout.html)


### 如何查看表所占空间

通过pg提供的语句, 可以很方便地查看到表 所占空间的大小

```sql
-- 表大小 (包括 索引)
select pg_size_pretty(pg_total_relation_size('product'));
-- 主键id 索引大小
select pg_size_pretty(pg_relation_size('product_pkey'));
```


查看product表占用的空间 大概 1256 MB
主键id 索引占用的空间 大概 214 MB


```sql
create extension pgstattuple;
SELECT * FROM pgstatindex('product_pkey');
```

查看索引详情

[pg 分析语句](http://mysql.taobao.org/monthly/2018/11/06/)

## 索引

### 索引是什么


Indexes are a common way to enhance database performance. An index allows the database server to
find and retrieve specific rows much faster than it could do without an index. But indexes also add
overhead to the database system as a whole, so they should be used sensibly.


[postgresql documentation](https://www.postgresql.org/files/documentation/pdf/13/postgresql-13-A4.pdf)


 
### 为什么要有数据库索引

答: 提高查询效率

我们在数据准备中, 创建了 product 表;

```sql
SELECT * FROM product WHERE id = 12311
```

如果没有主键的索引, 数据库不得不扫描整个 product 表, 一行一行地找;

就如上面的sql, id = 12311 只有一条; 但是, 数据库仍然要扫描整个表;
这显然是一种低效的查询方式; 

但是, id 上有索引, 它可以使用更为高效的方式去定位到 id = 12311 的数据行;
例如, 它可以仅仅在索引的搜索树上进行几次查询, 就能够得到数据;

索引创建之后, 不需要有更多的操作了; 当表有变化时, 数据库会更新索引;
并且, 数据库在它认为使用`索引比扫描全表更高效时`, 会选择使用索引;

索引同时也可以加快 `UPDATE` 和 `DELETE` 命令.
索引此外还使用在 `join` 查询中. 如果 join 的条件中有索引, 那么会显著提升查询效率;

但是, 索引同时也是一种负担. 对于不常使用的索引, 应该删掉;


## 索引的类型


### 为什么索引有很多种

答: 在不同的场景下, 应该选择不同的索引; 

pg 数据库提供了非常多的索引

- B-tree
- Hash
- GiST
- SP-GiST
- GIN
- BRIN
- 等等

每一种索引都有不同的算法, 它们适用于不同的类型的查询;
默认情况下, 会创建B-tree索引, 因为它适用于多数情况;


推荐阅读

**这篇文章讲得特别好, 推荐大家去看看**

[PostgreSQL 9种索引的原理和应用场景](https://developer.aliyun.com/article/111793)

[Database · 理论基础 · 高性能B-tree索引](http://mysql.taobao.org/monthly/2020/05/02/)

我这里就只写 B-tree 和 hash 这两个最常用的;

### B-tree

https://blog.csdn.net/csdnlijingran/article/details/102309593


因为B+树只有叶子结点才存储表的记录信息，其他非叶子结点只存储数据(索引)，
所以高度为1和2的数据为1170个，叶子结点为16(一行1k，页的数据为16k)，
即高度为3的B+树可以存储的数据是1170*1170*16=2千万

 B-trees can handle equality and range queries on data that can be sorted into some ordering. In
particular, the PostgreSQL query planner will consider using a B-tree index whenever an indexed
column is involved in a comparison using one of these operators:

主键索引的叶子节点存的是整行数据。
在 InnoDB 里，主键索引也被称为聚簇索引（clustered index）。非主键索引的叶子节点内容是主键的值。
在 InnoDB 里，非主键索引也被称为二级索引（secondary index）。


推荐阅读


使用场景

B+ 树为什么只有叶子节点存数据?

有一道MySQL的面试题，为什么MySQL的索引要使用B+树而不是其它树形结构?比如B树？

现在这个问题的复杂版本可以参考本文；

他的简单版本回答是：

因为B树不管叶子节点还是非叶子节点，都会保存数据，这样导致在非叶子节点中能保存的指针数量变少（有些资料也称为扇出），指针少的情况下要保存大量数据，只能增加树的高度，导致IO操作变多，查询性能变低；

为什么不使用 跳表(skip list) ?

redis zset 为什么用 跳表 而不用 B+树?


## 跳表

1000w 数据

如果`每2个结点`提取一个结点到上一级，做索引, 就是 log2(1000w) 是 24 层;  
如果`每3个结点`提取一个结点到上一级，做索引, 就是 log3(1000w) 是 15 层;



## 回表



[为什么生产环境中B+树的高度总是3-4层？](https://zhuanlan.zhihu.com/p/86137284)


https://stackoverflow.com/questions/256511/skip-list-vs-binary-search-tree?rq=1


### hash 

 Hash indexes can only handle simple equality comparisons. The query planner will consider using
a hash index whenever an indexed column is involved in a comparison using the = operator. The
following command is used to create a hash index:

```sql
CREATE INDEX hash_index_of_name ON product USING hash (name);
```
DROP INDEX hash_index_of_name;  

Query returned successfully in 20 secs 879 msec.

加上hash 索引之后只要  60ms



1. 跳表
2. 平衡树
3. B+ 树
4. 索引的类型

作为一种动态数据结构，我们需要某种手段来维护索引与原始链表大小之间的平衡，也就是说，如果链表中结点多了，索引结点就相应地增加一些，避免复杂度退化，以及查找、插入、删除操作性能下降。

如果你了解红黑树、AVL 树这样平衡二叉树，你就知道它们是通过左右旋的方式保持左右子树的大小平衡（如果不了解也没关系，我们后面会讲），而跳表是通过随机函数来维护前面提到的“平衡性”。


跳表的数据 

红黑树




所以要现有使用场景
再谈索引类型

常见的数据库索引


## 通用区间和等值


## covering index


https://www.postgresql.org/docs/11/indexes-index-only-scans.html

推荐阅读

https://www.cnblogs.com/myseries/p/11265849.html




使用场景

索引类型

1. 解决问题的前提是定义清楚问题

面对不同的使用场景, 使用不同的索引;

通用`倒排索引`


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





