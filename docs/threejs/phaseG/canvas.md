---
outline: deep
---

# 正投影相机-Canvas尺寸变化

## WebGL渲染器更新Canvas画布尺寸

`onresize` 事件会在窗口被调整大小时发生

```js
// window.addEventListener('resize', () => {});
window.onresize = function () {
    // canvas画布宽度
    const width = window.innerWidth; 
    //canvas画布高度
    const height = window.innerHeight; 
    // 重置渲染器输出画布canvas尺寸
    renderer.setSize(width, height);
};
```

## 相机参数更新

`.aspect`属性受到`canvas`画布宽高度影响，当canvas画布尺寸发生变化的时候，需要更新透视投影相机`PerspectiveCamera`的`.aspect`属性。

```js
window.onresize = function () {
    // width、height表示canvas画布宽高度
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
};
```

你预览案例源码中正投影相机代码，可以看到，正投影相机`OrthographicCamera`的`left`、 `right`属性受到`canvas`画布宽高比影响，所以需要随着`canvas`画布更新。

```js
// canvas画布宽高比
const k = width / height; 
const s = 50; 
// 控制left, right, top, bottom范围大小
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 8000);
```

```js
// Canvas画布跟随窗口变化
window.onresize = function () {
    const width = window.innerWidth; 
    const height = window.innerHeight; 
    // 1. WebGL渲染器渲染的Cnavas画布尺寸更新
    renderer.setSize(width, height);
    // 2.1.更新相机参数
    const k = width / height; 
    camera.left = -s*k;
    camera.right = s*k;
    // 2.2.相机的left, right, top, bottom属性变化了，通知threejs系统
    camera.updateProjectionMatrix();
};
```