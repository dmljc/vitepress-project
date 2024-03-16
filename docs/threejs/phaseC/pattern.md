---
outline: deep
---

# gltf不同文件形式(.glb)

.gltf格式模型文件，有不同的组织形式。

- 单独.gltf文件
- 单独.glb文件
- .gltf + .bin + 贴图文件

这些不同形式的gltf模型，加载代码其实没啥区别。

## 加载单独.gltf文件

```js
// 单独.gltf文件
loader.load("../../工厂.gltf", function (gltf) { 
    scene.add(gltf.scene);
})
```

## 加载单独的.glb文件

`.glb`是 gltf 格式的`二进制形式文件`，加载方式和`.gltf`没啥区别。

```js
loader.load("../../工厂.glb", function (gltf) { 
    scene.add(gltf.scene);
})
```

## .gltf + .bin + 贴图文件

`gltf`模型的一些数据，是可以`以单独文件形式存在`的，比如纹理贴图单独存在，比如.bin包含gltf的顶点数据。

要注意的就是贴图等数据单独是一个文件的时候，不要随随意改变子文件相对父文件gltf的目录，以免找不到资源。

```js
loader.load("../../工厂/工厂.gltf", function (gltf) { 
    scene.add(gltf.scene);
})
```