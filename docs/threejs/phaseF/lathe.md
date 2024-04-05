---
outline: deep
---

# 旋转成型 LatheGeometry

生活中有很多的几何体具备`旋转特征`，three.js 提供了一个类`LatheGeometry()`，`LatheGeometry()`可以利用一个 2D 轮廓，经过旋转变换生成一个 3D 的几何体曲面。

![lathe](/phaseF/lathe.png)

## 成品效果

![lathe](/phaseF/lathe.jpg)

## 格式

```js
LatheGeometry(points, segments, phiStart, phiLength);
```

| 参数      | 值                               |
| :-------- | :------------------------------- |
| points    | Vector2 表示的坐标数据组成的数组 |
| segments  | 圆周方向细分数，默认 12          |
| phiStart  | 开始角度,默认 0                  |
| phiLength | 旋转角度，默认 2π                |

- `LatheGeometry`类第一个参数就是`旋转轮廓`，旋转轮廓使用多个二维向量`Vector2`表示的 xy 坐标去描述。
- `LatheGeometry`的旋转轮廓默认绕`y轴`旋转生成曲面几何体。

```js
// Vector2表示的三个点坐标，三个点构成的轮廓相当于两端直线相连接
const pointsArr = [
  new THREE.Vector2(50, 60),
  new THREE.Vector2(25, 0),
  new THREE.Vector2(50, -60),
];
// pointsArr：旋转几何体的旋转轮廓形状
const geometry = new THREE.LatheGeometry(pointsArr);
```

## 旋转细分精度

```js
// 30：旋转圆周方向几何体细分精度
const geometry = new THREE.LatheGeometry(pointsArr, 30);
```

## 旋转角度

```js
// 0, Math.PI：旋转的开始角度和结束角度
const geometry = new THREE.LatheGeometry(pointsArr, 30, 0, Math.PI);
```

## 曲线生成旋转轮廓

通过二维样条曲线`SplineCurve`生成一个光滑的曲线旋转轮廓。

```js
import * as THREE from "three";

// Vector2 表示的三个点坐标
const pointsArr = [
  new THREE.Vector2(50, 60),
  new THREE.Vector2(25, 0),
  new THREE.Vector2(50, -60),
];
// 通过三点定一个二维样条曲线
const curves = new THREE.SplineCurve(pointsArr);
// 曲线上获取点，作为旋转几何体的旋转轮廓
const points = curves.getPoints(50);

// pointsArr 轮廓绕y轴旋转生成几何体曲面
const geometry = new THREE.LatheGeometry(points, 30);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry, material);
export default mesh;
```
