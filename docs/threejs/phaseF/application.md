---
outline: deep
---

# 样条、贝塞尔曲线应用

曲线 API 在大屏可视化中的应用如下：

表示一个`飞线曲线轨迹`有多重方案，`圆弧`、`椭圆弧`、`贝塞尔`、`样条`...

比如你有一个项目，已知平面上两个点坐标(-100,-100)、(100,100)，需要生成一条飞线轨迹线，要求轨迹线把这两个点作为起始点，曲线有一定的高度。

![application1](/phaseF/application1.jpg)
![application2](/phaseF/application2.jpg)

## 三维样条曲线 CatmullRomCurve3 实现飞线轨迹

![quxianxg](/phaseF/quxianxg.jpg)

下面曲线的起始点设置在 XOZ 平面上，y 方向为曲线高度方向。

```js
// p1、p3轨迹线起始点坐标
const p1 = new THREE.Vector3(-100, 0, -100);
const p3 = new THREE.Vector3(100, 0, 100);
// 计算p1和p3的中点坐标
const x2 = (p1.x + p3.x) / 2;
const z2 = (p1.z + p3.z) / 2;
const h = 50;
const p2 = new THREE.Vector3(x2, h, z2);
const arr = [p1, p2, p3];
// 三维样条曲线
const curve = new THREE.CatmullRomCurve3(arr);
```

## 三维二次贝赛尔曲线 QuadraticBezierCurve3 实现飞线轨迹

下面曲线的起始点设置在 XOZ 平面上，y 方向为曲线高度方向。

```js
// p1、p3轨迹线起始点坐标
const p1 = new THREE.Vector3(-100, 0, -100);
const p3 = new THREE.Vector3(100, 0, 100);
// 计算p1和p3的中点坐标
const x2 = (p1.x + p3.x) / 2;
const z2 = (p1.z + p3.z) / 2;
const h = 100;
const p2 = new THREE.Vector3(x2, h, z2);
const arr = [p1, p2, p3];
// 三维二次贝赛尔曲线
const curve = new THREE.QuadraticBezierCurve3(...arr);
```

## 样条曲线和贝塞尔曲线代码区别如下

```js
// p1、p3轨迹线起始点坐标
const p1 = new THREE.Vector3(-100, 0, -100);
const p3 = new THREE.Vector3(100, 0, 100);
// 计算p1和p3的中点坐标
const x2 = (p1.x + p3.x) / 2;
const z2 = (p1.z + p3.z) / 2;
const h = 50; // [!code --]
const h = 100; // [!code ++]
const p2 = new THREE.Vector3(x2, h, z2);
const arr = [p1, p2, p3];
// 三维样条曲线
const curve = new THREE.CatmullRomCurve3(arr); // [!code --]
// 三维二次贝赛尔曲线
const curve = new THREE.QuadraticBezierCurve3(...arr); // [!code ++]
```
