---
outline: deep
---

# 光源对物体表面影响

实际生活中物体表面的明暗效果是会受到光照的影响，比如晚上不开灯，你就看不到物体，灯光比较暗，物体也比较暗。在 threejs 中，咱们用网格模型 Mesh 模拟生活中物体，所以 threejs 中模拟光照 Light 对物体表面的影响，就是模拟光照 Light 对网格模型 Mesh 表面的影响。

## 受光照影响材质

threejs 提供的网格材质，有的受光照影响，有的不受光照影响。

![material](/phaseA/material.svg)

一个立方体长方体使用 MeshLambertMaterial 材质，不同面和光线夹角不同，立方体不同面就会呈现出来不同的明暗效果。

```js
// 漫反射 受光照影响
const material = new THREE.MeshLambertMaterial();
```

## 光源简介

![光源简介](/phaseA/lightIntroduce.svg)

## 环境光

环境光 AmbientLight 没有特定方向，只是整体改变场景的光照明暗。

```js
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);
```

## 平行光

平行光 DirectionalLight 就是沿着特定方向发射。

```js
// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
directionalLight.position.set(80, 100, 50);
// 方向光指向对象网格模型mesh，可以不设置，默认的位置是0,0,0
directionalLight.target = mesh;
scene.add(directionalLight);
```

### 平行光辅助观察 DirectionalLightHelper

通过点光源辅助观察对象 DirectionalLightHelper 可视化点光源。

![平行光辅助观察对象](/phaseA/directionalLightHelper.jpg)

```js
// light-- 被模拟的光源.
// size -- (可选的) 平面的尺寸. 默认为 1.
// color -- (可选的) 如果没有设置颜色将使用光源的颜色.
const dirLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  5,
  0xffff00
);
scene.add(dirLightHelper);
```

## 点光源

![点光源](/phaseA/lightType.png)

点光源 PointLight 可以类比为一个发光点，就像生活中一个灯泡以灯泡为中心向四周发射光线。

```js
// 参数1：0xffffff是纯白光，表示光源颜色
// 参数2：1.0 表示光照强度，可以根据需要调整
const pointLight = new THREE.PointLight(0xffffff, 1.0);
```

除了通过 THREE.PointLight 的参数 2 设置光照强度，你可以可以直接访问光照强度属性.intensity 设置。

```js
// 光照强度
pointLight.intensity = 1.0;
```

### 光源衰减

实际生活中点光源，比如比如一个灯泡，随机距离的改变，光线会衰减，越来越弱，光源衰减属性.decay 默认值是 2.0，如果你不希望衰减可以设置为 0.0。

```js
// 设置光源不随距离衰减
pointLight.decay = 0.0;
```

### 光源位置

你把点光源想象为一个电灯泡，你在 3D 空间中，放的位置不同，模型的渲染效果就不一样。

注意光源位置尺寸大小：如果你希望光源照在模型的外表面，那你就需要把光源放在模型的外面。

```js
// 点光源放在x轴上
pointLight.position.set(400, 0, 0);
```

### 光源添加到场景

光源和网格模型 Mesh 对应一样是三维场景的一部分，自然需要添加到三维场景中才能起作用。

```js
// 点光源添加到场景中
scene.add(pointLight);
```

### 改变光源位置，观察网格模型表面的明暗变化。

```js
pointLight.position.set(400, 200, 300);
```

### 点光源辅助观察 PointLightHelper

通过点光源辅助观察对象 PointLightHelper 可视化点光源。

```js
// 光源辅助观察
const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
scene.add(pointLightHelper);
```

## 版本 bug

::: warning 版本 bug
threejs 最新版本 0.161.0 存在 点光源失效的 bug，所以先降级到 0.150.0 版本了。
:::

## 注意

::: tip 注意
验证点光源效果的时候记得把环境光关掉，为了效果更明显最好不要开启材质的透明属性。
:::
