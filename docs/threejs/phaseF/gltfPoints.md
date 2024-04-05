---
outline: deep
---

# 查看或设置 gltf 几何体顶点

前面给大家介绍过几何体`BufferGeometry`对象，以及用来表示`BufferGeometry`顶点数据的属性缓冲对象`BufferAttribute`。

```js
geometry.attributes.position = new THREE.BufferAttribute();
geometry.attributes.normal = new THREE.BufferAttribute();
geometry.attributes.color = new THREE.BufferAttribute();
geometry.attributes.uv = new THREE.BufferAttribute();
geometry.index = new THREE.BufferAttribute();
```

下面通过加载一个外部`gltf`模型为例，给大家演示如何获取、修改外部模型的`几何体顶点数据`，也就是说获取、修改`BufferAttribute`对象里面的`顶点数据`。

## 获取 gltf 模型几何体顶点数据

```js
const loader = new GLTFLoader();
const model = new THREE.Group();

loader.load("地形.glb", (gltf) => {
  model.add(gltf.scene);
  // mesh表示地形网格模型
  const mesh = gltf.scene.children[0];
  // 顶点位置数据
  const pos = mesh.geometry.attributes.position;
  // 几何体顶点数量
  const count = pos.count;
  // 批量设置所有几何体顶点位置的y坐标
  for (let i = 0; i < count; i++) {
    const y = pos.getY(i); // 获取第i+1个顶点y坐标
    pos.setY(i, y * 2); // 设置第i+1个顶点y坐标为自身2倍
  }
});
```

## 几何体顶点索引属性 geometry.index

three.js 大部分自带的几何体 API 默认有`.index`属性，不过外部加载的 gltf 等模型，`geometry.index`数据可能有，也可能没有，具体看外部模型情况。

```js
console.log("index", mesh.geometry.index);
```

## 顶点数量 BufferAttribute.count

```js
const pos = mesh.geometry.attributes.position;
// 几何体顶点数量
console.log("count", pos.count);
```

## .getX()、.getY()和.getZ()

`BufferAttribute`对象具有`.getX()`、`.getY()`和`.getZ()`方法。
`BufferAttribute`共有顶点数量`count`，通过`.getX(i)`方法可以获取第`i+1`个点的 x 分量，i 的范围就是[0, count-1]。

```js
const pos = mesh.geometry.attributes.position;
// 获取几何体第一个顶点的x坐标
const x = pos.getX(0);
console.log("x", x);
```

`.getY()`、`.getZ()`是获取顶点数据`BufferAttribute`的 y、z 分量，使用方式和`.getX()`方法一样。

## .setX()、.setY()和.setZ()

通过`.getY()`是获取顶点 y 坐标，通过`.setY()`是设置顶点 y 坐标。

`pos.setY(0, 100)`把索引为 0，也就是第一个顶点的 y 坐标设置为 100。

```js
const pos = mesh.geometry.attributes.position;
pos.setX(0, 100);
```

## 批量重置几何体顶点 y 坐标

```js
loader.load("../地形.glb", function (gltf) {
  model.add(gltf.scene);
  // mesh表示地形网格模型
  const mesh = gltf.scene.children[0];
  // 顶点位置数据
  const pos = mesh.geometry.attributes.position;
  // 几何体顶点数量
  const count = pos.count;
  // 批量设置所有几何体顶点位置的y坐标
  for (let i = 0; i < count; i++) {
    const y = pos.getY(i); // 获取第i+1个顶点y坐标
    pos.setY(i, y * 2); // 设置第i+1个顶点y坐标为自身2倍
  }
});
```

## 示例代码如下

::: code-group

```vue [index.vue]
代码同 生成圆弧顶点 章节
```

```js [model.js]
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
const model = new THREE.Group();

loader.load("地形.glb", (gltf) => {
  model.add(gltf.scene);
  // mesh表示地形网格模型
  const mesh = gltf.scene.children[0];
  // 顶点位置数据
  const pos = mesh.geometry.attributes.position;

  console.log("--pos--", pos);
  // 几何体顶点数量
  const count = pos.count;
  // 批量设置所有几何体顶点位置的y坐标
  for (let i = 0; i < count; i++) {
    const y = pos.getY(i); // 获取第i+1个顶点y坐标
    pos.setY(i, y * 2); // 设置第i+1个顶点y坐标为自身2倍
  }
});

export default model;
```

:::
