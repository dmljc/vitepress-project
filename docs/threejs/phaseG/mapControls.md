---
outline: deep
---

# 相机控件 MapControls

地图导航相机控件`MapControls`，你可实现一个类似百度地图的 3D 导航功能。

`MapControls`使用操作

- 平移：鼠标左键拖动
- 旋转：鼠标右键拖动
- 缩放：鼠标中键滚动

## 引入相机控件 MapControls

引入相机控件`MapControls`类，旧版本是通过扩展库文件`MapControls.js`实现，不过新版本`MapControls`类和`OrbitControls`类一样通过 `\examples\jsm\controls目录下的OrbitControls.js`文件引入。

```js
// 引入相机控件`MapControls`
import { MapControls } from "three/addons/controls/OrbitControls.js";
```

## 使用 MapControls

参数 1 是地图导航控件要改变的相机对象，参数 2 是 three.js 渲染对应的 canvas 画布。

```js
const controls = new MapControls(camera, renderer.domElement);
```

## MapControls 本质

`MapControls`本质上就是改变相机的参数，比如相机的`位置属性`、`相机目标观察点`。

```js
controls.addEventListener("change", function () {
  // 鼠标右键旋转时候，查看.position变化
  // 鼠标左键拖动的时候，查看.position、.target的位置会变化
  console.log("camera.position", camera.position);
  console.log("controls.target", controls.target);
});
```

## 缩放、旋转或平移禁止

参考上节课关于`OrbitControls`的介绍，整体思路是一样的，只是鼠标操作有差异。

```js
controls.enablePan = false; //禁止平移
controls.enableZoom = false; //禁止缩放
controls.enableRotate = false; //禁止旋转
```

## 透视投影相机缩放范围

参考上节课关于`OrbitControls`的介绍

```js
//相机位置与观察目标点最小值
controls.minDistance = 200;
//相机位置与观察目标点最大值
controls.maxDistance = 500;
```

## 设置旋转范围

参考上节课关于`OrbitControls`的介绍

```js
// 上下旋转范围
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI / 2;
```

```js
// 左右旋转范围
controls.minAzimuthAngle = -Math.PI / 2;
controls.maxAzimuthAngle = Math.PI / 2;
```
