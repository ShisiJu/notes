文本的坐标

```js

```

不同的分辨率下

坐标位置会变;

例如, 在 `1920*1080`与`1600*900`的分辨率下;
canvas 文字的位置是不同的

```js
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
ctx.rotate(-0.34);
document.querySelector("body").insertAdjacentElement("afterbegin", canvas);
ctx.fillText("文字~~~", 100, 100);
```
