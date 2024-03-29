---
outline: deep
---

# 几何体方法.setFromPoints()

![setFromPoints](/phaseF/setFromPoints.jpg)

前几节给大家介绍过几何体`BufferGeometry`顶点数据，本节课在前几节的基础上，给大家介绍该几何体的一个方法`.setFromPoints()`。

## 三维向量Vector3表示顶点坐标

用三维向量`Vector3`表示顶点的x、y、z坐标，作为数组元素创建一组`顶点坐标`。

```js
const pointsArr = [
    // 三维向量Vector3表示的坐标值
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 100, 0),
    new THREE.Vector3(0, 100, 100),
    new THREE.Vector3(0, 0, 100)
];
```

## 几何体方法.setFromPoints()

`.setFromPoints()`是几何体`BufferGeometry`的一个方法，`通过该方法可以把数组pointsArr中坐标数据提取出来赋值给几何体`。具体说就是把pointsArr里面坐标数据提取出来，赋值给`geometry.attributes.position`属性。

```js
geometry.setFromPoints(pointsArr);
console.log('几何体变化', geometry.attributes.position);
```

## 二维向量Vector2表示顶点坐标

用二维向量Vector2表示顶点的x、y坐标，作为数组元素创建一组顶点坐标。

```js
const pointsArr = [
    // 三维向量Vector2表示的坐标值
    new THREE.Vector2(0, 0),
    new THREE.Vector2(100, 0),
    new THREE.Vector2(100, 100),
    new THREE.Vector2(0, 100),
];
```

二维向量Vector2构成的数组作为.setFromPoints()的参数

```js
geometry.setFromPoints(pointsArr);
```
## 示例代码如下

::: code-group

```vue [index.vue]
同上节课代码
```

```js [model.js]
import * as THREE from 'three';

// 坐标数据
const pointsArr = [
    // 三维向量Vector3表示的坐标值
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 100, 0),
    new THREE.Vector3(0, 100, 100),
    new THREE.Vector3(0, 0, 100)

    // 三维向量Vector2表示的坐标值
    // new THREE.Vector2(0,0),
    // new THREE.Vector2(100,0),
    // new THREE.Vector2(100,100),
    // new THREE.Vector2(0,100),
];

const geometry = new THREE.BufferGeometry();

// 把数组pointsArr里面的坐标数据提取出来，
// 赋值给`geometry.attributes.position`属性
geometry.setFromPoints(pointsArr);

// 点材质
const material = new THREE.PointsMaterial({
    color: 0x00ffff,
    size: 10 //点对象像素尺寸
});

// 点模型
const model = new THREE.Points(geometry, material);

export default model;
:::
