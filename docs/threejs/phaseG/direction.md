---
outline: deep
---

# 不同方向的投影视图

通过 UI 按钮界面交互改变 threejs 相机的观察视角。

![direction](/phaseG/direction.jpg)

## x 轴方向观察

`注意：在 mounted 钩子中执行以下逻辑。`

```js
// 通过UI按钮改变相机观察角度
document.getElementById("x").addEventListener("click", () => {
  camera.position.set(500, 0, 0); //x轴方向观察
  camera.lookAt(0, 0, 0); //重新计算相机视线方向
});
```

## y 轴方向观察

```js
document.getElementById("y").addEventListener("click", () => {
  camera.position.set(0, 500, 0); //y轴方向观察
  camera.lookAt(0, 0, 0); //重新计算相机视线方向
});
```

## z 轴方向观察

```js
document.getElementById("z").addEventListener("click", () => {
  camera.position.set(0, 0, 500); //z轴方向观察
  camera.lookAt(0, 0, 0); //重新计算相机视线方向
});
```
