---
outline: deep
---

# 三维向量 Vector3

三维向量表示一个有顺序的、三个为一组的数字组合（标记为 x、y 和 z），可被用来表示很多事物，例如：

- `一个位于三维空间中的点`；
- `一个在三维空间中的方向与长度的定义`。在 three.js 中，长度总是从(0, 0, 0)到(x, y, z)的 Euclidean distance（欧几里德距离，即直线距离），方向也是从(0, 0, 0)到(x, y, z)的方向；
- `任意的、有顺序的、三个为一组的数字组合`。

## 实例化一个三维向量对象

```js
const v3 = new THREE.Vector3(0, 0, 0);
// 获取三维向量的值
console.log("v3", v3); // { x:0, y:0, z:0 }
// 设置三维向量的值
v3.x = 100; // 访问x、y或z属性改变某个分量的值
v3.set(10, 0, 0); // set方法设置向量的值
```

## 位置属性 .position

模型位置 `.position` 属性用一个三维向量表示，那意味着，以后你想改变位置属性，就应该查询文档 Vector3。

```js
// 位置属性 .position 使用 threejs 三维向量对象 Vector3 表示。
console.log("模型位置属性.position的值", mesh.position);
```

## 改变位置属性

通过模型位置属性 `.position` 可以设置模型在场景 Scene 中的位置。模型位置 .position 的默认值是 `THREE.Vector3(0.0,0.0,0.0)`，表示`坐标原点`。

设置网格模型 y 坐标

```js
mesh.position.y = 80;
```

设置模型 xyz 坐标

```js
mesh.position.set(80, 2, 10);
```

## 平移

执行 `.translateX()`、`.translateY()` 等方法本质上改变的都是模型的位置属性 `.position`。

沿着 x 轴正方向平移距离 100

```js
mesh.position = mesh.position + 100;
// 等价于
mesh.translateX(100);
```

沿着 Z 轴负方向平移距离 50

```js
mesh.translateZ(-50);
```

沿着自定义的方向移动

```js
// 向量 Vector3 对象表示方向
const axis = new THREE.Vector3(1, 1, 1);
// 向量归一化
axis.normalize();
// 沿着axis轴表示方向平移100
mesh.translateOnAxis(axis, 100);
```

## 缩放

属性 `.scale` 表示模型对象的 xyz 三个方向上的缩放比例，.scale 的属性值是一个三维向量对象 Vector3，默认值是 `THREE.Vector3(1.0, 1.0, 1.0)`。

x 轴方向放大 2 倍

```js
mesh.scale.x = 2.0;
```

网格模型 xyz 方向分别缩放 0.5，1.5，2 倍

```js
mesh.scale.set(0.5, 1.5, 2);
```

## .normalize ()

`将该向量转换为单位向量`，也就是说，将该向量的方向设置为和原向量相同，但是其长度为 1。
