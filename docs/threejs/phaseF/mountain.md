---
outline: deep 
---

# 山脉地形高度可视化

一个山脉地形的高度可视化，具体说就是地形不同的高度设置不同的颜色值。有多种方式，下面就举一个设置顶点颜色`.attributes.color`的例子

![mountainLerp](/phaseF/mountainLerp.jpeg)

本节课算是一个练习题，用到的知识点前面几节都将讲解过，所以视频主要把思路给大家说一遍，然后大家根据课程课程思路自己手写一遍。

## 1、山脉几何体y坐标范围

```js
loader.load('地形.glb', (gltf) => {
    // 三维场景添加到model组对象中
    model.add(gltf.scene);

    // mesh表示地形网格模型
    const mesh = gltf.scene.children[0];
    // 1. 山脉顶点数据.
    const pos = mesh.geometry.attributes.position;
    // 几何体顶点数量
    const count = pos.count;

    // 2. 计算模型y坐标高度差
    // 顶点所有y坐标，也就是地形高度
    const yArr = [];
    for (let i = 0; i < count; i++) {
        yArr.push(pos.getY(i));
    }
    // y坐标排序，以便于计算地形高度差
    yArr.sort();
    const miny = yArr[0];
    const maxy = yArr[yArr.length - 1];
    // 山脉整体高度
    const height = maxy - miny;
});
```

## 2、根据山脉顶点高度设置渐变颜色

借助颜色对象的颜色插值方法`.lerp()`,计算山脉不同高度位置点的颜色。

```js
// 3. 计算每个顶点的颜色值
const colorsArr = [];
// 山谷颜色
const c1 = new THREE.Color(0x0000ff);
// 山顶颜色
const c2 = new THREE.Color(0xff0000);
for (let i = 0; i < count; i++) {
    // 当前高度和整体高度比值
    const percent = (pos.getY(i) - miny) / height;
    // 颜色插值计算
    const c = c1.clone().lerp(c2, percent);
    colorsArr.push(c.r, c.g, c.b);
}
const colors = new Float32Array(colorsArr);

// 设置几何体attributes属性的颜色color属性
mesh.geometry.attributes.color = new THREE.BufferAttribute(colors, 3);
```

## 3、Mesh渲染山脉顶点颜色

```js
mesh.material = new THREE.MeshLambertMaterial({
    vertexColors: true, // 设置材质，使用顶点颜色渲染
});
```

::: code-group
```vue [index.vue]
代码同 生成圆弧顶点 章节
```

```js [model.js]
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 创建一个GLTF加载器
const loader = new GLTFLoader();
// 声明一个组对象，用来添加加载成功的三维场景
const model = new THREE.Group();

loader.load('地形.glb', (gltf) => {
    // 三维场景添加到model组对象中
    model.add(gltf.scene);

    // mesh表示地形网格模型
    const mesh = gltf.scene.children[0];
    // 1. 山脉顶点数据.
    const pos = mesh.geometry.attributes.position;
    // 几何体顶点数量
    const count = pos.count;

    // 2. 计算模型y坐标高度差
    // 顶点所有y坐标，也就是地形高度
    const yArr = [];
    for (let i = 0; i < count; i++) {
        yArr.push(pos.getY(i));
    }
    // y坐标排序，以便于计算地形高度差
    yArr.sort();
    const miny = yArr[0];
    const maxy = yArr[yArr.length - 1];
    // 山脉整体高度
    const height = maxy - miny;

    // 3. 计算每个顶点的颜色值
    const colorsArr = [];
    // 山谷颜色
    const c1 = new THREE.Color(0x0000ff);
    // 山顶颜色
    const c2 = new THREE.Color(0xff0000);
    for (let i = 0; i < count; i++) {
        // 当前高度和整体高度比值
        const percent = (pos.getY(i) - miny) / height;
        // 颜色插值计算
        const c = c1.clone().lerp(c2, percent);
        colorsArr.push(c.r, c.g, c.b);
    }
    const colors = new Float32Array(colorsArr);

    // 设置几何体attributes属性的颜色color属性
    mesh.geometry.attributes.color = new THREE.BufferAttribute(colors, 3);
    // 4. 设置材质，使用顶点颜色渲染
    mesh.material = new THREE.MeshLambertMaterial({
        vertexColors: true
    });
});

export default model;
```
:::