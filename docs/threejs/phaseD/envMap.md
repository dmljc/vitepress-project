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