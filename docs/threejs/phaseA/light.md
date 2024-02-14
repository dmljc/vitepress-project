---
outline: deep
---

# 光源对物体表面影响

实际生活中物体表面的明暗效果是会受到光照的影响，比如晚上不开灯，你就看不到物体，灯光比较暗，物体也比较暗。在threejs中，咱们用网格模型Mesh模拟生活中物体，所以threejs中模拟光照Light对物体表面的影响，就是模拟光照Light对网格模型Mesh表面的影响。

## 受光照影响材质

threejs提供的网格材质，有的受光照影响，有的不受光照影响。

![material](/material.svg)

一个立方体长方体使用MeshLambertMaterial材质，不同面和光线夹角不同，立方体不同面就会呈现出来不同的明暗效果。

```js
// 漫反射 受光照影响
const material = new THREE.MeshLambertMaterial(); 
```

## 光源简介

![光源简介](/lightIntroduce.svg)


## 点光源

![点光源](/lightType.png)

点光源PointLight可以类比为一个发光点，就像生活中一个灯泡以灯泡为中心向四周发射光线。

```js
// 参数1：0xffffff是纯白光，表示光源颜色
// 参数2：1.0 表示光照强度，可以根据需要调整
const pointLight = new THREE.PointLight(0xffffff, 1.0);
```

除了通过THREE.PointLight的参数2设置光照强度，你可以可以直接访问光照强度属性.intensity设置。

```js
// 光照强度
pointLight.intensity = 1.0;
```

## 光源衰减

实际生活中点光源，比如比如一个灯泡，随机距离的改变，光线会衰减，越来越弱，光源衰减属性.decay默认值是2.0，如果你不希望衰减可以设置为0.0。

```js
// 设置光源不随距离衰减
pointLight.decay = 0.0;
```

## 光源位置

你把点光源想象为一个电灯泡，你在3D空间中，放的位置不同，模型的渲染效果就不一样。

注意光源位置尺寸大小：如果你希望光源照在模型的外表面，那你就需要把光源放在模型的外面。

```js
// 点光源放在x轴上
pointLight.position.set(400, 0, 0);
```

## 光源添加到场景

光源和网格模型Mesh对应一样是三维场景的一部分，自然需要添加到三维场景中才能起作用。

```js
// 点光源添加到场景中
scene.add(pointLight); 
```

## 改变光源位置，观察网格模型表面的明暗变化。

```js
pointLight.position.set(400, 200, 300); 
```