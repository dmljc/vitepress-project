---
outline: deep
---

# 曲线Curve简介

上节课程绘制一个圆弧线是自己通过算法实现，其实threejs提供了很多常用的曲线或直线API，可以直接使用。这些API曲线都有一个共同的父类`Curve`。

![Curve](/phaseF/Curve.svg)

::: info 缓冲类型几何体BufferGeometry:
threejs的长方体`BoxGeometry`、球体`SphereGeometry`等几何体都是基于`BufferGeometry`类构建的，`BufferGeometry`是一个`没有任何形状的空几何体`，你可以通过`BufferGeometry`自定义任何几何形状，具体一点说就是`定义顶点数据`。
:::

## 椭圆EllipseCurve例子

曲线API的使用，具体语法可以查询文档，下面以椭圆为例，给大家绘制一个`椭圆曲线效果`。

```js
// 参数1和2表示椭圆中心坐标 参数3和4表示x和y方向半径
const arc = new THREE.EllipseCurve(0, 0, 100, 50);
```

## 曲线Curve方法.getPoints()

椭圆弧线`EllipseCurve`的父类是曲线`Curve`,自然会继承父类曲线`.getPoints()`方法，通过`.getPoints()`可以从曲线上获取`顶点数据`。

通过方法`.getPoints()`可以从曲线上按照一定的细分精度返回沿着曲线分布的顶点坐标。细分数越高返回的顶点数量越多，自然轮廓越接近于曲线形状。方法`.getPoints()`的返回值是一个由二维向量Vector2或三维向量Vector3构成的数组，Vector2表示位于同一平面内的点，Vector3表示三维空间中一点。

```js
// 分段数50，返回51个顶点
const pointsArr = arc.getPoints(50);
```
## .setFromPoints()提取曲线坐标数据

把数组`pointsArr`里面的坐标数据提取出来，赋值给`geometry.attributes.position`属性。

```js
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsArr);
```

## 点模型查看曲线上顶点坐标

```js
// 点材质
const material = new THREE.PointsMaterial({
    color: 0xffff00,
    size: 1 //点对象像素尺寸
}); 
// 点模型
const points = new THREE.Points(geometry, material);
```

## 曲线Curve方法.getSpacedPoints()

通过`.getSpacedPoints()`和`.getPoints()`一样也可以从曲线`Curve`上返回一系列曲线上的`顶点坐标`。
通过`.getSpacedPoints()`是按照曲线长度等`间距返回顶点数据`，`.getPoints()`获取点的方式并不是按照曲线等间距的方式，而是`会考虑曲线斜率变化`，`斜率变化快的位置返回的顶点更密集`。

```js
const geometry = new THREE.BufferGeometry();
geometry.getSpacedPoints(pointsArr);
```

如果你有等间距取点的需求，可以选择`.getSpacedPoints()`方法，如果没有，就可以使用`.getPoints()`方法。

## 线模型绘制曲线

```js
// 线材质
const material = new THREE.LineBasicMaterial({
    color: 0x00fffff,
});
// 线模型
const line = new THREE.Line(geometry, material);
```

## 示例代码如下：

::: code-group
```vue [index.vue]
代码同 生成圆弧顶点 章节
```

```js [model.js]
import * as THREE from 'three';

// 绘制椭圆弧线
const arc = new THREE.EllipseCurve(0, 0, 100, 50, 0, Math.PI, false);

// 获取椭圆上的顶点数据
const pointsArr = arc.getPoints(50);

// 创建空材质对象
const geometry = new THREE.BufferGeometry();

// 把椭圆上的顶点数据赋值给材质对象
geometry.setFromPoints(pointsArr);

// 创建线材质
const material = new THREE.LineBasicMaterial({
    color: 0x00ffff,
    side: 2
});

// 创建线模型
const model = new THREE.Line(geometry, material);

export default model;
```
:::

