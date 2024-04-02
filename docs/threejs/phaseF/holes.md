---
outline: deep
---

# 多边形Shape(内孔.holes)

有些多边形`Shape`内部是有孔洞的，这时候就需要借助多边形`Shape`的内孔`.holes`属性和`Path`对象实现。

![shapePath](/phaseF/shapePath.svg)

## 外轮廓

先创建`Shape`的矩形`外轮廓`。

```js
const shape = new THREE.Shape();
shape.lineTo(100, 0);
shape.lineTo(100, 100);
shape.lineTo(0, 100);
```

## .holes 设置内孔的轮廓

### Path 对象创建内部多个轮廓

```js
// 圆孔1
const path1 = new THREE.Path();
path1.absarc(20, 20, 10);
// 圆孔2
const path2 = new THREE.Path();
path2.absarc(80, 20, 10);
// 方孔
const path3 = new THREE.Path();
path3.moveTo(50, 50);
path3.lineTo(80, 50);
path3.lineTo(80, 80);
path3.lineTo(50, 80);
```
### 三个内孔轮廓分别插入到 holes 属性中

```js
shape.holes.push(path1, path2, path3);
```

## Shape 拉伸的效果图

上面代码定义的`Shape`，通过`ExtrudeGeometry`拉伸的效果图。

![holes](/phaseF/holes.jpg)

```js
const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 60, // 拉伸长度
    bevelEnabled: false, // 禁止倒角
    curveSegments: 50 // shape曲线对应曲线细分数，光滑度系数
});
```

## 示例代码如下：

::: code-group
```vue [index.vue]
代码同 生成圆弧顶点 章节
```
```js [model.js]
import * as THREE from 'three';

// 先创建Shape的矩形外轮廓
const shape = new THREE.Shape();
shape.lineTo(100, 0);
shape.lineTo(100, 100);
shape.lineTo(0, 100);

// Path对象创建内部多个轮廓

// 圆孔1
const path1 = new THREE.Path();
path1.absarc(20, 20, 10);
// 圆孔2
const path2 = new THREE.Path();
path2.absarc(80, 20, 10);
// 方孔
const path3 = new THREE.Path();
path3.moveTo(50, 50);
path3.lineTo(80, 50);
path3.lineTo(80, 80);
path3.lineTo(50, 80);

// 三个内孔轮廓分别插入到holes属性中
shape.holes.push(path1, path2, path3);

// ShapeGeometry 填充 Shape 获得一个平面几何体
// const geometry = new THREE.ShapeGeometry(shape);

// ExtrudeGeometry 拉伸 Shape 获得一个长方体几何体
const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 60, // 拉伸长度
    bevelEnabled: false, // 禁止倒角
    curveSegments: 50 // shape曲线对应曲线细分数，光滑度系数
});
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff
});
const mesh = new THREE.Mesh(geometry, material);

export default mesh;
```
:::