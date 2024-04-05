---
outline: deep
---

# 物理材质透光率.transmission

物理材质`MeshPhysicalMaterial`的`透光率属性.transmission`和`折射率属性.ior`。

## 透光率(透射度).transmission

为了更好的模拟`玻璃`、`半透明塑料`一类的视觉效果，可以使用物理透明度`.transmission`属性代替`Mesh`普通透明度属性`.opacity`。

使用`.transmission`属性设置 Mesh 透明度，即便完全透射的情况下仍可保持高反射率。
物理光学透明度`.transmission`的值范围是从 `0.0` 到 `1.0`。默认值为 `0.0`。

```js
const mesh = gltf.scene.getObjectByName("玻璃01");
mesh.material = new THREE.MeshPhysicalMaterial({
  transmission: 1.0, // 玻璃材质透光率，transmission替代opacity
});
```

## 折射率.ior

`非金属材料`的折射率从`1.0`到`2.333`。默认值为`1.5`。

```js
new THREE.MeshPhysicalMaterial({
  ior: 1.5, //折射率
});
```

## 玻璃透光率.transmission 设置

先设置玻璃`金属度`和`粗糙度`。

```js
const mesh = gltf.scene.getObjectByName("玻璃01");
mesh.material = new THREE.MeshPhysicalMaterial({
  metalness: 0.0, //玻璃非金属
  roughness: 0.0, //玻璃表面光滑
  envMap: textureCube, //环境贴图
  envMapIntensity: 1.0, //环境贴图对Mesh表面影响程度
});
```

设置`透光率.transmission`和`折射率.ior`。

```js
new THREE.MeshPhysicalMaterial({
  transmission: 1.0,
  ior: 1.5,
});
```

## GUI 可视化调试 PBR 材质属性

基本参数和代码设置好以后，就是通过 GUI 可视化交互界面，调试 PBR 材质或光源的参数。

```js
const obj = {
  color: mesh.material.color, // 材质颜色
};
// 材质颜色color
matFolder.addColor(obj, "color").onChange(function (value) {
  mesh.material.color.set(value);
});
// 范围可以参考文档
matFolder.add(mesh.material, "metalness", 0, 1);
matFolder.add(mesh.material, "roughness", 0, 1);
matFolder.add(mesh.material, "transmission", 0, 1);
matFolder.add(mesh.material, "ior", 0, 3);
matFolder.add(mesh.material, "envMapIntensity", 0, 10);
```
