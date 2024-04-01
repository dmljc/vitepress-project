---
outline: deep
---

# 多边形轮廓 Shape (圆弧)

先掌握上节课关于`Shape`内容，再继续学习本节课关于`Shape`圆弧的介绍。

![shapePath](/phaseF/shapePath.svg)

## 圆弧方法 .arc()

圆弧方法`.arc()`使用方式和原来学习过的圆弧曲线`ArcCurve`整体相似，区别在于圆心定位方式有差异。

圆弧`.arc()`参数的圆心坐标是相对当前`.currentPoint`而言，而不是坐标原点。

格式：

```js
.arc (x: Float, y: F, radius: F, startAngle: F, endAngle: F, clockwise: B); 
```
|参数|值|
|:-------|:-------|
|x, y| 弧线的中心来自上次调用后的偏移量。|
|radius| 弧线的半径。|
startAngle |起始角，以弧度来表示。|
|endAngle| 终止角，以弧度来表示。
clockwise |以顺时针方向创建（扫过）弧线。默认值为false。|

下面代码绘制了一个矩形+扇形的轮廓，圆心在(100, 0) 半径 50。
::: code-group
```vue [index.vue]
代码同 生成圆弧顶点 章节
```

```js [model.js]
import * as THREE from 'three';

const shape = new THREE.Shape();
// 方案1
shape.lineTo(150, 0); // [!code --]
shape.arc(-50, 0, 50, 0, Math.PI / 2); // [!code --]

// 方案2
shape.lineTo(100, 0); // [!code ++]
shape.arc(0, 0, 50, 0, Math.PI / 2, false); // [!code ++]

shape.lineTo(0, 50);

// 填充几何体
const geometry = new THREE.ShapeGeometry(shape);

const materal = new THREE.MeshLambertMaterial({
    color: 0x00ffff
});

const mesh = new THREE.Mesh(geometry, materal);
export default mesh;
```
:::

效果如下图所示：

![shapeArc](/phaseF/shapeArc.jpg)

### Shape 曲线的光滑系数

`Shape`有直线之外的曲线，如果默认渲染不光滑，可以设置参数2提升；作用和`ExtrudeGeometry`的 `curveSegments`参数等效（shape曲线对应曲线细分数）


```js
// shape:填充轮廓  
const geometry = new THREE.ShapeGeometry(shape, 1); // [!code --]
const geometry = new THREE.ShapeGeometry(shape, 20); // [!code ++]
```

`Shape` 第二个参数为 1 和 20 曲线的光滑度效果 对比如下：

![shapeArc1](/phaseF/shapeArc1.jpg)

![shapeArc1](/phaseF/shapeArc20.jpg)

### Shape 作为几何体参数 (拉伸效果)

![shapeArc3D](/phaseF/shapeArc3D.jpg)

```js
const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 20, // 拉伸长度
    bevelEnabled: false, // 禁止倒角
    curveSegments: 20, // shape曲线对应曲线细分数
});
```


### arc 示例代码如下：

::: code-group 
```vue [index.vue]
代码同 生成圆弧顶点 章节
```

```js [model.js]
import * as THREE from 'three';

const shape = new THREE.Shape();

shape.lineTo(100, 0);
shape.arc(0, 0, 50, 0, Math.PI / 2, false);
shape.lineTo(0, 50);

// 拉伸 
const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 40,
    curveSegments: 20 // shape曲线对应曲线细分数
});

const materal = new THREE.MeshLambertMaterial({
    color: 0x00ffff
});

const mesh = new THREE.Mesh(geometry, materal);
export default mesh;
```
:::

## 绝对圆弧方法 .absarc()

`.absarc()`圆心坐标不受到`.currentPoint`影响，以坐标原点作为参考，这一点和圆弧方法`.arc()`不同。
下面代码绘制了一个矩形+扇形的轮廓，圆心在(100, 0) 半径50。效果同上

```js
const shape = new THREE.Shape();
// .absarc()圆心坐标不受到.currentPoint影响
shape.lineTo(100, 0); // [!code --]
shape.lineTo(150, 0); // [!code ++]
shape.absarc(100, 0, 50, 0, Math.PI/2, false); 
shape.lineTo(0, 50);
```

### absarc 示例代码如下：

::: code-group
```vue [index.vue]
代码同 生成圆弧顶点 章节
```

```js [model.js]
import * as THREE from 'three';

const shape = new THREE.Shape();

// .absarc()圆心坐标不受到.currentPoint影响
shape.lineTo(100, 0); // [!code --]
shape.lineTo(150, 0); // [!code ++]
shape.absarc(100, 0, 50, 0, Math.PI / 2, false);
shape.lineTo(0, 50);

// 填充
// const geometry = new THREE.ShapeGeometry(shape, 20);

// 拉伸
const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 40,
    curveSegments: 20 // shape曲线对应曲线细分数
});

const materal = new THREE.MeshLambertMaterial({
    color: 0x00ffff
});

const mesh = new THREE.Mesh(geometry, materal);
export default mesh;
```
:::

## arc 和 absarc 区别

- `.arc()`圆心坐标受`.currentPoint`影响。
- `.absarc()`圆心坐标不受`.currentPoint`影响。