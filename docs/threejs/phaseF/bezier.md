---
outline: deep
---

# 贝塞尔曲线

上节课讲解过，threejs可以通过`样条曲线`或`贝塞尔曲线`去表达生活中不规则的曲线，下面给大家介绍贝塞尔曲线有关的知识。

![spline](/phaseF/spline.svg)

## 二维二次贝塞尔曲线 QuadraticBezierCurve

```js
// p1、p2、p3表示三个点坐标
// p1、p3是曲线起始点，p2是曲线的控制点
const p1 = new THREE.Vector2(-8, 0);
const p2 = new THREE.Vector2(2, 10);
const p3 = new THREE.Vector2(8, 0);
```
