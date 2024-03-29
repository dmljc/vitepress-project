---
outline: deep
---

# 生成圆弧顶点

通过代码算法生成圆弧线上的`顶点坐标`，并最后绘制一个圆弧效果。

![circle](/phaseF/circle.jpg)

## 生成圆弧顶点数据

以坐标原点为中心，在XOY平面上生成圆弧上的顶点数据。

绘制圆弧线，本质就是绘制一个正n边形，n越大，圆弧细分数或者说精度越高。

通过for循环沿着圆弧线，通过三角函数计算顶点坐标，批量生成圆弧上顶点数据。

```js
// 定义圆弧半径
const R = 10;
// 定义分段数量
const N = 50;

// 存放批量生成的圆弧上的顶点数据
const arr = [];
// 两个相邻点间隔弧度
const sp = (2 * Math.PI) / N;

for (let i = 0; i < N + 1; i++) {
    const angle = sp * i;
    // 以坐标原点为中心，在XOY平面上生成圆弧上的顶点数据
    const x = R * Math.cos(angle);
    const y = R * Math.sin(angle);
    arr.push(x, y, 0);
}
```

## 线模型渲染圆弧线

使用`Line`渲染圆弧线会有一个`缺口`，不完全闭合，使用`LineLoop`可以封闭最后缺口。

![circleq](/phaseF/circleq.jpg)

```js
// 线材质
const material = new THREE.LineBasicMaterial({
    color: 0xff0000 
});
// 创建线模型对象 构造函数：Line、LineLoop、LineSegments
// 线条模型对象
const line = new THREE.LineLoop(geometry, material); 
```

使用Line渲染，也可以修改for循环条件多增加一个点绘制圆弧。

```js
for (let i = 0; i < N; i++) { // [!code --]
for (let i = 0; i < N + 1; i++) { // [!code ++]

} 
```

## 绘制半圆弧

```js
const sp = 2 * Math.PI / N; //完整圆弧
const sp = 1 * Math.PI / N; //半圆弧
```

## 圆弧设置圆心坐标

```js
// 设置圆心坐标
const cx = 200;
const cy = 100;

for (let i = 0; i < N + 1; i++) {
    const angle = sp * i;
    // 以坐标原点为中心，在XOY平面上生成圆弧上的顶点数据
    const x = cx + R * Math.cos(angle);
    const y = cy + R * Math.sin(angle);
    arr.push(x, y, 0);
}
```

## 完整代码如下

::: code-group

```vue [index.vue]
<template>
    <div ref="curve"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import model from './model.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const curve = ref(null);
// 场景
const scene = new THREE.Scene();

scene.add(model);

// 辅助观察坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// 灯光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// 相机
const width = window.innerWidth - 296;
const height = window.innerHeight - 136;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(40, 122, 390);
camera.lookAt(0, 0, 0);

// 渲染器
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(width, height);

// 相机轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', () => {
    renderer.render(scene, camera);
});

// resize 事件会在窗口被调整大小时发生
window.addEventListener('resize', () => {
    const w = window.innerWidth - 296;
    const h = window.innerHeight - 136;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    // 如果相机的一些属性发生了变化，需要执行 updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix();
});

onMounted(() => {
    renderer.setClearColor(0x444544, 0.4);
    curve.value.appendChild(renderer.domElement);
});

onUnmounted(() => {
    renderer.dispose();
});

// 渲染循环
const render = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
};
render();
</script>
```

```js [model.js]
import * as THREE from 'three';

// 创建一个几何体对象
const geometry = new THREE.BufferGeometry();

// 定义圆弧半径
const R = 50;
// 定义分段数量
const N = 50;

// 存放批量生成的圆弧上的顶点数据
const arr = [];
// 两个相邻点间隔弧度
const sp = (2 * Math.PI) / N;

// 设置圆心坐标
const cx = 50;
const cy = 50;

for (let i = 0; i < N + 1; i++) {
    const angle = sp * i;
    // 以坐标原点为中心，在XOY平面上生成圆弧上的顶点数据
    const x = cx + R * Math.cos(angle);
    const y = cy + R * Math.sin(angle);
    arr.push(x, y, 0);
}

// 类型数据创建顶点数据
const vertices = new Float32Array(arr);
// 创建数据属性缓冲区对象，3个为一组，表示一个顶点的XYZ坐标
const attribue = new THREE.BufferAttribute(vertices, 3);
// 设置几何体 attributes 属性的位置属性
geometry.attributes.position = attribue;

// 线材质
const material = new THREE.LineBasicMaterial({
    color: 0x00ffff
});

// 创建线模型对象 Line、LineLoop、LineSegments
const model = new THREE.Line(geometry, material);

export default model;
```
:::
