---
outline: deep
---

# OrbitControls 旋转缩放限制

课程中经常会用到相机控件`OrbitControls`的不同功能，本节课就会大家补充新的知识点，比如控制缩放的最大最小范围，比如限制旋转的角度范围，比如禁止平移。

![control](/phaseG/control.jpg)

## 禁止右键平移 .enablePan 属性

比如一个展示一个三维场景，你不希望鼠标右键拖动会产生一个平移效果。可以通过设置相机空间对象`OrbitControls`的`.enablePan`属性。

```js
controls.enablePan = false; // 禁止右键拖拽
```

## 禁止缩放 .enableZoom

通过`.enableZoom`属性可以控制是否允许鼠标中键`缩放`场景，`.enableZoom`属性默认值`true`。

```js
controls.enableZoom = false;
```

## 禁止旋转 .enableRotate

通过`.enableRotate`属性可以控制是否允许鼠标左键`旋转`场景，`.enableRotate`属性默认值`true`。

```js
controls.enableRotate = false;
```

## OrbitControls.target 属性

相机控件`OrbitControls.target`属性对应的就是相机的`.lookAt()`观察目标。
执行`controls.update()`;相机控件内部会执行`camera.lookAt(controls.target)`。

```js
// controls.target默认值是坐标原点
controls.target.set(x, y, z);
//update()函数内会执行camera.lookAt(x, y, z)
controls.update();
```

## 透视投影相机缩放范围

在实际应用中，透视投影相机的规则是远小近大，相机距离目标观察点距离越远，目标模型显示越小，距离越近显示越大

前面给大家讲解过，对于透视投影相机而言，`OrbitControls`缩放，本质上就是改变相机的位置属性`.position`。

这就是说如果你想控制缩放范围，就是约束相机位置`.position`的变化范围，`OrbitControls`提供了两个属性`.minDistance`和`.maxDistance`可以帮助你实现。

`.minDistance`表示相机位置`.position`和相机目标观察点`controls.target`的最小距离。

```js
// 相机位置与观察目标点最小值
controls.minDistance = 200;
```

`.maxDistance`表示相机位置`.position`和相机目标观察点`controls.target`的最大距离。

```js
// 相机位置与观察目标点最大值
controls.maxDistance = 500;
```

## 正投影缩放范围

对于正投影相机对象`OrthographicCamera`，可以通过相机控件`OrbitControls`的`.minZoom`和`.maxZoom`属性实现

```js
// 缩放范围
controls.minZoom = 0.5;
controls.maxZoom = 2;
```

## 相机位置与目标观察点距离 .getDistance()

`controls.getDistance()`可以计算出来相机位置`.position`和相机目标观察点`controls.target`的距离。

```js
// 相机位置与目标观察点距离
const dis = controls.getDistance();
console.log("dis", dis);
```

## 可视化设置相机缩放范围

如果你直接凭感觉设置`minDistance`和`maxDistance`，不太好把握具体范围，这时候通过`.getDistance()`辅助解决。
在`canvas`画布上，你用鼠标缩放三维场景，这时候会改变透视投影相机位置，那么相机与目标观察点的距离也会改变，这时候可以通过`.getDistance()`计算出来此刻相机与目标观察点的距离，用于设置`minDistance`和`maxDistance`。

```js
controls.addEventListener("change", function () {
  // 相机位置与目标观察点距离
  const dis = controls.getDistance();
  console.log("dis", dis);
});
```

## 设置旋转范围

展示一个三维场景，你想控制 360 度旋转范围，比如一个工厂，你不希望用户看到工厂的底部，你可以通过设置相机的旋转范围属性来实现。

通过`.minPolarAngle` 和`.maxPolarAngle` 属性控制上下的旋转范围，默认从 0 到 180 度，默认情况下 0 度，XOZ 平面平行 canvas 画布，y 轴垂直指向屏幕外，90 度时候，渲染结果 y 轴竖直向上，180 度，XOZ 平面平行 canvas 画布，y 轴垂直指向屏幕内。

```js
// 上下旋转范围
controls.minPolarAngle = 0; // 默认值0
controls.maxPolarAngle = Math.PI; // 默认值Math.PI
```

`.maxPolarAngle`属性设置为 90 度，这样不能看到工厂模型底部

```js
controls.maxPolarAngle = Math.PI / 2;
```

通过`.minAzimuthAngle`和`.maxAzimuthAngle`属性控制左右的旋转范围。

```js
// 左右旋转范围
controls.minAzimuthAngle = -Math.PI / 2;
controls.maxAzimuthAngle = Math.PI / 2;
```

## 示例代码如下：

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
    antialias: true
});
renderer.setSize(width, height);

// 相机轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', () => {
    renderer.render(scene, camera);
});

// 禁止右键平移
// controls.enablePan = false;
// 禁止缩放
// controls.enableZoom = false;
// 禁止旋转
// controls.enableRotate = false;

// 上下旋转设置为90度
controls.maxPolarAngle = Math.PI / 2;

// 左右旋转范围
controls.minAzimuthAngle = -Math.PI / 4;
controls.maxAzimuthAngle = Math.PI / 4;

// 相机位置与目标观察点距离
const dis = controls.getDistance();
console.log('dis', dis); // 410
controls.minDistance = 200;
controls.maxDistance = 300;

controls.addEventListener('change', () => {
    // 相机位置与目标观察点距离
    const dis = controls.getDistance();
    console.log('change--dis', dis);
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
    // renderer.setClearColor(0x444544, 0.4);
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
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 创建一个GLTF加载器
const loader = new GLTFLoader();
const group = new THREE.Group();

loader.load('/工厂建模数据/工厂.gltf', (gltf) => {
    group.add(gltf.scene);
});

export default group;
```
:::