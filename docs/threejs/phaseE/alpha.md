---
outline: deep
---

# Three.js 背景透明度

通过 Three.js 渲染一个模型的时候，不希望 canvas 画布有背景颜色，也就是 canvas 画布完全透明，可以透过 canvas 画布看到画布后面叠加的 HTML 元素图文，呈现出来一种三维模型悬浮在网页上面的效果。

![alpha](/phaseE/alpha.jpg)

## canvas 画布插入到 web 页面上

```js
<div id="webgl"></div>;

document.getElementById("webgl").appendChild(renderer.domElement);
```

## .setClearAlpha()方法

改变背景透明度值

```js
renderer.setClearAlpha(0.8);
```

完全透明

```js
renderer.setClearAlpha(0.0);
```

## 背景透明 alpha: true

通过 Three.js 渲染器`WebGLRenderer`的`alpha`属性值设置为`true`就可以，`WebGL渲染器`的`alpha`属性默认值是`false`。

```js
// 在构造函数参数中设置alpha属性的值
var renderer = new THREE.WebGLRenderer({
  alpha: true,
});
```

## .setClearColor()方法

`.setClearColor()`方法的`参数2`，可以用来设置背景颜色`透明度`。

```js
renderer.setClearColor(0xb9d3ff, 0.4); //设置背景颜色和透明度
```
