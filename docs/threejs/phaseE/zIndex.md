---
outline: deep
---

# UI 交互界面与 Canvas 画布叠加

本节课把 threejs Cavnas 画布和 HTML 元素`叠加布局`时候，可能遇到问题演示下，以后遇到类似的问题知道怎么排查。

## 插入 div 元素

```html
<div style="color: #ff0000;">红色</div>
```

## canvas 画布绝对定位

如果你想设置 threejs Canvas 画布的 style 属性，可以通过`renderer.domElement`访问。

```js
// canvas画布绝对定位
renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = "0px";
renderer.domElement.style.left = "0px";
```

这时候你会发现你插入的 div 元素看不到了，这涉及到`z-index`的 CSS 布局知识点，`具体说就是当两个HTML元素位置重合，谁在上谁在下的问题`。

## 设置 z-index

通过 z-index 改变 HTML 元素上下叠加关系，如果你忘记了 CSS 该属性，可以复习下。

```js
renderer.domElement.style.zIndex = -1;
```

```html
<div style="color: #ff0000; z-index:2; position: relative;">红色</div>
```

注意默认的定位`position: static`，设置`z-index无效`。

## 插入的 div 元素绝对定位

不设置 three.js Canvas 元素 style，插入的 div 元素绝对定位，这样也可以把 div 元素叠加到 threejs Canvas 花画布上。

```html
<div style="color: #ff0000; z-index:2; position: absolute;">红色</div>
```
