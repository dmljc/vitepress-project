---
outline: deep
---

# 光源的阴影相机属性 阴影范围 .shadow.camera

上节课 2.平行光阴影计算讲解过，通过光源的阴影相机属性 `.shadow.camera`，来控制阴影的渲染范围，本节课继续.`shadow.camera` 的讲解。

![shadows](/phaseH/shadows.jpg)

## 平行光阴影相机属性 .shadow.camera

- 平行光 `DirectionalLight` 的 `.shadow` 属性是平行光阴影对象 `DirectionalLightShadow`
- 平行光阴影对象 `DirectionalLightShadow` 有一个相机属性 `.camera`
- `.shadow.camera` 属性值(正投影相机 `OrthographicCamera`)

## CameraHelper 可视化 .shadow.camera

为了方便观察阴影渲染的范围，需要把平行光对应的阴影相机 `.shadow.camera` 可视化显示。

```js
new THREE.CameraHelper(directionalLight.shadow.camera);
```

## 参数测试

下面先在上节课代码基础上给大家改参数体验下相机渲染范围参数对阴影的影响。

课件演示文件中，提供了批量创建了多个长方体，用于阴影范围设置测试。

## 设置相机 .shadow.camera 长方体范围

根据 3D 场景渲染范围，去设置 `.shadow.camera` 长方体尺寸参数，一般比你要渲染的范围稍微大一些即可，过小阴影不显示或显示不完整，过大很多可能阴影偏模糊，你可以比较下面两个参数的阴影渲染差异。

```js
directionalLight.shadow.camera.left = -50 * 10;
directionalLight.shadow.camera.right = 50 * 10;
```

```js
directionalLight.shadow.camera.left = -50 * 100;
directionalLight.shadow.camera.right = 50 * 100;
```

![正投影可视空间](/phaseH/正投影可视空间.png)

## 调节光源位置

光源位置影响平行光阴影相机 `.shadow.camera` 的位置，所以要根据渲染范围调整光源的位置。

你可以比较测试两个不同的光源位置，对应阴影渲染效果。

```js
directionalLight.position.set(100, 60, 50);
```

```js
directionalLight.position.set(100 * 2, 60 * 2, 50 * 2);
```

## 确定阴影计算范围

其实平行光阴影范围的设置，你可以类比以前正投影机位置、长方体可视化空间的设置。

- 先大概确定下 3D 场景中需要阴影计算范围，不用精确，有一个数量级就行，比如几百、几千。
- `.shadow.camera` 的 `.left`、`.right`、`.top`、`.bottom`、`.near`、`.far` 属性定义的长方体空间
- `.shadow.camera` 的位置(光源位置影响`.shadow.camera` 的位置)

需要阴影范围数量级：z 方向尺寸 1000 左右，xy 方向 100 左右。

```js
for (let i = -3; i < 4; i++) {
  const mesh2 = mesh.clone();
  // 设置产生投影的网格模型
  mesh2.castShadow = true;
  mesh2.position.z = 100 * i;
  group.add(mesh2);
}
```

## 根据尺寸数量级设置阴影渲染范围

比如光线是从斜上方照射下来，模型 y 方向高度 100 左右，这时候 y 可以设置为 100 左右，xz 也可以根据渲染范围先给个大概尺寸。

```js
directionalLight.position.set(100, 100, 100);
// 平行光默认从.position指向坐标原点
```

光线方向，你可以改变 xz 坐标来调整

```js
directionalLight.position.set(-100, 100, -100);
```

渲染范围可以都先给个几百量级的值，不用精准，先设置，在微调。

```js
// 设置三维场景计算阴影的范围
directionalLight.shadow.camera.left = -100;
directionalLight.shadow.camera.right = 100;
directionalLight.shadow.camera.top = 100;
directionalLight.shadow.camera.bottom = -100;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 100;
```

## 批量创建阴影效果

![shadowList](/phaseH/shadowList.jpg)

## 示例代码如下：

::: code-group

```vue {26,30-38} [index.vue]
<template>
  <div ref="lightDom"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from "three";
import model from "./model.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const lightDom = ref(null);
// 场景
const scene = new THREE.Scene();
scene.add(model);

// 辅助观察坐标系
const axesHelper = new THREE.AxesHelper(500);
scene.add(axesHelper);

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
directionalLight.position.set(200, 160, 150);
scene.add(directionalLight);

// 2、平行光设置产生阴影的光源对象，开启光源阴影的计算功能
directionalLight.castShadow = true;

// 5、设置三维场景计算阴影的范围
directionalLight.shadow.camera.left = -50 * 6;
directionalLight.shadow.camera.right = 50 * 6;
directionalLight.shadow.camera.top = 200 * 2;
directionalLight.shadow.camera.bottom = -100 * 2;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 400 * 10;

// 可视化平行光阴影对应的正投影相机对象
const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(cameraHelper);

// 相机
const width = window.innerWidth - 296;
const height = window.innerHeight - 136;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
// camera.position.set(40, 122, 390);
camera.position.set(153, 697, 676);
camera.lookAt(0, 0, 0);

// webgl 渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(width, height);
// 防止输出模糊
renderer.setPixelRatio(window.devicePixelRatio);
// 4、设置渲染器，允许光源阴影渲染
renderer.shadowMap.enabled = true;

// 相机轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", () => {
  renderer.render(scene, camera);
});

// resize 事件会在窗口被调整大小时发生
window.addEventListener("resize", () => {
  const w = window.innerWidth - 296;
  const h = window.innerHeight - 136;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  // 如果相机的一些属性发生了变化，需要执行 updateProjectionMatrix ()方法更新相机的投影矩阵
  camera.updateProjectionMatrix();
});

onMounted(() => {
  // renderer.setClearColor(0x444544, 0.4);
  lightDom.value?.appendChild(renderer.domElement);
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

```js {15,28-34} [model.js]
import * as THREE from "three";

// 立方体
const geometry = new THREE.BoxGeometry(50, 100, 50);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 50;
// 1、设置产生投影的网格模型
mesh.castShadow = true;

// 平面
const planeGeometry = new THREE.PlaneGeometry(400, 850);
const planeMaterial = new THREE.MeshLambertMaterial({
  color: 0x999999,
  side: THREE.DoubleSide,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.rotateX(-Math.PI / 2);
// 3、设置接收阴影的投影面
planeMesh.receiveShadow = true;

const group = new THREE.Group();
group.add(mesh, planeMesh);

for (let i = -3; i < 4; i++) {
  const mesh2 = mesh.clone();
  // 设置产生投影的网格模型
  mesh2.castShadow = true;
  mesh.position.z = i * 100;
  group.add(mesh2);
}

export default group;
```

:::
