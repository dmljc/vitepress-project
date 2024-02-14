---
outline: deep
---

# 三维坐标系

## 辅助观察坐标系

![三维坐标系](/axesHelper.jpg)

THREE.AxesHelper()的参数表示坐标系坐标轴线段尺寸大小，你可以根据需要改变尺寸。

```js
// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper);
```

## 材质半透明设置

设置材质半透明,这样可以看到坐标系的坐标原点。

```js
const material = new THREE.MeshBasicMaterial({
    color: 0x0000ff, // 设置材质颜色
    transparent: true,// 开启透明
    opacity: 0.5, // 设置透明度
});
```

## AxesHelper的xyz轴

three.js坐标轴颜色红R、绿G、蓝B分别对应坐标系的x、y、z轴，对于three.js的3D坐标系默认y轴朝上。

## 设置模型在坐标系中的位置或尺寸

通过模型的位置、尺寸设置，加深3D坐标系的概念。

测试：设置长方体xyz不同方向尺寸

```js
// 设置几何体长宽高，也就是x、y、z三个方向的尺寸
// 对比三个参数分别对应xyz轴哪个方向
new THREE.BoxGeometry(100, 60, 20);
```

测试：改变位置

```js
// 设置模型mesh的xyz坐标
mesh.position.set(100,0,0);
```

## 改变相机参数——预览新的渲染效果

你可以尝试源码中改变相机的参数，看看场景中的物体渲染效果怎么变化。

相机放在x轴负半轴，目标观察点是坐标原点，这样相当于相机的视线是沿着x轴正方向，只能看到长方体的一个矩形平面。

```js
camera.position.set(-1000, 0, 0);
camera.lookAt(0, 0, 0);
```

```js
// 相机视线沿着x轴负半轴，mesh 位于相机后面，自然看不到
camera.position.set(-1000, 0, 0);
camera.lookAt(-2000, 0, 0);
```

## 相机far偏小，mesh位于far之外，物体不会显示在画布上。
```js
// const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
// 你可以进行下面测试，改变相机参数，把mesh放在视锥体之外，看看是否显示
// 3000改为300，使mesh位于far之外，mesh不在视锥体内，被剪裁掉
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 300);
```

![perspective](/perspective.png)