# 如何设计一个vue组件

最近做了一个比较复杂的页面.




[thinking-in-react](https://zh-hans.reactjs.org/docs/thinking-in-react.html)


## 原型与组件拆分

## 单一组件


[Single-responsibility principle 单一原则](https://en.wikipedia.org/wiki/Single-responsibility_principle)

组件的拆分

拆分的粒度, 复杂与简单

符合需求

架构设计

- 合适
- 简单
- 演进

最好将渲染 UI 和添加交互这两个过程分开

这是因为，编写一个应用的静态版本时，往往要编写大量代码，
而不需要考虑太多交互细节；添加交互功能时则要考虑大量细节，而不需要编写太多代码


## 数据流转


vue 是单向数据流.

v-model 是通过 $emit('input') 来传递的
哪个组件应该拥有某个 state 这件事，对初学者来说往往是最难理解的部分。

反向数据流


### 父子通信

update:propTitle

## 交互功能

## 梳理与整合

多思考

## 举例分析


一个组件原则上只能负责一个功能。如果它需要负责更多的功能，这时候就应该考虑将它拆分成更小的组件。

数据驱动视图.







