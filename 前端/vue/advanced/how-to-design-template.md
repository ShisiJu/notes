# 如何设计vue组件

[react的哲学](https://zh-hans.reactjs.org/docs/thinking-in-react.html) 这篇文章中讲述了如何设计一个react组件.

受到这篇文章的启发, 我写下了本篇文章.

## 原型与组件拆分

根据原型(设计稿), 来初步划分组件

### 拆分

简单的


复杂的

先拆分成几大块. 梳理好基本的数据流.
再处理拆分好的内容.

高内聚, 低耦合.


### 单一功能

组件的功能单一

拆分的粒度

重构

[Single-responsibility principle 单一原则](https://en.wikipedia.org/wiki/Single-responsibility_principle)

组件的拆分

拆分的粒度, 复杂与简单

符合需求

架构设计

- 合适
- 简单
- 演进

## 交互与数据

用户的操作往往会带来数据的改变.

数据驱动视图


最顶部


### 数据流转图

### state

https://cn.vuejs.org/v2/guide/components-custom-events.html

最少state

哪个组件该拥有哪些state

其它的可以通过computed


内层, 外层
确认之后再修改外层


筛选项
table

如果table中的内容会影响到 筛选项, 那么 query 就应该放到 筛选项的父级

通过修改数据, 从而让视图改变.

## 总结



最好将渲染 UI 和添加交互这两个过程分开

这是因为，编写一个应用的静态版本时，往往要编写大量代码，
而不需要考虑太多交互细节；添加交互功能时则要考虑大量细节，而不需要编写太多代码




先写出一个静态版本的UI, 然后再去写交互的逻辑.