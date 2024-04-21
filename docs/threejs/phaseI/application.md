---
outlie: deep
---

# Sprite 模拟下雨、下雪

在实际开发的时候，物联网 3D 可视化、数字孪生、游戏等项目可能会模拟天气的效果。

如果你想模拟下雨效果，一个雨滴用一个 3D 水滴形曲面表示，假设一个水滴用 40 个三角形表示，1 万个雨滴，就是 40 万个三角形，精灵模型 Sprite 在 threejs 内部就像相当于两个三角形构成的矩形，1 万个精灵模型，相当于 2 万个三角形，Sprite 模拟雨滴相比比 3D 曲面几何体表示雨滴顶点数量就会少很多，这样 threejs 渲染性能就更好。

![rain](/phaseI/rain.jpg)

## Sprite 模拟雨滴

提供一个背景透明的 png 雨滴贴图，然后作为 Sprite 的颜色贴图，用来模拟雨滴 3D 几何体。

```js
const texture = new THREE.TextureLoader().load("./雨滴.png");
const spriteMaterial = new THREE.SpriteMaterial({
  map: texture,
});
const sprite = new THREE.Sprite(spriteMaterial);
```

## 雨滴在 3D 空间随机分布

批量创建多个精灵模型，在一个长方体空间上随机分布。

Sprite 分布渲染范围和数量，根据渲染范围来预先给一个大概的值，然后可以根据需要，在调整雨滴分布范围尺寸。

```js
const group = new THREE.Group();
for (let i = 0; i < 16000; i++) {
  // 精灵模型共享材质
  const sprite = new THREE.Sprite(spriteMaterial);
  group.add(sprite);
  sprite.scale.set(1, 1, 1);
  // 设置精灵模型位置，在长方体空间上上随机分布
  const x = 1000 * (Math.random() - 0.5);
  const y = 600 * Math.random();
  const z = 1000 * (Math.random() - 0.5);
  sprite.position.set(x, y, z);
}
```

## 周期性改变雨滴 Sprite 位置

```js
function loop() {
  // loop()每次执行都会更新雨滴的位置，进而产生动画效果
  group.children.forEach((sprite) => {
    // 雨滴的y坐标每次减1
    sprite.position.y -= 1;
    if (sprite.position.y < 0) {
      // 如果雨滴落到地面，重置y，从新下落
      sprite.position.y = 600;
    }
  });
  requestAnimationFrame(loop);
}
loop();
```

`loop()` 执行时间间隔和渲染循环 `render()`是一样的。

## 根据时间计算 Sprite 位置

```js
const clock = new THREE.Clock();
function loop() {
  // loop()两次执行时间间隔
  const t = clock.getDelta();
  group.children.forEach((sprite) => {
    // 雨滴的y坐标每次减t*60
    sprite.position.y -= t * 60;
    if (sprite.position.y < 0) {
      sprite.position.y = 600;
    }
  });
  requestAnimationFrame(loop);
}
loop();
```

## 相机镜头附近的雨滴偏大

相机在下雨的场景中，相机会渲染 near~far 范围的 Sprite，距离相机 0~near 范围不会渲染，小部分 Sprite 会在相机镜头前经过，大家都知道透视投影远小近大，这时候相机 near 附近雨滴 Sprite 会显示比较大，你可以把 near 调整大一些，这样距离相机非常近的 Sprite 不会渲染。

```js
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000); // [!code --]
// near调整大一些，避免距离相机非常近的雨滴渲染非常大的现象。
const camera = new THREE.PerspectiveCamera(30, width / height, 50, 3000); // [!code ++]
```

## 下雪效果模拟

把雨滴代码中与雨滴贴图更换雪花纹理贴图，雪花下降速度可以适当调整。当然这也只是近似模拟，比如雪花随风飘动、角度旋转等等都没有模拟。

![snowflake](/phaseI/snowflake.jpg)

```js
const texture = new THREE.TextureLoader().load("./雪花.png");
```

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
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const loader = new GLTFLoader();
const model = new THREE.Group();

loader.load("/工厂建模数据/工厂.glb", (gltf) => {
  model.add(gltf.scene);
});

const texture = new THREE.TextureLoader().load("/雨滴.png");
const spriteMaterial = new THREE.SpriteMaterial({
  map: texture,
});

// 批量创建多个精灵模型，在一个长方体空间上随机分布
const group = new THREE.Group();
model.add(group);

for (let i = 0; i < 16000; i++) {
  // 精灵模型共享材质
  const sprite = new THREE.Sprite(spriteMaterial);
  group.add(sprite);
  sprite.scale.set(1, 1, 1);
  // 设置精灵模型位置，在长方体空间上上随机分布
  const x = 1000 * (Math.random() - 0.5);
  const y = 600 * Math.random();
  const z = 1000 * (Math.random() - 0.5);
  sprite.position.set(x, y, z);
}

function loop() { // [!code --]
  // loop()每次执行都会更新雨滴的位置，进而产生动画效果 // [!code --]
  group.children.forEach((sprite) => { // [!code --]
    // 雨滴的y坐标每次减1 // [!code --]
    sprite.position.y -= 1; // [!code --]
    if (sprite.position.y < 0) { // [!code --]
      // 如果雨滴落到地面，重置y，从新下落 // [!code --]
      sprite.position.y = 600; // [!code --]
    } // [!code --]
  }); // [!code --]
  requestAnimationFrame(loop); // [!code --]
} // [!code --]

const clock = new THREE.Clock(); // [!code ++]
function loop() { // [!code ++]
  // loop()两次执行时间间隔 // [!code ++]
  const t = clock.getDelta(); // [!code ++]
  // loop()每次执行都会更新雨滴的位置，进而产生动画效果 // [!code ++]
  group.children.forEach((sprite) => { // [!code ++]
    // 雨滴的y坐标每次减t*60 // [!code ++]
    sprite.position.y -= t * 60; // [!code ++]
    if (sprite.position.y < 0) { // [!code ++]
      // 如果雨滴落到地面，重置y，从新下落 // [!code ++]
      sprite.position.y = 600; // [!code ++]
    } // [!code ++]
  }); // [!code ++]
  requestAnimationFrame(loop); // [!code ++]
} // [!code ++]
loop();
export default model;
```

:::
