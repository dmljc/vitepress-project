---
outlie: deep
---

# 精灵模型 Sprite

Three.js 的精灵模型 `Sprite` 和 Threejs 的网格模型 `Mesh` 一样都是模型对象，父类都是 `Object3D`，关于精灵模型对象 `Sprite` 的方法和属性除了可以查看文档 `Sprite`，也可以查看父类 `Object3D`。

![sprite](/phaseI/sprite.png)

## 创建精灵模型材质 SpriteMaterial

![material](/phaseI/material.png)

精灵材质对象 `SpriteMaterial` 和普通的网格材质一样可以设置颜色 `.color`、颜色贴图 `.map`、开启透明 `.transparent`、透明度 `.opacity` 等属性，精灵材质对象 `SpriteMaterial` 的父类是材质 `Material`。

```js
// 创建精灵材质对象SpriteMaterial
const spriteMaterial = new THREE.SpriteMaterial({
  color: 0x00ffff, // 设置颜色
});
```

## 创建精灵模型 Sprite

创建精灵模型对象 `Sprite` 和创建网格模型对象一样需要创建一个材质对象，不同的地方在于创建精灵模型对象不需要创建几何体对象 `Geometry`。

```js
// 创建精灵模型对象，不需要几何体geometry参数
const sprite = new THREE.Sprite(spriteMaterial);

const mesh = new THREE.Mesh(geometry, material);
```

精灵模型 `Sprite` 默认是一个`矩形形状`，默认长宽都是 `1`，默认在坐标原点位置。Sprite 默认尺寸为 1，如果你在画布上看不太清，可以适当调整相机参数。

对于透视投影相机而言，Sprite 和 Mesh 一样遵循远小近大的投影规律。

## 正投影相机验证 Sprite 尺寸

`Sprite` 默认尺寸是 1，如果正投影相机对象的 top，bottom 范围分别为 0.5，-0.5，上下方向渲染范围是 1，精灵模型默认尺寸长宽都是 1，这样刚好上下方向 100% 填充画布。

```js
const s = 0.5; //控制left, right, top, bottom范围大小
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 8000);
```

## 对比 Sprite 和矩形平面 Mesh

`Sprite` 形状是矩形，`PlaneGeometry` 创建的网格模型 `Mesh `的形状也是矩形。

`Sprite` 与矩形平面 `Mesh` 的区别在于，当你旋转三维场景的时候，如果通过相机控件 `OrbitControls` 旋转测试，你可以发现 `Sprite` 矩形平面会始终平行于 `Canvas 画布`或者说屏幕，而矩形平面 `Mesh` 的姿态角度会跟着旋转，不一定平行于` canvas 画布`。

## 属性 .position、.scale

精灵模型 Sprite 和 Mesh 一样具有位置 `.position` 和缩放 `.scale` 属性。

`sprite.scale` 只需要设置 x、y 两个分量就可以，z 方向默认值就行。

```js
// 控制精灵大小
console.log("sprite.scale", sprite.scale);
sprite.scale.set(50, 25, 1); // 只需要设置x、y两个分量就可以
```

`sprite.position` 设置精灵模型在三维空间中的位置坐标

```js
sprite.position.set(0, 50, 0);
```

对比尺寸相同 Spirte 和矩形平面 Mesh

对于网格模型 Mesh 而言，可以通过几何体 geometry 和 mesh.scale 定义尺寸，Spirte 没有几何体，需要通过 sprite.scale 定义矩形精灵的长和宽。

```js
// 尺寸相同的Sprite和矩形平面Mesh
const sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(50, 25, 1);
const geometry = new THREE.PlaneGeometry(50, 25);
const mesh = new THREE.Mesh(geometry, material);
```

## SpriteMaterial 旋转属性 .rotation

精灵材质 `SpriteMaterial` 的属性除了和网格材质类似的属性和方法外，还有一些自己独特的方法和属性，比如 `.rotation` 旋转精灵模型，更多相关属性和方法可以查看 threejs 文档关于 `SpriteMaterial` 的介绍。

```js
const spriteMaterial = new THREE.SpriteMaterial({
  rotation: Math.PI / 4, // 旋转精灵对象45度，弧度值
});
```
