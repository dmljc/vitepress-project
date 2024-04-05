---
outline: deep
---

# Three.js 渲染结果保存为图片

保存 three.js 渲染结果，其实就是保存 three.js 对应 canvas 画布上的图像。那么这个问题就转化为如何把 canvas 画布保存为一个图片。

![save](/phaseE/save.png)

## 超链接元素 a 下载文件

通过超链接元素 a 合成一个文件，并下载。

你通过下面代码，可以通过点击按钮“下载”，创建一个 txt 文件，下载到本地，txt 文件包含字符串“一些数据”。

```vue
<button type="button" name="button" onclick="saveFile()">下载</button>
<script>
function saveFile() {
  // 创建一个超链接元素，用来下载保存数据的文件
  const link = document.createElement("a");
  // 通过超链接herf属性，设置要保存到文件中的数据
  link.href = window.URL.createObjectURL(new Blob(["一些数据"]));
  link.download = "文件名称.txt"; //下载文件名
  link.click(); //js代码触发超链接元素a的鼠标点击事件，开始下载文件到本地
}
</script>
```

## 1、配置 webgl 渲染器 preserveDrawingBuffer:true

```js
// WebGL渲染器设置
const renderer = new THREE.WebGLRenderer({
  //想把canvas画布上内容下载到本地，需要设置为true
  preserveDrawingBuffer: true,
});
```

## 2. 按钮绑定鼠标事件

创建一个 UI 按钮"下载"，绑定一个鼠标单击事件，用于后面点击下载图片。

```js
// 鼠标单击id为download的HTML元素，threejs渲染结果以图片形式下载到本地
document.getElementById("download").addEventListener("click", function () {});
```

## 3. 创建超链接元素 a：用于保存下载文件

```js
// 鼠标单击id为download的HTML元素，threejs渲染结果以图片形式下载到本地
document.getElementById('download').addEventListener('click',function(){
    // 创建一个超链接元素，用来下载保存数据的文件
    const link = document.createElement('a');
    // 通过超链接herf属性，设置要保存到文件中的数据
    link.href = ;
    link.download = 'threejs.png'; //下载文件名
    link.click(); //js代码触发超链接元素a的鼠标点击事件，开始下载文件到本地
});
```

## 4. Cavnas 方法.toDataURL()

`Canvas`画布通过`.toDataURL()`方法可以获取画布上的像素信息。`canvas.toDataURL("image/png")` 表示以 png 格式获取像素数据，可以直接赋值给`超链接元素a`的`.herf`属性下载到本地。

```js
const link = document.createElement("a");
// 通过超链接herf属性，设置要保存到文件中的数据
const canvas = renderer.domElement; //获取canvas对象
link.href = canvas.toDataURL("image/png");
```

以不同的格式获取像素信息

```js
canvas.toDataURL("image/png");
canvas.toDataURL("image/jpeg");
canvas.toDataURL("image/bmp");
```

## 完整代码如下

::: code-group

```vue:line-numbers [template]
<template>
    <div ref="canvas"></div>
    <div class="pos">
        <div id="red" class="bu" @click="changeColor(0xff0000)">红</div>
        <div id="green" class="bu" @click="changeColor(0x00ff00)" style="margin-left: 10px">绿</div>
    </div>

    <button id="download" @click="onDownload">下载</button>
</template>
```

```vue:line-numbers [js]
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
// import model from './model';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = ref(null);
// 场景
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(6, 6, 6);
const material = new THREE.MeshStandardMaterial({
    color: 0x0000ff
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 辅助观察坐标系
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// 灯光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(20, 20, 20);
scene.add(directionalLight);

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// 相机
const width = window.innerWidth - 296;
const height = window.innerHeight - 136;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(40.0, 40.0, 40.0);
camera.lookAt(0, 0, 0);

// 渲染器
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    // alpha: true,
    // 想把canvas画布上内容下载到本地，需要设置为true
    preserveDrawingBuffer: true
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
    // renderer.render(scene, camera);
    // 如果相机的一些属性发生了变化，需要执行 updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix();
});

const onDownload = () => {
    // 创建一个超链接元素，用来下载保存数据的文件
    const link = document.createElement('a');
    const canvas = renderer.domElement; //获取canvas对象
    // 通过超链接herf属性，设置要保存到文件中的数据
    link.href = canvas.toDataURL('image/png');
    link.download = 'threejs.png'; //下载文件名
    link.click(); //js代码触发超链接元素a的鼠标点击事件，开始下载文件到本地
};

onMounted(() => {
    // 设置 Canvas 背景颜色和官网demo一致。
    renderer.setClearColor(0x444544, 0.4);
    // renderer.setClearAlpha(0.5);
    canvas.value.appendChild(renderer.domElement);
    // js 方案改变材质颜色
    // document.getElementById("red").addEventListener('click', function(){
    //     mesh.material.color.set(0xff0000);
    // });
    // document.getElementById("green").addEventListener('click', function(){
    //     mesh.material.color.set(0x00ff00);
    // });

    // 鼠标单击id为download的HTML元素，threejs渲染结果以图片形式下载到本地
    document.getElementById('download').addEventListener('click', function () {
        onDownload();
    });
});

// vue方案改变材质颜色
const changeColor = (color: number) => {
    mesh.material.color.set(color);
};

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

```less:line-numbers [less]
<style lang="less" scoped>
.bu {
    background: rgba(255, 255, 255, 0.1);
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
    display: inline-block;
    border-radius: 30px;
}

.bu:hover {
    cursor: pointer;
    background: #aaa;
}

.pos {
    position: absolute;
    left: 52%;
    bottom: 100px;
}
</style>
:::
```
