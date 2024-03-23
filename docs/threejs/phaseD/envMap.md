---
outline: deep
---

# 环境贴图.envMap(金属效果)

`环境贴图`对`PBR`材质渲染效果影响还是比较大，一般渲染PBR材质的模型，最好设置一个合适的环境贴图。

## 立方体纹理加载器CubeTextureLoader

- `TextureLoader`返回`Texture`
- `CubeTextureLoader`返回`CubeTexture`

通过前面学习大家知道，通过纹理贴图加载器`TextureLoader`的`.load()方`法`加载一张图片`可以返回一个纹理对象`Texture`。

立方体纹理加载器`CubeTextureLoader`的`.load()`方法是`加载6张图片`，返回一个立方体纹理对象`CubeTexture`。

立方体纹理对象`CubeTexture`的父类是纹理对象`Texture`。

## CubeTextureLoader加载环境贴图

所谓`环境贴图`，就是一个模型周围的环境的图像，比如一间房子，房子的上下左右前后分别拍摄一张照片，就是3D空间中6个角度方向的照片。

```js
// 'px.jpg', 'nx.jpg'：x轴正方向、负方向贴图  p:正positive  n:负negative
// 'py.jpg', 'ny.jpg'：y轴贴图
// 'pz.jpg', 'nz.jpg'：z轴贴图
const textureCube = new THREE.CubeTextureLoader()
    .setPath('./环境贴图/环境贴图0/')
    .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
```

## MeshStandardMaterial环境贴图属性.envMap

实际生活中，一个物体表面，往往会反射周围的环境。人的眼睛看到的东西，往往反射有周围景物，所以three.js渲染模型，如果想渲染效果更好看，如果想更符合实际生活情况，也需要想办法让模型反射周围景物。

`MeshStandardMaterial`材质的环境贴图属性是`.envMap`，通过`PBR`材质的`贴图属性`可以实现模型表面`反射周围景物`，这样渲染效果更好。

```js
// 加载环境贴图
const textureCube = new THREE.CubeTextureLoader()
    .setPath('./环境贴图/环境贴图0/')
    .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
obj.material = new THREE.MeshStandardMaterial({
    metalness: 1.0,
    roughness: 0.5,
    envMap: textureCube, //设置pbr材质环境贴图
})    
```

```js
obj.material.envMap = textureCube; //设置环境贴图 
```

## 环境贴图反射率.envMapIntensity

`MeshStandardMaterial`的`.envMapIntensity`属性主要用来设置模型表面反射周围环境贴图的能力，或者说环境贴图对模型表面的影响能力。具体说`.envMapIntensity`相当于`环境贴图的系数`，环境贴图像素值乘以该系数后，在用于影响模型表面。

```js
// 默认值1, 设置为0.0，相当于没有环境贴图
obj.material.envMapIntensity = 1.0;
```

## 粗糙度roughness为0

你可以尝试把粗糙度`roughness`设置为0，看看模型对环境贴图的反射效果。

```js
obj.material.roughness = 0.0; // 完全镜面反射，像镜子一样
```

## 选择合适的环境贴图

不同的明暗或景物的环境贴图对渲染效果的影响是不一样的，所以不仅要设置环境贴图，还要根据需要选择合适的环境贴图，一般实际开发使用美术提供的环境贴图即可。

你可以尝试测试源码中提供多个环境贴图对比渲染效果差异。

## 纹理和渲染器颜色空间一致

```js
// 如果renderer.outputEncoding=THREE.sRGBEncoding;环境贴图需要保持一致
textureCube.encoding = THREE.sRGBEncoding;   
```