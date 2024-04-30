---
outline: deep
---

# 屏幕坐标转标准设备坐标

## 获取鼠标事件坐标

鼠标单击 HTML 元素，通过函数的参数鼠标事件对象 event，可以获取一些坐标信息。课件源码中是以 threejs 的 canvas 画布为例给大家演示。

```js
window.addEventListener("click", function (event) {
  // event对象有很多鼠标事件相关信息
  console.log("event", event);
});
```

`.offsetX`、`.offsetY` 表示`鼠标单击位置的坐标`，单位是像素 px，以点击的 HTML 元素左上角为坐标原点，水平向右方向为 x 轴，竖直向下方向为 y 轴。

```js
window.addEventListener("click", function (event) {
  const px = event.offsetX;
  const py = event.offsetY;
});
```

下图灰色区域是一个 HTML 元素。

![client](/phaseK/client.jpg)

`.clientX`、`.clientY` 和 `.offsetX`、`.offsetY` 含义区别在于`坐标原点不同`，其他一样。

特殊情况，如果 HTML 元素 CSS 布局中，距离顶部、左侧距离为零，.clientX、.clientY 和.offsetX、.offsetY 是相同的。

## 标准设备坐标系

Three.js Canvas 画布具有一个`标准设备坐标系`，该坐标系的`坐标原点`在 canvas `画布的中间`位置，x 轴水平向右，y 轴竖直向上。

标准设备坐标系的坐标值不是绝对值，是相对值，范围是[-1,1]区间，也是说 canvas 画布上任何一个位置的坐标，如果用标准设备坐标系去衡量，那么坐标的所有值都在 -1 到 1 之间。

![stander](/phaseK/stander.jpg)

## 屏幕坐标转标准设备坐标

可以用 `.offsetX` 和 `.offsetY` 当做 `canvas 画布的屏幕坐标`。

threejs canvas 画布上一个点，可以用 .offsetX、.offsetY 绝对值表示，同样也可以用标准设备坐标系去表达。

![change](/phaseK/change.jpg)

把 `.offsetX` 和 `.offsetY` 坐标转化为`标准设备坐标`。

```js
// 坐标转化公式
window.addEventListener("click", function (event) {
  const px = event.offsetX;
  const py = event.offsetY;
  //屏幕坐标px、py转标准设备坐标x、y
  //width、height表示canvas画布宽高度
  const x = (px / width) * 2 - 1;
  const y = -(py / height) * 2 + 1;
});
```

canvas 画布的宽度是 width，`.offsetX` 的范围是 0~width,`.offsetX` 除以 canvas 画布宽度 width，就可以从绝对值变成相对值，
范围是 0~1，相对值乘以 2，范围 0~2，再减去 1，范围是-1~1，刚好和 canvas 画布标准设备坐标的范围-1~1 能够对应起来。

对于`.offsetY `的转标准设备坐标 y，和`.offsetX` 转标准设备坐标 x 相似，唯一要注意地方就是两个坐标系的 y 坐标相反，同样计算方式，最后取相反数即可。

## 使用.clientX、.clientY 计算 canvas 画布屏幕坐标

用 `.offsetX`、.`offsetY` 可以直接表示 canvas 画布屏幕坐标，如果用`.clientX`、`.clientY` 表示，这时候要注意，
把`.clientX`、`.clientY` 转化为以 canvas 画布左上角为原点的坐标。

```js{3-5}
// 屏幕坐标转标准设备坐标
window.addEventListener("click", function (event) {
  // left、top表示canvas画布布局，距离顶部和左侧的距离(px)
  const px = event.clientX - left;
  const py = event.clientY - top;
  //屏幕坐标px、py转标准设备坐标x、y
  //width、height表示canvas画布宽高度
  const x = (px / width) * 2 - 1;
  const y = -(py / height) * 2 + 1;
});
```

若 canvas 画布 左上角和网页 body 右上角重合，比如大部分课程 canvas 全屏布局的案例。

要注意，把`.clientX`、`.clientY` 转化为以 canvas 画布左上角为原点的坐标

```js
window.addEventListener("click", function (event) {
  const px = event.clientX;
  const py = event.clientY;
  const x = (px / width) * 2 - 1;
  const y = -(py / height) * 2 + 1;
});
```

实际开发的时候，你可以用 `.clientX`、`.clientY` 计算`标准设备坐标`，也可以用`.offsetX`、`.offsetY` 计算`标准设备坐标`。

::: code-group

```vue [index.vue]
<template>
  <div ref="raycasterDom"></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import * as THREE from "three";
import model from "./model.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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
const camera = new THREE.PerspectiveCamera(
  30,
  width.value / height.value,
  1,
  3000
);
camera.position.set(350, 250, 300);
camera.lookAt(0, 0, 0);

// 渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
renderer.setSize(width.value, height.value);

// 相机轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", () => {
  renderer.render(scene, camera);
});

// resize 事件会在窗口被调整大小时发生
window.addEventListener("resize", () => {
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

window.addEventListener("click", (event) => {
  const px = event.offsetX;
  const py = event.offsetY;

  // 屏幕坐标px,py 转标设备坐标x，y
  // width和height 表示canvas 画布宽高度

  const x = (px / width.value) * 2 - 1;
  const y = -(py / height.value) * 2 + 1;
  console.log("x, y============", x, y);
});
</script>
```

```js [model.js]
import * as THREE from "three";

const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
```

:::
