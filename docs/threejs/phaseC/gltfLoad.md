---
outline: deep
---

# 加载.gltf 文件

## 引入 GLTFLoader.js

在 three.js 官方文件的**examples/jsm/子文件 loaders/**目录下，可以找到一个文件`GLTFLoader.js`，这个文件就是 three.js 的一个扩展库，专门用来加载 gltf 格式模型加载器。

```js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
```

按照上面的路径引入的话 ts 会报错

![notFindGLTGLoader](/phaseC/notFindGLTGLoader.png)

```js
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
```

## gltf 加载器 new GLTFLoader()

执行`new GLTFLoader()`就可以实例化一个 gltf 的加载器对象。

```js
// 创建 GLTF 加载器对象
const loader = new GLTFLoader();
```

## gltf 加载器方法 .load()

通过`gltf`加载器方法`.load()`就可以加载外部的`gltf`模型。

执行方法`.load()`会返回一个`gltf`对象，作为参数 2 函数的参数，改 gltf 对象可以包含模型、动画等信息，本节课你只需要先了解 gltf 的场景属性`gltf.scene`，该属性包含的是模型信息，比如几何体`BufferGometry`、材质`Materia`l、网格模型`Mesh`。

```js
loader.load("gltf模型.gltf", function (gltf) {
  // 返回的场景对象gltf.scene插入到场景中
  scene.add(gltf.scene);
});
```

```js
// 相机位置.position
camera.position.set(200, 200, 200);

// 相机视线指向坐标原点
camera.lookAt(0, 0, 0);
```

注意相机控件`OrbitControl`s 会影响`lookAt`设置，注意手动设置 OrbitControls 的目标参数。

```js
camera.lookAt(x, y, z);
// 设置相机控件轨道控制器 OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
// 相机控件.target属性在OrbitControls.js内部表示相机目标观察点，默认0,0,0
controls.target.set(x, y, z); // 与lookAt参数保持一致
// update()函数内会执行camera.lookAt(controls.targe)
controls.update();
```

## 纹理贴图颜色偏差解决

加载`gltf模型`的时候，可能会遇到 three.js 渲染结果`颜色偏差`，对于这种情况，你只需要修改`WebGL`渲染器默认的编码方式`.outputEncoding`即可。

```js
// 解决加载gltf格式模型纹理贴图和原图不一样问题
renderer.outputEncoding = THREE.sRGBEncoding;
```

注意！！！！！！！最新版本属性名字有改变。渲染器属性名`.outputEncoding`已经变更为`.outputColorSpace`。

查`WebGL`渲染器文档，你可以看到`.outputColorSpace`的默认值就是 SRGB 颜色空间`THREE.SRGBColorSpace`，意味着新版本代码中，加载 gltf，没有特殊需要，不设置`.outputColorSpace`也不会引起色差。

```js
// 新版本，加载gltf，不需要执行下面代码解决颜色偏差
// 设置为SRGB颜色空间
renderer.outputColorSpace = THREE.SRGBColorSpace;
```
