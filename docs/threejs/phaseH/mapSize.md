---
outline: deep
---

# 阴影 .mapSize 和 .radius

接着上节课阴影范围讲解，本节课给大家介绍**阴影渲染质量的问题**。

前面给大家介绍过**平行光阴影对象** `DirectionalLightShadow` 的阴影相机属性 `.camera`，本节课为大家介绍该阴影对象的**阴影贴图尺寸** `.mapSize` 属性和**阴影半径** `.radius` 属性。

- `light.shadow.mapSize` 阴影贴图尺寸属性(提升边缘渲染效果)
- `light.shadow.radius` 弱化模糊阴影边缘

## light.shadow.mapSize 阴影贴图尺寸属性

你可以把 threejs 生成的光源阴影类比为前面学习过的颜色贴图 `.map`，阴影投射到其它物体上，可以理解为阴影就像贴图一样映射到 `Mesh` 上。

## 阴影默认像素 默认 512\*512 效果图如下

```js
// mapSize属性默认 512x512
console.log("阴影默认像素", directionalLight.shadow.mapSize);
```

![mapSize512](/phaseH/mapSize512.jpg)

## 阴影像素修改为 128\*128 效果图如下

你可以尝试把 `.mapSiz`e 设置为比较小的值(尺寸一般 2 的 n 次方)，查看阴影渲染质量。

```js
directionalLight.shadow.mapSize.set(128, 128);
```

![mapSize128](/phaseH/mapSize128.jpg)

你可以尝试把阴影相机 `.shadow.camera` 的范围扩大多倍，查看阴影渲染质量变化。你可以发现渲染范围越大，阴影渲染效果越差。

```js
// 5、设置三维场景计算阴影的范围
directionalLight.shadow.camera.left = -50 * 6; // [!code --]
directionalLight.shadow.camera.right = 50 * 6; // [!code --]

directionalLight.shadow.camera.left = -50 * 20; // [!code ++]
directionalLight.shadow.camera.right = 50 * 20; // [!code ++]
```

![cameraLeft](/phaseH/cameraLeft.jpg)

如果你的阴影边缘不够清晰，有模糊感、锯齿感，可以适当提升 `.mapSize` 属性值。

```js
// 如果阴影边缘锯齿感的时候，可以适当提升像素
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.mapSize.set(2048, 2048);
```

![mapSize1024](/phaseH/mapSize1024.jpg)

## .shadow.mapSize 和 .shadow.camera 总结

- 在能覆盖包含阴影渲染范围的情况下，`.shadow.camera` 的尺寸尽量小。

- 如果你增加 `.shadow.camera` 长方体尺寸范围，阴影模糊锯齿感，可以适当提升 `.shadow.mapSize` 的大小。

## 阴影半径.shadow.radius 属性

如果在项目中，希望阴影的边缘弱化或者说模糊化，可以通过阴影半径 `.shadow.radius` 属性设置。

```js
// 模糊弱化阴影边缘
console.log(".shadow.radius", directionalLight.shadow.radius); // 1
```

![mapSize1024](/phaseH/mapSize1024.jpg)

适当提升 `.shadow.radius` 你可以感到阴影边缘与非阴影区域是渐变过渡，或者说阴影边缘逐渐弱化或模糊化，没有很明显的边界感。

```js
directionalLight.shadow.radius = 5;
```

![radius5](/phaseH/radius5.jpg)
