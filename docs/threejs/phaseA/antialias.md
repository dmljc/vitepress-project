---
outline: deep
---

# WebGL 渲染器设置

一般实际开发，WebGL 渲染器需要进行一些通用的基础配置，比如：`锯齿问题` 和 `渲染模糊`。

## 锯齿问题

WebGLRenderer 渲染器可以开启`抗锯齿属性`，解决锯齿问题。

```js
const renderer = new THREE.WebGLRenderer({
    antialias: true, 
});
```
或者

```js
renderer.antialias = true,
```

## Canvas 模糊问题

若 Canvas 画布输出模糊，请设置 `renderer.setPixelRatio(window.devicePixelRatio)`。

>设备像素比 `.devicePixelRatio` 是 window 对象的一个属性，该属性的值和`硬件设备屏幕`相关，不同硬件设备的屏幕 window.devicePixelRatio 值可能不同，可能是1、1.5、2.0 等。

```js
renderer.setPixelRatio(window.devicePixelRatio);
```
::: tip 注意：
若你的硬件设备设备像素比 `window.devicePixelRatio` 刚好是 **1**，那么是否执行.setPixelRatio()不会有明显差异，不过为了适应不同的硬件设备屏幕，通常需要执行该方法。
:::

## 设置 Canvas 背景颜色

```js
// 蓝色
renderer.setClearColor(0x0000ff, 1); 
```
