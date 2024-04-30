---
outline: deep
---

# Raycaster 射线拾取模型

上节课介绍过射线 `Ray`，下面给大家介绍另一个和射线相关的 API **射线投射器** `Raycaster`。

## 准备三个 mesh 用于射线拾取

```js
const geometry = new THREE.SphereGeometry(25, 50, 50);
const material = new THREE.MeshLambertMaterial({
  color: 0x009999,
});
const mesh1 = new THREE.Mesh(geometry, material);
const mesh2 = mesh1.clone();
mesh2.position.y = 100;
const mesh3 = mesh1.clone();
mesh3.position.x = 100;
const model = new THREE.Group();
// 三个网格模型mesh1,mesh2,mesh3用于射线拾取测试
model.add(mesh1, mesh2, mesh3);
model.updateMatrixWorld(true);
```

## 射线投射器 Raycaster

射线投射器 `Raycaster` 具有一个射线属性 `.ray`，该属性的值就是上节课讲解的射线对象 Ray。

```js
const raycaster = new THREE.Raycaster();
console.log("射线属性", raycaster.ray);
```

```js
// 设置射线起点
raycaster.ray.origin = new THREE.Vector3(-100, 0, 0);
// 设置射线方向射线方向沿着x轴
raycaster.ray.direction = new THREE.Vector3(1, 0, 0);
```

## 射线交叉计算 .intersectObjects() 方法

`Raycaster` 通过 `.intersectObjects()` 方法可以`计算出来与自身射线 .ray 相交的网格模型`。

`.intersectObjects([mesh1, mesh2, mesh3])` 对参数中的网格模型对象进行射线交叉计算,`未选中对象返回空数组[]`,选中一个对象，数组 1 个元素，选中多个对象，数组多个元素，如果选中多个对象，对象在数组中按照先后排序。

```js
const raycaster = new THREE.Raycaster();
raycaster.ray.origin = new THREE.Vector3(-100, 0, 0);
raycaster.ray.direction = new THREE.Vector3(1, 0, 0);
// 射线发射拾取模型对象
const intersects = raycaster.intersectObjects([mesh1, mesh2, mesh3]);
console.log("射线器返回的对象", intersects);
```

## 射线拾取返回信息 .intersectObjects()

射线拾取返回的 intersects 里面的元素包含多种信息，在浏览器控制台打印信息如下：

![intersects](/phaseK/intersects.png)

`.intersectObjects()`和`.intersectObject()`功能相同，只是具体语法不同，.intersectObjects()返回数组元素包含的信息，可以参考文档关于.intersectObject()的介绍。

```js
console.log("射线器返回的对象", intersects);
// intersects.length大于0说明，说明选中了模型
if (intersects.length > 0) {
  console.log("交叉点坐标", intersects[0].point);
  console.log("交叉对象", intersects[0].object);
  console.log("射线原点和交叉点距离", intersects[0].distance);
}
```

## 射线选中的模型对象改变材质颜色

![intersects.blue](/phaseK/intersects.blue.jpg)

```js
const intersects = raycaster.intersectObjects([mesh1, mesh2, mesh3]);
// 遍历模型，修改选中模型的color为蓝色
intersects?.forEach((item) => {
  item.object.material.color.set(0x0000ff);
});
```

## 注意

注意射线拾取的时候，mesh1, mesh2, mesh3 位置要确保更新的情况下，执行射线计算，一般是渲染器执行一次 `.render()`之后，设置的 `mesh.position` 或者 mesh 父对象的 position 才会真实生效。

```js {3}
...
// 注意更新下模型的世界矩阵，你设置的mesh.position生效，再进行射线拾取计算
model.updateMatrixWorld(true);
...
const intersects = raycaster.intersectObjects([mesh1, mesh2, mesh3]);
```

::: code-group

```vue{8,79-93} [index.vue]
<template>
    <div ref="raycasterDom"></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { model, mesh1, mesh2, mesh3 } from './model.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const raycasterDom = ref(null);

const width = computed(() => {
    return window.innerWidth - 174;
});
const height = computed(() => {
    return window.innerHeight - 136;
});
// 场景
const scene = new THREE.Scene();

scene.add(model);

// 辅助观察坐标系
const axesHelper = new THREE.AxesHelper(200);
scene.add(axesHelper);

// 灯光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// 相机
const camera = new THREE.PerspectiveCamera(30, width.value / height.value, 1, 3000);
camera.position.set(350, 250, 300);
camera.lookAt(0, 0, 0);

// 渲染器
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
renderer.setSize(width.value, height.value);

// 相机轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', () => {
    renderer.render(scene, camera);
});

// resize 事件会在窗口被调整大小时发生
window.addEventListener('resize', () => {
    renderer.setSize(width.value, height.value);
    camera.aspect = width.value / height.value;
    // 如果相机的一些属性发生了变化，需要执行 updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix();
});

onMounted(() => {
    renderer.setClearColor(0x444544, 0.4);
    raycasterDom.value?.appendChild(renderer.domElement);
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

// 创建射线投射器
const raycaster = new THREE.Raycaster();
// 射线投射器起点
raycaster.ray.origin = new THREE.Vector3(-100, 0, 0);
// 射线投射器方向
raycaster.ray.direction = new THREE.Vector3(1, 0, 0);

// Raycaster 通过 .intersectObjects() 方法可以计算出来与自身射线 .ray 相交的网格模型。
const intersects = raycaster.intersectObjects([mesh1, mesh2, mesh3]);
console.log('=======射线投射器返回的对象====',intersects);

// 若选中模型，则遍历修改所有模型的颜色为蓝色
intersects?.forEach((item) => {
    item.object.material.color.set(0x0000ff);
});
</script>
```

```js [model.js]
import * as THREE from "three";

const geometry = new THREE.SphereGeometry(25);
const material = new THREE.MeshLambertMaterial({
  color: 0x009999,
});
const mesh1 = new THREE.Mesh(geometry, material);

const mesh2 = mesh1.clone();
mesh2.material = new THREE.MeshLambertMaterial({
  color: 0x999900,
});
mesh2.position.y = 100;

const mesh3 = mesh1.clone();

mesh3.material = new THREE.MeshLambertMaterial({
  color: 0x990099,
});

mesh3.position.x = 100;

const model = new THREE.Group();
model.add(mesh1, mesh2, mesh3);

export { model, mesh1, mesh2, mesh3 };
```

:::
