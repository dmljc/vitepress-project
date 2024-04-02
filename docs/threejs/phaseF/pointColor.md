---
outline: deep
---

# 几何体顶点颜色数数据

章节2中介绍过顶点位置、顶点法向量数据，下面给大家介绍顶点颜色`.attributes.color`数据。

- 顶点位置数据`geometry.attributes.position`
- 顶点法向量数据`geometry.attributes.normal`
- 顶点UV数据`geometry.attributes.uv`
- 顶点颜色数据`geometry.attributes.color`

## 几何体顶点颜色 .attributes.position

几何体`BufferGeometry`顶点位置数据`.attributes.position`。

```js
// 创建一个几何体对象
const geometry = new THREE.BufferGeometry(); 
// 类型数组创建顶点数据
const vertices = new Float32Array([
    0, 0, 0, // 顶点1坐标
    50, 0, 0, // 顶点2坐标
    0, 25, 0, // 顶点3坐标
]);
// 创建属性缓冲区对象
// 3个为一组，表示一个顶点的xyz坐标
const attribue = new THREE.BufferAttribute(vertices, 3);
// 设置几何体 attributes 属性的位置属性
geometry.attributes.position = attribue;
```

## 几何体顶点颜色.attributes.color

与几何体`BufferGeometry`顶点位置数据`.attributes.position`一一对应的顶点颜色数据`.attributes.color`。每个点对应一个位置数据，同时对应一个颜色数据。

```js
// 类型数组创建顶点颜色color数据
const colors = new Float32Array([
    1, 0, 0, // 顶点1颜色
    0, 0, 1, // 顶点2颜色
    0, 1, 0, // 顶点3颜色
]);
// 3个为一组，表示一个顶点的颜色数据RGB
const color = new THREE.BufferAttribute(colors, 3);
// 设置几何体attributes属性的颜色color属性
geometry.attributes.color = color;
```

## 点模型 Points 渲染顶点颜色数据

通过点、线、网格模型渲染几何体`Geometry`，如果希望顶点颜色`.attributes.color`起作用，需要设置材质属性`vertexColors: true`，下面以以点模型为例给大家演示，你可以看到`geometry`的不同点被你设置为了不同颜色。

```js
// 点渲染模式
const material = new THREE.PointsMaterial({
    // color: 0x00fff, // 使用顶点颜色数据，color属性可以不用设置
    vertexColors: true,// 默认false，设置为true表示使用顶点颜色渲染
});
// 点模型对象
const mesh = new THREE.Points(geometry, material);
```

上述代码效果如下所示：

![pointColor](/phaseF/pointColor.jpg)

## 颜色渐变(颜色插值)

自定几何体顶点颜色数据，然后用线模型`Line`渲染，你可以看到直线的颜色是`渐变的`。

下面代码两端直线，分别是红色到蓝色渐变、蓝色到绿色渐变。

![lineColor](/phaseF/lineColor.jpg)

```js
// 类型数组创建顶点颜色color数据
const colors = new Float32Array([
    1, 0, 0, // 顶点1颜色
    0, 0, 1, // 顶点2颜色
    0, 1, 0, // 顶点3颜色
]);
// 3个为一组，表示一个顶点的颜色数据RGB
const color = new THREE.BufferAttribute(colors, 3);
// 设置几何体attributes属性的颜色color属性
geometry.attributes.color = color;

// 点渲染模式
const material = new THREE.PointsMaterial({
    vertexColors: true,// 默认false，设置为true表示使用顶点颜色渲染
});

const mesh = new THREE.Line(geometry, material);
mesh.translateX(10);
mesh.translateY(10);
```

![rgb](/phaseF/rgb.png)

## 网格模型颜色渐变

自定几何体顶点颜色数据，然后用网格模型`Mesh`渲染，和`Line`一样，也会产生颜色渐变效果。

![meshColor](/phaseF/meshColor.jpg)

```js
// 线模型对象 
const mesh = new THREE.Line(geometry, material); // [!code --]
// 网格模型对象
const mesh = new THREE.Mesh(geometry, material); // [!code ++]
```

## 示例代码如下

::: code-group
```vue [index.vue]
代码同 生成圆弧顶点 章节
```

```js [model.js]
import * as THREE from 'three';

// 创建一个几何体对象
const geometry = new THREE.BufferGeometry(); 
// 类型数组创建顶点数据
const vertices = new Float32Array([
    0, 0, 0, // 顶点1坐标
    50, 0, 0, // 顶点2坐标
    0, 25, 0, // 顶点3坐标
]);
// 创建属性缓冲区对象
// 3个为一组，表示一个顶点的xyz坐标
const attribue = new THREE.BufferAttribute(vertices, 3);
// 设置几何体 attributes 属性的位置属性
geometry.attributes.position = attribue;

// 类型数组创建顶点颜色color数据
const colors = new Float32Array([
    1, 0, 0, // 顶点1颜色
    0, 0, 1, // 顶点2颜色
    0, 1, 0, // 顶点3颜色
]);
// 3个为一组，表示一个顶点的颜色数据RGB
const color = new THREE.BufferAttribute(colors, 3);
// 设置几何体attributes属性的颜色color属性
geometry.attributes.color = color;

// 点渲染模式
const material = new THREE.PointsMaterial({
    // color: 0x00fff, // 使用顶点颜色数据，color属性可以不用设置
    vertexColors: true,// 默认false，设置为true表示使用顶点颜色渲染
    size: 20.0, // 点对象像素尺寸
});
// 点模型对象
// const points = new THREE.Points(geometry, material);
// 线模型对象
// const mesh = new THREE.Line(geometry, material);
// 网格模型对象
const mesh = new THREE.Mesh(geometry, material); 
mesh.translateX(10);
mesh.translateY(10);
export default mesh;
```
:::

