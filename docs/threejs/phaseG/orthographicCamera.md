---
outline: deep
---

# 正投影相机

在入门阶段给大家介绍过比较常用的透视投影相机`PerspectiveCamera`，下面给大家介绍另外一个相机对象正投影相机`OrthographicCamera`。

![camera](/phaseG/camera.svg)

## 正投影长方体可视空间

正投影相机的长方体可视化空间和透视投影`PerspectiveCamera`视锥体相似，只是形状不同。

![orthographic](/phaseG/orthographic.png)

## 语法

```js
OrthographicCamera(left, right, top, bottom, near, far);
```

|参数	|含义|
|---------|-------|
|left	|渲染空间的左边界|
|right	|渲染空间的右边界|
|top	|渲染空间的上边界|
|bottom	|渲染空间的下边界|
|near	|near属性表示的是从距离相机多远的位置开始渲染，一般情况会设置一个很小的值。 默认值0.1|
|far	|far属性表示的是距离相机多远的位置截止渲染，如果设置的值偏小小，会有部分场景看不到。 默认值2000|

## 渲染范围设置

设置正投影相机长方体可视化空间的渲染范围

```js
// 正投影相机
const width = window.innerWidth; // canvas画布宽度
const height = window.innerHeight; // canvas画布高度
const k = width / height; // canvas画布宽高比
const s = 600; // 控制left, right, top, bottom 范围大小
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 8000);
```

## 相机位置和观察目标设置

相当于相机放在y轴上，向下观察地面上阵列的长方体。

```js
camera.position.set(0, 2000, 0); // 相机放在了y轴上
camera.lookAt(0, 0, 0); // 指向坐标原点
```

注意`.position`位置和`far`参数的设置，确保你想看到的物体能够包含在`far`之内，超出`far`的不会渲染。

测试：`far`减小，物体不在可视化空间之内，看不到。

```js
new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 500)
```

测试：`.position.y`增大，物体不在可视化空间之内，看不到

```js
camera.position.set(0, 10000, 0);
```

## 调整left, right, top, bottom范围大小

如果你想整体预览全部立方体，就需要调整相机的渲染范围，比如设置上下左右的范围。

s设置为2000，上下方向top, bottom渲染范围大概4000左右，三维场景中的立方体分布范围也是大约4000左右，沿着y轴观察，刚好近似可以看到全部长方体。

```js
const s = 2000;
```

## 改变位置参数

改变位置参数，改变了观察视角，渲染效果也跟着改变。

```js
camera.position.set(800, 800, 800);
```
上面位置你会发现部分立方体会被剪裁掉，其实很简单，有些物体在相机的后面，相机自然看不到，你可以改变相机参数渲染全部立方体。

```js
camera.position.set(1500, 1500, 1500);
```

## 改变观察目标 .lookAt()

指向坐标原点，坐标原点出现在canvas画布中间

```js
camera.lookAt(0, 0, 0);
```

指向坐标(2000, 0, 2000)，(2000, 0, 2000)对应的场景中位置出现在canvas画布中间。

```js
camera.lookAt(2000, 0, 2000);
```

## 正投影相机和透视投影相机区别

一句话描述，正投影相机`OrthographicCamera`和透视投影相机`PerspectiveCamera`的区别就是，透视投影可以模拟人眼观察世界的视觉效果，正投影相机不会。

## 对比透视投影和正投影预览工厂视觉差异

比如前面工厂的gltf模型加载案例，就是用透视投影相机模拟人在空中俯视地面的效果，如果使用正投影相机渲染效果就不太自然。

## 相机选择

对于大部分需要模拟人眼观察效果的场景，需要使用透视投影相机，比如人在场景中漫游，或是在高处俯瞰整个园区或工厂。

正投影没有透视效果，也就是不会模拟人眼观察世界的效果。在一些不需要透视的场景你可以选择使用正投影相机，比如整体预览一个中国地图的效果，或者一个2D可视化的效果。