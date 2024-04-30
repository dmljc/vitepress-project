---
outline: deep
---

# Raycaster 鼠标点击选中模型

在实际开发中，`射线投射器 Raycaster` 经常会使用到，本节课给大家展示射线投射器 Raycaster 的`射线拾取功能`，`简单说就是鼠标点击，选中一个模型对象`。

下面代码的功能是鼠标单击 canvas 画布，通过射线投射器 Raycaster 射线拾取网格模型，被选中拾取到的网格模型改变颜色。

## 效果如下图所示

![event.click](/phaseK/event.click.jpg)

## 射线拾取网格模型步骤

### 1. 坐标转化 屏幕坐标转标准设备坐标

```js
// .offsetY、.offsetX以canvas画布左上角为坐标原点,单位px
const px = event.offsetX;
const py = event.offsetY;
//屏幕坐标px、py转WebGL标准设备坐标x、y
//width、height表示canvas画布宽高度
const x = (px / width) * 2 - 1;
const y = -(py / height) * 2 + 1;
```

### 2. 计算射线 .setFromCamera

把`鼠标单击位置坐标`和`相机`作为`.setFromCamera()`方法的参数，`.setFromCamera()`就会计算射线投射器` Raycaster` 的射线属性`.ray`,
**形象点说就是在点击位置创建一条射线，用来选中拾取模型对象。**

```js
//创建一个射线投射器`Raycaster`
const raycaster = new THREE.Raycaster();
//.setFromCamera()计算射线投射器`Raycaster`的射线属性.ray
// 形象点说就是在点击位置创建一条射线，用来选中拾取模型对象
raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
```

### 3. 射线交叉计算 .intersectObjects

通过`.intersectObjects()`方法可以`计算出来与射线相交的网格模型`。

```js
const intersects = raycaster.intersectObjects([mesh1, mesh2, mesh3]);
if (intersects.length > 0) {
  // 选中模型的第一个模型，设置为红色
  intersects[0].object.material.color.set(0xff0000);
}
```

## 示例代码如下：

::: code-group

```vue{8,79-97} [index.vue]
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

renderer.domElement.addEventListener('click', (event) => {
    // 1、屏幕坐标转为标准设备坐标
    const px = event.offsetX;
    const py = event.offsetY;
    const x = (px / width.value) * 2 - 1;
    const y = -(py / height.value) * 2 + 1;

    // 计算射线方法
    // 创建一个射线投射器 raycaster
    const raycaster = new THREE.Raycaster();
    // .setFromCamera() 计算射线投射器的射线属性.ray
    // 形象点说就是在点击位置创建一条射线，用来选中拾取模型对象
    raycaster.setFromCamera(new THREE.Vector3(x, y), camera);
    // interscctObjects 对参数中的网格模型对象进行射线交叉计算
    const intersects = raycaster.intersectObjects([mesh1, mesh2, mesh3]);
    if (intersects.length > 0) {
        intersects[0].object.material.color.set(0xff0000);
    }
});
</script>

```

```js [model.js]
import * as THREE from "three";

const geometry = new THREE.BoxGeometry(50, 50, 50);
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
