---
outline: deep
---

# 轨道控制器 OrbitControls

轨道控制器 可以使得相机围绕目标进行轨道运动。就是 实现旋、缩放、平移 的效果。

## OrbitControls 使用

- 旋转：拖动鼠标左键
- 缩放：滚动鼠标中键
- 平移：拖动鼠标右键

## 引入扩展库 OrbitControls.js

```js
// 引入轨道控制器扩展库 OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
```

## 使用 OrbitControls

```js
// 参数分别是：将要被控制的相机、用于事件监听的HTML元素。
const controls = new OrbitControls(camera, renderer.domElement);

// 监听鼠标、键盘事件
// 如果 OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
controls.addEventListener('change', function () {
    // 执行渲染操作
    renderer.render(scene, camera); 
});
```

## OrbitControls 本质

OrbitControls 本质上就是改变相机的参数，比如相机的位置属性，改变相机位置也可以改变相机拍照场景中模型的角度，实现模型的360度旋转预览效果，改变透视投影相机距离模型的距离，就可以改变相机能看到的视野范围。

```js
controls.addEventListener('change', function () {
    // 浏览器控制台查看相机位置变化
    console.log('camera.position',camera.position);
});
```
