---
outline: deep
---

# UI交互界面与Canvas画布叠加

本节课把threejs Cavnas画布和HTML元素`叠加布局`时候，可能遇到问题演示下，以后遇到类似的问题知道怎么排查。

## 插入div元素

```html
<div style="color: #ff0000;">红色</div>
```

## canvas画布绝对定位

如果你想设置threejs Canvas画布的style属性，可以通过`renderer.domElement`访问。

```js
// canvas画布绝对定位
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = '0px';
renderer.domElement.style.left = '0px';
```

这时候你会发现你插入的div元素看不到了，这涉及到`z-index`的CSS布局知识点，`具体说就是当两个HTML元素位置重合，谁在上谁在下的问题`。

## 设置z-index

通过z-index改变HTML元素上下叠加关系，如果你忘记了CSS该属性，可以复习下。

```js
renderer.domElement.style.zIndex = -1;
```

```html
<div style="color: #ff0000; z-index:2; position: relative;">红色</div>
```

注意默认的定位 position: static，设置z-index无效。

## 插入的div元素绝对定位

不设置three.js Canvas元素style，插入的div元素绝对定位，这样也可以把div元素叠加到threejs Canvas花画布上。

```html
<div style="color: #ff0000; z-index:2; position: absolute;">红色</div>
```
