# 变量, 常量, 对象

本节, 主要讲变量, 常量, 对象.
涉及到方法和类的内容, 重点在第三,四节.
但是, 讲变量, 常量, 对象又离不开方法和类.


## 类和对象

Ruby 是一门完全面向对象的语言，没有基础数据类型. 
Ruby 中的一切都是以对象的形式出现。
Ruby 中的每个值都是一个对象，即使是最原始的东西：字符串、数字，甚至连 true 和 false 都是对象。
类本身也是一个对象，是 Class 类的一个实例

```rb
# Integer
1.class
# TrueClass
true.class
# FalseClass
false.class
# Class
Integer.class
```

因为我们定义的class 本身就是一个Class的对象,
所以, 我们在添加class方法时, 可以想下面这样写

```rb
class Car 
  def self.foo
  end
end
```


## 变量

Ruby中的变量是没有类型Ruby是一门动态类型语言）


### 变量的提升

Ruby中的变量使用时, 必须要先声明, 否则会报错. 
只能通过赋值语句来声明变量，但是却不需要该赋值语句真正被执行。

```rb
# NameError (undefined local variable or method `var' for main:Object)
puts var
```

变量提升

```rb
if false
  a_var = 100
end
# true
puts a_var.nil?
```

### 变量的类型

变量的类型根据: 作用域 和 可变性

Ruby 支持五种类型的变量。

- 局部变量 Variable: `一般小写字母、下划线开头`
- 实例变量 Instance variable `@开头`
- 类变量 Class variable）类变量被共享在整个继承链中. `@@开头`
- 全局变量 Global variable `$开头`
- 常量 Constant `大写字母开头`

### 局部变量

局部变量以小写字母或下划线 _ 开头。

局部变量的作用域 module , class , def 或 do 到相对应的结尾或者从左大括号到右大括号 {}。
局部变量的作用域是最小的也是最安全的.

介绍一个查看局部变量的方法 `local_variables`

```rb
main0 = 'main0'

module MyModule
  module1 = 'module1'
  puts "enter MyModule locals: #{local_variables}"
  
  class MyClass
    class2 = 'class2'
    puts "enter MyClass locals: #{local_variables}"
    
    def my_method
      method_3 = 'method3'
      puts "my_method locals: #{local_variables}"
    end
    
    puts "exit MyClass locals: #{local_variables}"
  end
  
  puts "exit MyModule locals: #{local_variables}"
end
    
obj = MyModule::MyClass.new
obj.my_method
puts "main locals: #{local_variables}"
```

```rb
enter MyModule locals: [:module1]
enter MyClass locals: [:class2]
exit MyClass locals: [:class2]
exit MyModule locals: [:module1]
my_method locals: [:method_3]
main locals: [:main0]
```

每一个作用域都相互独立

class / module 与 def 之间有一点微妙的差别，
在类和模块定义中的代码会被立即执行，
相反，方法定义中的代码只有在方法被调用的时候才会被执行。


### 实例变量

实例变量是类属性，它们在使用类创建对象时就变成对象的属性。
每个对象的属性是单独赋值的，和其他对象之间不共享值。
在类的内部，是使用 @ 运算符访问这些属性，在类的外部，则是使用称为访问器方法的公共方法进行访问。

```rb
class Car 
# 访问器方法
  attr_accessor :name
  def initialize(name)
    @name = name
  end
end

bmw = Car.new('bmw')
benz = Car.new('benz')
puts bmw.name
puts benz.name
```

```rb
# 访问器方法
# 可读可写
attr_accessor :variable_name
# 只读
attr_reader :variable_name
# 只写
attr_writer :variable_name 
```

实例变量的作用域属于实际占有它的对象，一旦进入该对象，
该对象的所有方法都可以对它进行访问，而不用管它定义在哪里。

```rb
class ASuper
  def initialize()
    @my_var = 100
  end
end

class ASubClass < ASuper
  def show_my_var
    @my_var
  end
end

ASubClass.new.show_my_var
```




### 类变量

类变量是在类的所有实例中共享的变量,  以`@@开头`。
`类变量必须在类定义中被初始化`，如下面实例所示
不建议使用类变量, 因为类变量的作用域太大. 


```rb
class Car
  @@foo = 1
  def p_foo
    puts @foo
  end
end

c = Car.new
# 1
c.p_foo
```

非常大的作用域导致可以修改它的地方有很多,出现问题很难进行追踪.
强烈建议`不要`使用类变量


Ruby 也可以轻松实现类似 Java 类变量的方案，那就是借助实例变量来模拟。

```rb
class MyClass
  class << self
    
    def val
      @val
    end
    
    def set(v)
      @val = v
    end
    
  end
end

puts MyClass.val
MyClass.set(100)
puts MyClass.val
```

### 全局变量

Ruby 中只要变量名称以 `$ 开头`，这个变量就是全局变量。全局变量可以在`任何作用域中访问`。
全局变量的问题在于系统中的任何部分都可以修改它们，我们几乎没法追踪谁把他们改成了什么。
因此, 还是`建议能不用就不用`.


```rb
$global_var = 1

3.times { $global_var += 1}
```

### 常量

ruby中的常量，必须在类中定义，不能定义到方法中，常量标识符的`首字母必须大写`。

一旦常量被定义，就不能改变它的值，可以在类的内部直接访问常量，就像是访问变量一样，
但是如果想要在类的外部访问常量，那么您必须使用 ClassName::Constant，
如下面实例所示。

```rb
class Car 
  CONST = ['01' , '02']
end

puts Car::CONST
```

```rb
class Car 
  CONST = ['01' , '02']
  def self.edit_const
    CONST.push '03'
  end
end

Car.edit_const
#  ['01' , '02', '03']
puts Car::CONST
```

有时候，我们想要防止对象被改变。在 Object 中，freeze 方法可实现这点，
它能有效地把一个对象变成一个常量。任何对象都可以通过调用 Object.freeze 进行冻结。
冻结对象不能被修改，也就是说，不能改变它的实例变量。

```rb
CONST = ['01' , '02'].freeze
```

```rb
# ruby-class.rb:15:in `push': can't modify frozen Array (FrozenError)
Car.edit_const
```

### Ruby 伪变量

它们是特殊的变量，有着局部变量的外观，但行为却像常量。您不能给这些变量赋任何值。

`self`: 当前方法的接收器对象。
`true`: 代表 true 的值。
`false`: 代表 false 的值。
`nil`: 代表 undefined 的值。
`__FILE__`: 当前源文件的名称。
`__LINE_`_: 当前行在源文件中的编号。


## 保留字, 多重赋值

### 保留字

https://ruby-doc.org/core-2.7.1/doc/keywords_rdoc.html


### 多重赋值

```rb
a, b, c = 1, 2, 3
```

```rb
a, b, *c = 1, 2, 3, 4, 5
p[a,b,c] #=>[1,2,[3,4,5]]

a, * b, c = 1, 2, 3, 4, 5
p[a,b,c] #->[1,[2,3,4],5]
```

## 参考文档

[理解 Ruby 中的变量作用域](https://jameszhan.github.io/2018/02/03/ruby-variable-scope.html)

