---
outline: deep
---

# UV 动画

本节课通过纹理对象的偏移属性`.offse`t 给大家实现一个`UV动画`效果。

## 纹理对象.offset 属性

理对象`Texture`的`.offset`的功能是`偏移贴图在Mesh上位置`，本质上相当于修改了`UV顶点坐标`。

```js
// 纹理U方向偏移
texture.offset.x += 0.5;

// 纹理V方向偏移
texture.offset.y += 0.5;
```

## 纹理对象.wrapS 或.wrapT 与.offset 组合使用

你可以对比，当你通过`.offset`设置了纹理映射偏移后，是否把`.wrapS`或`.wrapT`设置为重复映射模式`THREE.RepeatWrapping`，两种情况的渲染效果差异。

```js
// 纹理U方向偏移
texture.offset.x += 0.5;
// 设置.wrapS也就是U方向，纹理映射模式(包裹模式)
texture.wrapS = THREE.RepeatWrapping; // 对应offste.x偏移

// 纹理V方向偏移
texture.offset.y += 0.5;
// 设置.wrapT也就是V方向，纹理映射模式
texture.wrapT = THREE.RepeatWrapping; // 对应offste.y偏移
```

## 纹理 UV 动画

`纹理对象Texture`的`.offset`的功能是`偏移贴图在Mesh上位置`。

```js
// 渲染循环
function render() {
  // 设置纹理动画：偏移量根据纹理和动画需要，设置合适的值
  texture.offset.x += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
```

## 纹理贴图阵列 + UV 动画

通过阵列纹理贴图设置`.map`，这样的话`贴图像素`可以更小一些。

```js
// 设置U方向阵列模式
texture.wrapS = THREE.RepeatWrapping;

// uv两个方向纹理重复数量
// 注意选择合适的阵列数量
texture.repeat.x = 50;
```

```js
// 渲染循环
function render() {
  //设置纹理动画：偏移量根据纹理和动画需要，设置合适的值
  texture.offset.x += 0.1;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
```
