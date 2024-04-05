---
outline: deep
---

# 动画渲染循环

threejs 可以借助 HTML5 的 API 请求动画帧 `window.requestAnimationFrame` 实现动画渲染。

## requestAnimationFrame

请求动画帧 requestAnimationFrame，可以实现周期性循环执行，默认每秒钟执行 **60** 次，但不一定能做到，要看代码的性能.

```js
let i = 0;
function render() {
  i += 1;
  console.log("执行次数" + i);
  requestAnimationFrame(render); //请求再次执行函数render
}
render();
```

::: tip 备注说明：
&nbsp;&nbsp;&nbsp;&nbsp;对于部分高刷新率的电脑硬件设备，requestAnimationFrame 每秒钟默认调用函数执行次数也是有可能超过 60 次的，比如你的电脑显卡、显示器等硬件能够支持 **144hz** 刷新频率，requestAnimationFrame 的 每秒执行上限，也可以接近 144 帧率。
:::

## 旋转动画

动画说白了就是一张张照片，连起来依次展示，这样就形成一个动画效果，只要帧率高，人的眼睛就感觉不到卡顿，是连续的视频效果。

```js
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
// renderer.render(scene, camera); // 执行渲染操作
document.body.appendChild(renderer.domElement);

// 渲染函数
function render() {
  renderer.render(scene, camera); // 执行渲染操作
  mesh.rotateY(0.01); // 每次绕y轴旋转0.01弧度
  requestAnimationFrame(render); // 请求再次执行渲染函数render，渲染下一帧
}
render();
```

## 计算两帧渲染时间间隔和帧率

`Clock` 用于跟踪时间。如果 performance.now 可用，则 Clock 对象通过该方法实现，否则回落到使用略欠精准的`Date.now`来实现。

- performance.now：是浏览器(Web API)提供的方法，不同浏览器获取到的精度不同。
- Date.now：是 Javascript 内置方法，差异主要在于浏览器遵循的 ECMAScript 规范。

```js
// 渲染循环
const clock = new THREE.Clock();
function render() {
  const spt = clock.getDelta() * 1000; // 毫秒
  console.log("两帧渲染时间间隔(毫秒)", spt);
  console.log("帧率FPS", 1000 / spt);
  renderer.render(scene, camera); // 执行渲染操作
  mesh.rotateY(0.01); // 每次绕y轴旋转0.01弧度
  requestAnimationFrame(render); // 请求再次执行渲染函数render，渲染下一帧
}
render();
```

## 渲染循环和相机控件 OrbitControls

设置了渲染循环，相机控件`OrbitControls`就不用再通过事件`change`执行`renderer.render(scene, camera);`，毕竟渲染循环一直在执行 renderer.render(scene, camera);
