---
outline: deep
---

# 样条曲线

对于一些`不规则的曲线`，很难用一个圆、椭圆或抛物线函数去描述，这时候，可以使用threejs提供的`样条曲线`或`贝塞尔曲线`去表达。

![spline](/phaseF/spline.svg)

## 三维样条曲线CatmullRomCurve3

在三维空间中随意设置几个`顶点坐标`，然后作为三维样条曲线`CatmullRomCurve3`的参数，你就可以生成一条穿过这几个点的`光滑曲线`。

`CatmullRomCurve3`的参数是三维向量对象`Vector3`构成的数组。

## 从曲线获取顶点坐标，绘制线条

从曲线获取一定量顶点数据，用于绘制线模型Line，一般来说获取顶点数量越多，渲染的曲线相对越光滑。

![splineLine](/phaseF/splineLine.jpg)   

```js
// 从曲线上获取顶点坐标
const pointsArr = curve.getPoints(50);

// 创建没有任何形状的空几何体
const geometry = new THREE.BufferGeometry();

// 把曲线上获取的顶点坐标赋值给几何体对象
geometry.setFromPoints(pointsArr);

// 创建线材质
const material = new THREE.LineBasicMaterial({
    color: 0x000000
});

// 创建线模型
const model = new THREE.Line(geometry, material);
```

## 点模型可视化曲线经过的点

点模型可视化曲线经过的点，验证样条曲线是否经过数数组arr表示的几个顶点坐标。

![splinePoints](/phaseF/splinePoints.jpg)  

## 2D样条曲线

`CatmullRomCurve3`是3D样条曲线API，曲线经过的点可以在3D空间中任何一个位置，二维样条曲线`SplineCurve`默认情况下就是在`XOY平面`生成一个平面的样条曲线。

![2Dline](/phaseF/2Dline.jpg)

`SplineCurve`的参数是二维向量对象`Vector2`构成的数组。


```js
// 二维向量Vector2创建一组顶点坐标
const arr = [
    new THREE.Vector2(-10, 0),
    new THREE.Vector2(0, 3),
    new THREE.Vector2(10, 0),
];
// 二维样条曲线
const curve = new THREE.SplineCurve(arr);
```


## 示例代码如下

::: code-group

```vue [index.vue]
代码同 生成圆弧顶点 章节
```

```js [model.js]
import * as THREE from 'three';

// 三维向量Vector3创建一组顶点坐标
// const arr = [
//     new THREE.Vector3(-5, 2, 9),
//     new THREE.Vector3(-1, 4, 4),
//     new THREE.Vector3(0, 0, 0),
//     new THREE.Vector3(6, -6, 0),
//     new THREE.Vector3(7, 0, 8)
// ];

// // 创建三维样条曲线
// const curve = new THREE.CatmullRomCurve3(arr);

// 二维向量Vector2创建一组顶点坐标
const arr = [
    new THREE.Vector2(-10, 0),
    new THREE.Vector2(0, 3),
    new THREE.Vector2(10, 0),
];
// 二维样条曲线
const curve = new THREE.SplineCurve(arr);

// 从曲线上获取顶点坐标
const pointsArr = curve.getPoints(50);

// 创建没有任何形状的空几何体
const geometry = new THREE.BufferGeometry();

// 把曲线上获取的顶点坐标赋值给几何体对象
geometry.setFromPoints(pointsArr);

// 创建点材质
// const material = new THREE.PointsMaterial({
//     color: 0xff0000,
// });

// 创建点模型
// const model = new THREE.Points(geometry, material);

// 创建线材质
const material = new THREE.LineBasicMaterial({
    color: 0x000000
});

// 创建线模型
const model = new THREE.Line(geometry, material);

export default model;
:::