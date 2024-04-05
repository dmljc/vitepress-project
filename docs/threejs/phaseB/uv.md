---
outline: deep
---

# 创建纹理贴图

通过`纹理贴图`加载器`TextureLoader`的`load()`方法加载一张`图片`可以返回一个纹理对象`Texture`，纹理对象`Texture`可以作为模型材质颜色贴图`.map`属性的值。

```js
const geometry = new THREE.PlaneGeometry(200, 100);
// 纹理贴图加载器TextureLoader
const texLoader = new THREE.TextureLoader();
// .load()方法加载图像，返回一个纹理对象Texture
const texture = texLoader.load("./texture.jpg");
const material = new THREE.MeshLambertMaterial({
  // 设置纹理贴图：Texture对象作为材质map属性的属性值
  map: texture, //map表示材质的颜色贴图属性
});
```

:::warning 注意：
`vue项目`图片必须放在`public`目录下才能正确渲染；
:::

## 颜色贴图属性.map

也可以通过颜色贴图属性.map 直接设置纹理贴图，和材质的参数设置一样。

```js
material.map = texture;
```

## 颜色贴图和 color 属性颜色值会混合

材质的颜色贴图属性`.map`设置后，模型会从`纹理贴图`上采集像素值，这时候一般来说不需要再设置材质颜色`.color`。因为 颜色贴图 map 和 color 属性颜色值会混合，color 默认白色 0xffffff。

```js
const material = new THREE.MeshLambertMaterial({
  // color: 0x00ffff,
  map: texture,
});
```

## 测试不同几何体添加纹理贴图的效果

你可以尝试把颜色纹理贴图映射到不同的几何体上查看渲染效果，至于为什么映射效果不同，其实和`UV坐标`相关，具体可以关注下节课关于 UV 坐标的讲解。

```js
// 长方体
const geometry = new THREE.BoxGeometry(100, 100, 100);

// 球体
const geometry = new THREE.SphereGeometry(60, 25, 25);
```

**注意：** <br />
新版本，`webgl渲染器默认编码方式`已经改变，为了避免色差，纹理对象编码方式要修改为`THREE.SRGBColorSpace`。

```js
// 设置为SRGB颜色空间
texture.colorSpace = THREE.SRGBColorSpace;
```
