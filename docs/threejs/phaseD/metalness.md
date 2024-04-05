---
outline: deep
---

# PBR 材质金属度和粗糙度

## 金属度 metalness

`金属度`属性`.metalness`表示材质像金属的程度，非金属材料如木材、石材使用 0.0，金属使用 1.0。

threejs 的`PBR材`质，`.metalness`默认是`0.5`，0.0 到 1.0 之间的值可用于生锈的金属外观。

```js
new THREE.MeshStandardMaterial({
  metalness: 1.0, //金属度属性
});

mesh.material.metalness = 1.0; // 金属度
```

## 粗糙度 roughness

生活中不同物体表面的粗糙程度不同，比如地面比较粗糙，比如镜子表面就非常非常光滑。

粗糙度`roughness`表示模型表面的光滑或者说粗糙程度，越光滑镜面反射能力越强，越粗糙，表面镜面反射能力越弱，更多地表现为漫反射。

粗糙度 roughness `0.0`表示平滑的镜面反射，`1.0`表示完全漫反射，默认`0.5`。

```js
new THREE.MeshStandardMaterial({
  roughness: 0.5, //表面粗糙度
});

mesh.material.roughness = 0.5; //表面粗糙度
```
