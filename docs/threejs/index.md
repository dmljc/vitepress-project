---
outline: deep
---

# 基础概念

入门 Three.js 的第一步，就是认识 `场景Scene`、`相机Camera`、`渲染器Renderer`三个基本概念。

![基础概念](/phaseA/scene.png)

::: code-group

```js:line-numbers{0} [tempalte]
<template>
    <div id="container"></div>
</template>
```

```ts:line-numbers{0} [script.ts]
<script lang="ts" setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
/*
 * 创建3D场景对象Scene
 */
const scene = new THREE.Scene();
/*
 * 创建网格模型
 */
const geometry = new THREE.BoxGeometry(50, 50, 50); // 定义几何体 长方形 BoxGeometry 长宽高都是50
const material = new THREE.MeshLambertMaterial({ // 创建一个材质对象
    color: '#f66' // 设置材质颜色
});
// 使用 几何体 和 材质对象 创建一个网格模型，表示生活中的一个物体
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0); // 设置网格模型在三维空间中的位置坐标，默认是坐标原点
scene.add(mesh); // 把网格模型添加到场景中
/*
 * 创建辅助坐标轴
 */
const axesHelper = new THREE.AxesHelper(200);
scene.add(axesHelper); // 把坐标轴添加到场景中
/*
 * 添加光源
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // 环境光
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1); // 点光源
pointLight.position.set(200, 300, 400);
scene.add(pointLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 20, 0xff0000);// 点光源辅助观察
scene.add(pointLightHelper);
/*
 * 创建透视投影相机
 */
const width = window.innerWidth - 296; // width和height用来设置渲染后，输出的画布宽高度
const height = window.innerHeight - 136;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000); // 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
camera.position.set(200, 200, 200); // 相机在Three.js三维坐标系中的位置
camera.lookAt(0, 0, 0); // 相机观察目标指向Three.js坐标系原点
/*
 * 创建3D渲染器
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height); // 设置three.js渲染区域的尺寸(像素px)
renderer.render(scene, camera); // 执行渲染操作
const controls = new OrbitControls(camera, renderer.domElement);// 创建轨道控制器 OrbitControls
// 监听鼠标，键盘事件
controls.addEventListener('change', () => {
    renderer.render(scene, camera);
});
/*
 * 动画，周期性执行，默认理想状态下是每秒钟执行60次
 * 渲染循环
 */
const renderFn = () => {
    mesh.rotateY(0.06);  // 周期性旋转，每次旋转0.01弧度
    renderer.render(scene, camera); // 周期性执行相机的渲染功能，更新canvas画布上的内容
    requestAnimationFrame(renderFn);
};
renderFn();
// resize 事件会在窗口被调整大小时发生
window.addEventListener('resize', () => {
    const w = window.innerWidth - 296;
    const h = window.innerHeight - 136;
    // 重置渲染器输出画布canvas尺寸
    renderer.setSize(w, h);
    // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
    camera.aspect = w / h;
    // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix();
});
onMounted(() => {
    document.getElementById('container')?.appendChild(renderer.domElement);
});
</script>
```

```js:line-numbers{0} [less]
<style scoped lang="less">
#container {
    width: calc(100vw - 280px);
    height: 100%;
}
</style>
```

:::
