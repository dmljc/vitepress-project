---
outlie: deep
---

# 精灵模型标注场景(贴图)

![label](/phaseI/label.jpg)

## 精灵模型设置颜色贴图 .map

精灵材质对象 `SpriteMaterial` 和普通的网格材质一样具有颜色贴图 `.map`、开启透明 `.transparent`、透明度 `.opacity` 等属性。

```js
const texture = new THREE.TextureLoader().load("./光点.png");
const spriteMaterial = new THREE.SpriteMaterial({
  map: texture, //设置精灵纹理贴图
});
```

## .transparent 属性

网格材质 `.transparent` 属性默认是 `false`，如果贴图是背景透明的 png 贴图，需要把 `.transparent` 设置为 `true`，对于 `SpriteMaterial` 而言，`.transparent` 默认是 `true`。

```js
const spriteMaterial = new THREE.SpriteMaterial({
  transparent: true, //SpriteMaterial默认是true
});
```

## .color 与.map 混合

如果 `.map` 是纯白色贴图，你可以通过设置 `.color`，把精灵模型设置为其他任意颜色。
一般来说美术把颜色贴图设置为合适的颜色，你就不用再设置 .color。

```js
const spriteMaterial = new THREE.SpriteMaterial({
  color: 0x00ffff, //设置颜色
  map: texture, //设置精灵纹理贴图
});
```

## Sprite 标注三维场景

需要在长方体网格模型的顶部中间添加一个 `Sprite` 标注。

![spriteLight](/phaseI/spriteLight.jpg)

```js
const geometry = new THREE.BoxGeometry(25, 100, 50);
geometry.translate(0, 50, 0);
// mesh顶部中心添加标注，顶部中心坐标是(0,100,0)
const mesh = new THREE.Mesh(geometry, material);
```

标注大小，根据场景渲染范围尺寸或者说要标注的物体的尺寸数量级，设置 sprite 的大小。
不用具体，先设置一个大概值，只要和要标注的物体尺寸数量级相差不大即可，再根据需要缩放尺寸。

```js
sprite.scale.set(10, 10, 1);
```

根据标注位置，设置精灵模型在三维空间中的位置坐标，注意考虑模型对象的大小

```js
sprite.position.set(0, 100 + 10 / 2, 0); //设置位置，要考虑sprite尺寸影响
```

## 示例代码如下：

::: code-group

```vue [index.vue]
<template>
  <div ref="sprite"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from "three";
import model from "./model.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const sprite = ref(null);
// 场景
const scene = new THREE.Scene();

scene.add(model);

// 辅助观察坐标系
const axesHelper = new THREE.AxesHelper(200);
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
  antialias: true,
});
renderer.setSize(width, height);

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
  renderer.setClearColor(0x444544, 0.4);
  sprite.value?.appendChild(renderer.domElement);
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
import * as THREE from "three";

// mesh顶部中心添加标注，顶部中心坐标是(0,100,0)
const geometry = new THREE.BoxGeometry(25, 100, 50);
geometry.translate(0, 50, 0);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);
const group = new THREE.Group();
group.add(mesh);

// 创建精灵
const texture = new THREE.TextureLoader().load("./光点.png");
const spriteMaterial = new THREE.SpriteMaterial({
  map: texture, // 设置精灵纹理贴图
  // transparent: true 默认true
});
const sprite = new THREE.Sprite(spriteMaterial);
// 控制精灵大小
sprite.scale.set(10, 10, 1);
// 设置精灵模型在三维空间中的位置坐标
sprite.position.set(0, 100 + 10 / 2, 0);
group.add(sprite);

export default group;
```

:::
