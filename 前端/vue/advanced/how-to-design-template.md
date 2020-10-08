# 如何设计vue组件

[react的哲学](https://zh-hans.reactjs.org/docs/thinking-in-react.html) 这篇文章中讲述了如何设计一个react组件.

受到这篇文章的启发, 我写下了本篇文章.

## 原型与组件拆分

根据原型(设计稿), 来初步划分组件. 

下图是我们接下来要做的内容

---图片



### 确定功能

页面的功能, 往往需要产品在需求文档中写清楚.
如果有不确定的内容, 要及时沟通.

这里, 这一项不是本文的重点.  但却是工作中非常重要的内容.

- 筛选项 默认不勾选 只展示在售商品
- 筛选器 点击搜索时 根据筛选项搜索内容
- 表格内容展示和原型一致


### 拆分组件

我们根据原型和功能
先初步将其设计为 FilterableProductTable 组件

如图

---图片


- FilterableProductTable
  - GeneralTable
    - TableHeader
    - TableRows
  - SearchBar


组件是拆分完了. 但是
我为什么要这么拆分组件呢? 

拆分组件的依据是什么? 

如何确定应该将哪些部分划分到一个组件中呢？

这里借用React哲学中的一段话

> 你可以将组件当作一种函数或者是对象来考虑，根据单一功能原则来判定组件的范围。
也就是说，`一个组件原则上只能负责一个功能`。如果它需要负责更多的功能，这时候就应该考虑将它拆分成更小的组件。

在实践中，因为你经常是在向用户展示 JSON 数据模型，所以如果你的模型设计得恰当，
UI（或者说组件结构）便会与数据模型一一对应，这是因为 UI 和数据模型都会倾向于遵守相同的信息结构。
将 UI 分离为组件，其中每个组件需与数据模型的某部分匹配。

表格展示的数据

```json
[
  { product_name: "苹果IPhoneX", price: 7111.0, is_sale: "是" },
  { product_name: "华为Note7", price: 5321.0, is_sale: "是" },
  { product_name: "iphone 4", price: 3100.0, is_sale: "否" },
  { product_name: "nova1", price: 2011.0, is_sale: "否" },
]
```

表头展示的数据

```json
[
  { name: "产品名称", key: "product_name" },
  { name: "价格", key: "price" },
  { name: "是否在售", key: "is_sale" },
]
```

例如: 在表格中, 我需要展示上面的JSON数据.  可以使用 GeneralTable 负责展示这一块
但是, 为什么又要拆分 TableHeader, TableRows 这两个部分呢? 

因为, 表格中的表头 TableHeader 需要通过数据来展示, 而非写死的表头.
同时, GeneralTable  展示的数据要根据表头的排序来展示. 因此又拆分了一个组件 TableRows

但是, 这不代表组件拆分的越小越细越好. 
具体问题要具体分析.

例如: 

TableHeader 中, 每一个不同的列的表头, 我可能需要自定义的一些处理.
但是, 就目前这个需求而言, 不需要.  那么, 就可以不做更细粒度的拆分.
除非有明确需要.

等到有需要需要再去处理.

[Single-responsibility principle 单一原则](https://en.wikipedia.org/wiki/Single-responsibility_principle)



### 编写静态页面

在编写页面时. 我们要先分析数据的流程.
在此过程中, 可能会改变之前拆分的组件结构.
因为, 最开始的拆分仅仅是根据UI和数据来拆分. 
并没有结合实际的流程. 

接下来, 我们要把整个数据的流程梳理一下.

1. 页面初始化时, 要展示表格数据, 筛选项默认值
2. 当用户点击时, 要根据筛选项加载数据


- SearchBar 筛选项: 
  - query
    - keyword 用于存储用户的关键字
    - only_on_sale 复选框是否选中 仅仅查看在售商品

- GeneralTable 展示内容
  - TableRows
    - data 需要根据筛选项获取数据
  - TableHeader
    - columns 要展示的表头


我们首先, 先不去管具体的交互内容.
我们先把整体的静态页面写出来.

这么做的原因是: 

编写一个应用的静态版本时，往往要编写大量代码，
而不需要考虑太多交互细节；添加交互功能时则要考虑大量细节，而不需要编写太多代码. 

在不考虑交互的情况下,  我们可以编写出下面的页面.
此时的页面, 只有数据的展示, 并没有任何的交互. 

--- 图片


## 交互与数据

用户的操作往往会带来数据的改变. 
在vue中, 我们要通过 `数据驱动视图`.

也就是, 页面中样式, 表格的行数等等, UI的变化. 
要通过改变响应式的数据, 让vue 去帮我们处理UI.

下面, 是要加入交互的部分了

我们在 GeneralTable 中加入 data 表格内容.
但是, 我们发现 SearchBar 的结果会影响到 data

如果, 我们将 data 放到 GeneralTable 组件中, 我们很难处理 SearchBar 的响应.
需要再转发一次或者通过vuex.

更好的解决办法是:
把 data 放到 FilterableProductTable 中. 
通过处理 SearchBar 的 自定义事件 search 来处理.

FilterableProductTable 的代码

```html
<template>
  <div>
    <SearchBar @search="handleSearch"> </SearchBar>
    <GeneralTable :columns="columns" :data="product_data"> </GeneralTable>
  </div>
</template>

<script>
import SearchBar from "./SearchBar";
import GeneralTable from "./GeneralTable";

export default {
  data() {
    return {
      columns: [
        { name: "产品名称", key: "product_name" },
        { name: "价格", key: "price" },
        { name: "是否在售", key: "is_sale" },
      ],
      product_data: [],
    };
  },
  components: {
    SearchBar,
    GeneralTable,
  },
  methods: {
    handleSearch(query) {
      // 这里根据query 去请求数据
      // 仅仅为了展示, 工作中会请求后端的API
      console.log(query);
      this.data = [
        { product_name: "苹果IPhoneX", price: 7111.0, is_sale: "是" },
        { product_name: "华为Note7", price: 5321.0, is_sale: "是" },
        { product_name: "iphone 4", price: 3100.0, is_sale: "否" },
        { product_name: "nova1", price: 2011.0, is_sale: "否" },
      ]
    },
  },
};
</script>
```

SearchBar 的代码

```html
<template>
  <div>
    <input v-model="query.keyword" type="text" placeholder="根据名称过滤" />
    <label>
      仅展示在售
      <input v-model="query.only_on_sale" type="checkbox" />
    </label>

    <button @click="search">搜索</button>
  </div>
</template>

<script>
export default {
  created() {
    // 这样可以让父组件初始化时请求数据;
    this.$emit("search", this.query);
  },
  data() {
    return {
      query: {
        keyword: "",
        only_on_sale: false,
      },
    };
  },
  methods: {
    search() {
      this.$emit("search", this.query);
    },
  },
};
</script>
```

### 数据流转图

我们做的这个功能比较简单. 
没有很复杂的数据流转.

如果, 遇到复杂的前端页面, 有很多的交互和数据变化.
那么, 需要先画一个 数据流转图.

梳理清晰数据的变化.

复杂的组件. 我们也可以采用先编写小的组件. 
再组合成复杂的组件. 

记住: 组件的功能单一

### state

这一段许多内容摘抄自 [React哲学](https://zh-hans.reactjs.org/docs/thinking-in-react.html)

我们知道vue组件中在 data(){} 中返回的数据是响应式的;
这种响应式的数据称为 state 

页面中的交互往往通过 改变 state 来实现, 所以编写组件中非常重要的内容

1. 确定好最小 state 
2. 确定好 state的存放位置


#### 最小state 

为了正确地构建应用，你首先需要找出应用所需的 state 的最小表示，并根据需要计算出其他所有数据。
其中的关键正是 DRY: Don’t Repeat Yourself。

只保留应用所需的可变 state 的`最小集合`，其他数据均由它们计算产生。

vue 组件中可以使用响应式数据的方式

- 在 data 中定义
- 取 props 父组件传入的内容
- computed 计算属性
- watch 
- vuex 


要确认一个组件中的最小state 

通过问自己以下三个问题，你可以逐个检查相应数据是否属于 state：

- 该数据是否是由父组件通过 props 传递而来的？如果是，那它应该不是 state。
- 该数据是否随时间的推移而保持不变？如果是，那它应该也不是 state。
- 你能否根据其他 state 或 props 计算出该数据的值？如果是，那它也不是 state。

比如，你要编写一个任务清单应用，你只需要保存一个包含所有事项的数组，而无需额外保存一个单独的 state 变量（用于存储任务个数）。
当你需要展示任务个数时，只需要利用该数组的 length 属性即可。

#### state的存放位置

我们已经确定了应用所需的 state 的最小集合。
接下来，我们需要确定哪个组件能够改变这些 state，或者说拥有这些 state。

Vue 中的数据流是单向的，并顺着组件层级从上往下传递。
哪个组件应该拥有某个 state 这件事，对初学者来说往往是最难理解的部分. 

对于应用中的每一个 state：

- 找到根据这个 state 进行渲染的所有组件。
- 找到他们的共同所有者（common owner）组件（在组件层级上高于所有需要该 state 的组件）。
- 该共同所有者组件或者比它层级更高的组件应该拥有该 state。
- 如果你找不到一个合适的位置来存放该 state，就可以直接创建一个新的组件来存放该 state，并将这一新组件置于高于共同所有者组件层级的位置。


结合我们所写的例子

筛选项 SearchBar 中的 query, 我们可以把它放到 最外层的 FilterableProductTable 中.
但是, 这样想想有没有必要.

如果把query放到 FilterableProductTable 中, 那么 FilterableProductTable 就要去处理一些筛选项的交互.
但是, FilterableProductTable 却只需要在用户点击时, 获取到一个筛选项结果即可.
没有必要处理其它内容.

另外, 如果很多内容都放到最外层组件. 虽说不会有什么问题. 但是, 模块之间的耦合度会很高.
因为都需要最外层组件提供数据. 而且会导致 最外层组件非常的臃肿. 可读性会很差.

组件的 state 存放位置是一个比较难理解的部分.
需要在工作中不断地尝试和总结. 

## 总结

- 拆分组件
- 编写静态页面
- 分析 state
- 添加交互

最好将渲染 UI 和添加交互这两个过程分开

这是因为，编写一个应用的静态版本时，往往要编写大量代码，
而不需要考虑太多交互细节；添加交互功能时则要考虑大量细节，而不需要编写太多代码

软件是灵活的, 组件的设计是灵活的. 并不是按照要求做, 效果就一定是最好的.
这里只是提供一些参考. 灵活运用才是王道.
