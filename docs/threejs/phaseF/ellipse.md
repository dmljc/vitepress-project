---
outline: deep
---

# 椭圆、圆 弧线绘制

接着上节课内容给大家介绍`椭圆`和`圆曲线`。

## 椭圆弧线 EllipseCurve

```js
EllipseCurve(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise);
```

| 参数        |                            含义                             |
| ----------- | :---------------------------------------------------------: |
| aX, aY      |                        椭圆中心坐标                         |
| xRadius     |                        椭圆 x 轴半径                        |
| yRadius     |                        椭圆 y 轴半径                        |
| aStartAngle |      弧线开始角度，从 x 轴正半轴开始，默认 0，弧度单位      |
| aEndAngle   | 弧线结束角度，从 x 轴正半轴算起，默认 2 x Math.PI，弧度单位 |
| aClockwise  |               是否顺时针绘制，默认值为 false                |

```js
// 参数1和2表示椭圆中心坐标  参数3和4表示x和y方向半径
const arc = new THREE.EllipseCurve(0, 0, 100, 50);
```

`椭圆曲线x和y方向半径相同，就是一个圆的效果。`

```js
// 参数1和2表示椭圆中心坐标  参数3和4表示x和y方向半径
const arc = new THREE.EllipseCurve(0, 0, 50, 50);
```

## 曲线精度

```js
// 曲线上取点，参数表示取点细分精度
const pointsArr = arc.getPoints(50); // 分段数50，返回51个顶点
// const pointsArr = arc.getPoints(10);// 取点数比较少，圆弧线不那么光滑
// const pointsArr = arc.getPoints(10000);// 取点数比较多，圆弧线虽然很光滑，但是影响性能
```

## 弧线起始角度

参数 4 和 5 表示圆弧线的起始角度，three.js 默认是一个完整的圆弧，其实你也可以绘制一个半圆弧。

```js
// 完整圆弧
const arc = new THREE.ArcCurve(0, 0, 100, 0, 2 * Math.PI);

// 半圆弧
const arc = new THREE.ArcCurve(0, 0, 100, 0, Math.PI);

// 四分之一圆弧
const arc = new THREE.ArcCurve(0, 0, 100, 0, Math.PI / 2);
```

## 顺逆时针

参数 6 默认`false`，`逆时针`绘制圆弧。

```js
const arc = new THREE.ArcCurve(0, 0, 100, 0, Math.PI / 2, false);

顺时针绘制圆弧; // [!code warning]
const arc = new THREE.ArcCurve(0, 0, 100, 0, Math.PI / 2, true); // [!code warning]
```
