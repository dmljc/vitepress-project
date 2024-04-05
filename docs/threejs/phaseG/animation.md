---
outline: deep
---

# 相机动画(.position 和.lookAt())

通过相机对象 Camera 的`.position`属性和`.lookAt()`方法，实现一段`相机动画`。

![animation](/phaseG/animation.jpg)

## 相机运动动画

改变相机的位置`.position`，三维场景在`canvas`画布上呈现不同的效果，如果连续改变相机的位置`.position`，就可以获得一个动画效果。

课件案例源码是一个工厂模型，相机在空中俯视工厂，如果在渲染循环中不停地改变相机位置，这时候产生的视觉效果，就好比你在天上运动，看地面的效果。

```js{4}
// 渲染循环
function render() {
    // 相机直线运动动画
    camera.position.z -= 0.2;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();
```

## 相机圆周运动

在渲染循环中，改变相机位置，在 XOZ 平面上绕着`y轴`圆周运动。

```js{1,2,5-7}
let angle = 0;
let R = 100;
const render = () => {
    // 相机圆周运动
    angle += 0.01;
    camera.position.x = R * Math.cos(angle);
    camera.position.z = R * Math.sin(angle);

    renderer.render(scene, camera);
    requestAnimationFrame(render);
};
```

**这样有个问题：改变.position 属性后，如果不执行.lookAt()方法，相机的观察方向默认不变。**

## 执行 lookAt()计算相机视线方向

如果你希望相机圆周运动的同时，改变相机视线方向，`保持相机镜头始终指向坐标原点或其它位置`，需要每次改变`.position`属性后，重新执行一遍`.lookAt()`方法。

```js{8}
let angle = 0;
let R = 100;
const render = () => {
    // 相机圆周运动
    angle += 0.01;
    camera.position.x = R * Math.cos(angle);
    camera.position.z = R * Math.sin(angle);
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(render);
};
```
