---
outline: deep
---

# gui.js 库：可视化改变三维场景

gui.js 说白了就是一个前端 js 库，对 HTML、CSS 和 JavaScript 进行了封装，学习开发的时候，借助 gui.js 可以快速创建控制三维场景的 UI 交互界面，方便调试，效果如下：

![gui.js](/phaseA/gui.jpg)

## 引入 gui.js

```js
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
```

## 创建一个 GUI 对象

创建一个 GUI 对象，你可以看到浏览器右上角多了一个交互界面，GUI 本质上就是一个前端 js 库。

```js
const gui = new GUI();
```

## .domElement：改变 GUI 界面默认的 style 属性

通过`.domElement`属性可以获取 gui 界面的 HTML 元素，那就意味着你可以改变默认的 style 样式，比如位置、宽度等。

```js
gui.domElement.style.right = "0px";
gui.domElement.style.width = "300px";
```

## .add()方法

gui 的.add()方法可以快速创建一个 UI 交互界面，比如一个拖动条，可以用来改变一个 JavaScript 对象属性的属性值。

`格式：.add(控制对象，对象具体属性，其他参数)`

`其他参数`，一个或多个，数据类型也可以不同，gui 会自动根据参数形式，生成对应的交互界面。

参数 3 和参数 4，分别是一个数字，交互界面是一个鼠标可以拖动的拖动条，可以在一个区间改变属性的值。

执行 gui.add(obj, 'x', 0, 100)；你可以发现右上角 gui 界面增加了新的内容，可以控制 obj 对象 x 属性的新交互界面。

```js
// 创建一个对象，对象属性的值可以被GUI库创建的交互界面改变
const obj = {
  x: 30,
};
// gui 增加交互界面，用来改变obj对应属性
gui.add(obj, "x", 0, 100);
```

## gui 改变 js 对象多个属性

```js
const obj = {
  x: 30,
  y: 60,
  z: 300,
};
// gui界面上增加交互界面，改变obj对应属性
gui.add(obj, "x", 0, 100);
gui.add(obj, "y", 0, 50);
gui.add(obj, "z", 0, 60);
```

## gui 改变光照强度

three.js 在调试场景渲染效果的时候，比如`光照强度`，人大脑的 CPU 是没有能力通过光照参数算出来模型渲染效果的，一般来说你先大概给一个经验值，然后通过 gui 在这个大概值的基础上下浮动可视化调试。

光源对象具有一个光照强度属性`.intensity`，可以通过 gui 拖动条改变该属性。

```js
gui.add(ambient, "intensity", 0, 2.0);
```

## gui 改变模型位置

mesh.position 是 JavaScript 对象，具有 x、y、z 属性，这三个属性分别表示模型的 xyz 坐标，这就是说，gui 改变 mesh.position 的 x、y、z 属性，就可以可视化改变 mesh 的位置。

```js
gui.add(mesh.position, "x", 0, 180);
gui.add(mesh.position, "y", 0, 180);
gui.add(mesh.position, "z", 0, 180);
```
