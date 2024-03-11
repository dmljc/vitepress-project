---
outline: deep
---

# 矩形Mesh+背景透明png贴图

项目开发中，把一个背景`透明的.png`图像作为平面矩形网格模型`Mesh`的`颜色贴图`是一个非常有用的功能，通过这样一个功能，可以对three.js三维场景进行`标注`。

整体思路：创建一个矩形平面，设置颜色贴图`.map`，注意选择背景透明的.png图像作为颜色贴图，同时材质设置    `transparent: true`，这样png图片背景完全`透明的部分不显示`。

## 网格地面辅助观察 GridHelper

```js
// 添加一个辅助网格地面
const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
scene.add(gridHelper);
```

## 旋转平移矩形平面

`PlaneGeometry`矩形平面默认是在XOY平面上，如果你想平行于XOZ平面，就需要手动旋转。

```js
mesh.rotateX(-Math.PI/2); 
```

如果你不想矩形平面Mesh与地面网格线重合，可以通过位置属性`.position`偏移。

```js
// 适当偏移，不与地面重合
mesh.position.y = 1;
```

完整代码如下：

```js
const geometry = new THREE.PlaneGeometry(60,60);
const texLoader = new THREE.TextureLoader();
const texture = texLoader.load('./指南针.png');
const material = new THREE.MeshLambertMaterial({
    map: texture,
    transparent: true
});
const mesh = new THREE.Mesh(geometry, material);

mesh.rotateX(-Math.PI/2);

mesh.position.y = 10;
```