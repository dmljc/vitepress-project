---
outline: deep
---
# 基础概念

入门Three.js的第一步，就是认识 `场景Scene`、`相机Camera`、`渲染器Renderer`三个基本概念。

<!-- 请注意，应使用根绝对路径来引用放置在 public 中的文件
例如，public/icon.png 应始终在源代码中使用 /icon.png 引用。 -->

![基础概念](/scene.png)

```vue:line-numbers {0}
<template>
    <div id="container"></div>
</template>
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

// 定义几何体 长方形 BoxGeometry 长宽高都是50
const geometry = new THREE.BoxGeometry(50, 50, 50);

// 创建一个材质对象
// 一种非光泽表面的材质 MeshLambertMaterial，没有镜面高光。
// 该材质使用基于非物理的 Lambertian模型来计算反射率。
const material = new THREE.MeshLambertMaterial({
    color: '#f66' // 设置材质颜色
});

// 使用 几何体 和 材质对象 创建一个网格模型，表示生活中的一个物体
const mesh = new THREE.Mesh(geometry, material);

// 设置网格模型在三维空间中的位置坐标，默认是坐标原点
mesh.position.set(0, 0, 0);
// 把网格模型添加到场景中
scene.add(mesh);

/*
 * 创建辅助坐标轴
 */

//  AxesHelper 用于简单模拟3个坐标轴的对象.
// 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
// 参数 200 表示代表轴的线段长度. 默认为 1.
const axesHelper = new THREE.AxesHelper(200);
// 把坐标轴添加到场景中
scene.add(axesHelper);

/*
 * 添加光源
 */

// 环境光 AmbientLight 会均匀的照亮场景中的所有物体，但是不能用来投射阴影，因为它没有方向。
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// 点光源 从一个点向各个方向发射的光源。一个常见的例子是模拟一个灯泡发出的光。
// color:灯光颜色，intensity:光照强度，默认为1.
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(200, 300, 400);
scene.add(pointLight);

// 可视化点光源，创建一个虚拟的球形网格 Mesh 的辅助对象来模拟 点光源 PointLight.
const pointLightHelper = new THREE.PointLightHelper(pointLight, 20, 0xff0000);
scene.add(pointLightHelper);

/*
 * 创建透视投影相机
 */

// width和height用来设置渲染后，输出的画布宽高度。
const width = window.innerWidth - 296;
const height = window.innerHeight - 136;

/*
 * 透视投影相机设置
 * 这一投影模式被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。
 */
// 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
//相机在Three.js三维坐标系中的位置
camera.position.set(200, 200, 200);
//相机观察目标指向Three.js坐标系原点
camera.lookAt(0, 0, 0);

/*
 * 创建3D渲染器
 */

const renderer = new THREE.WebGLRenderer();
//设置three.js渲染区域的尺寸(像素px)
renderer.setSize(width, height);
//执行渲染操作
renderer.render(scene, camera);
// Orbit controls（轨道控制器）可以使得相机围绕目标进行轨道运动。
//创建控件对象
const controls = new OrbitControls(camera, renderer.domElement);

// 监听鼠标，键盘事件
// 如果使用了渲染循环（动画）renderFn（），就没有必要更新了change事件了；
controls.addEventListener('change', () => {
    renderer.render(scene, camera);
});

/*
 * 动画，周期性执行，默认理想状态下是每秒钟执行60次
 * 渲染循环
 */

const renderFn = () => {
    // 周期性旋转，每次旋转0.01弧度
    mesh.rotateY(0.06);
    // 周期性执行相机的渲染功能，更新canvas画布上的内容
    renderer.render(scene, camera);
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
    //three.js执行渲染命令会输出一个canvas画布，也就是一个HTML元素，你可以插入到web页面中
    document.getElementById('container')?.appendChild(renderer.domElement);
});
</script>
<style scoped lang="less">
#container {
    width: calc(100vw - 280px);
    height: 100%;
}
</style>
```