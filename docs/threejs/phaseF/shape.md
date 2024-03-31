---
outline: deep
---

# 轮廓填充 ShapeGeometry

有些时候已知一个多边形的外轮廓坐标，想通过这些外轮廓坐标生成一个多边形几何体平面，这时候你可以借助threejs提供的轮廓填充`ShapeGeometry`几何体实现。

![shape](/phaseF/shape.jpg)

## 多边形轮廓 Shape

通过下面代码定义了5个点坐标，构成一个五边形区域，注意顺序问题，随意选择一个点作为起点都行，然后按照顺时针或逆时针依次写下点的坐标。

```js
// 一组二维向量表示一个多边形轮廓坐标
const pointsArr = [
    new THREE.Vector2(-50, -50),
    new THREE.Vector2(-60, 0),
    new THREE.Vector2(0, 50),
    new THREE.Vector2(60, 0),
    new THREE.Vector2(50, -50),
]
```

这一组二维顶点坐标作为`Shape`的参数构成一个`多边形轮廓`。

```js
// Shape表示一个平面多边形轮廓，参数是二维向量构成的数组pointsArr
const shape = new THREE.Shape(pointsArr);
```

## 轮廓填充几何体 ShapeGeometry

把五边形轮廓`Shape`作为`ShapeGeometry`的参数，形成一个`多边形平面几何体`。

```js
const geometry = new THREE.ShapeGeometry(shape);
```

## 查看 ShapeGeometry 生成的三角形

`ShapeGeometry`形成一个`多边形平面几何体`，本质上就是根据轮廓坐标计算出一系列三角形面填充多边形，关于三角形的概念可以回一下章节2关于三角形概念的讲解。有了`ShapeGeometry`，计算三角形的算法就不用自己写了。

![shapeWireframe](/phaseF/shapeWireframe.jpg)

```js
const material = new THREE.MeshLambertMaterial({
    // 将几何体渲染为线框。默认值为false（即渲染为平面多边形）。
    wireframe: true, 
});
```

## 示例代码如下：

::: code-group
```js [model.js]
import * as THREE from 'three';

// 一组二维向量表示一个多边形轮廓坐标
const pointsArr = [
    new THREE.Vector2(-50, -50),
    new THREE.Vector2(-60, 0),
    new THREE.Vector2(0, 50),
    new THREE.Vector2(60, 0),
    new THREE.Vector2(50, -50),
]
// Shape表示一个平面多边形轮廓，参数是二维向量构成的数组pointsArr
const shape = new THREE.Shape(pointsArr);
// 多边形shape轮廓作为ShapeGeometry参数，生成一个多边形平面几何体
const geometry = new THREE.ShapeGeometry(shape);

const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    side:THREE.DoubleSide
});
const mesh = new THREE.Mesh(geometry, material);

export default mesh;
```
:::