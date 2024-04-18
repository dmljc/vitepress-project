---
outline: deep
---

# 工厂光源(环境贴图和环境光)

接下来两节课利用前面知识，给大家总结下，如何设置类似工厂、园区等 3D 场景的光照。

- 环境贴图
- 环境光
- 平行光模拟太阳光(下节课内容)

具体 threejs 知识点前面基本都讲解过，下面把重点放在整体思路讲解上，具体代码你可以参考课件源码。

## 测试工厂模型中光源

课件“演示”文件加载了一个工厂模型，你可以把代码中所有光源注释，执行代码，你无法正常看到工厂模型颜色。

## 环境贴图

果你不设置任何光源和环境贴图，gltf 模型默认 PBR 材质不会正常显示，一片漆黑。

不过你不设置任何光源，只设置环境贴图，物体表面也能看到。虽然环境贴图不是光源，但是会模拟物体周围环境的反射光。就好比你站在街上，周围房子、树木、马路也会反射光线到你身上。

通过 **环境贴图反射率** `.envMapIntensity` 可以调节环境贴图对模型外表面的影响程度，`.envMapIntensity` 的值可以通过 gui 交互界面调节。

```js
const textureCube = new THREE.CubeTextureLoader()
  .setPath("./环境贴图/")
  .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);
textureCube.encoding = THREE.sRGBEncoding;
loader.load("../工厂.glb", function (gltf) {
  gltf.scene.traverse(function (obj) {
    if (obj.isMesh) {
      //判断是否是网格模型
      obj.material.envMap = textureCube; //设置环境贴图
      obj.material.envMapIntensity = 1.0;
    }
  });
});
```

一般实际开发，对于偏向写实的场景，需要设置环境贴图，比如产品展示、物联网或数字孪生的场景。

## 环境光

一般三维场景需要添加环境光，来整体调节三维场景的明暗，环境光强度可以通过参数 2，或光照强度属性 `.intensity`设置。

实际开发，可以先给一个大概的值，然后通过 gui 交互界面微调 `AmbientLight` 的光照强度属性 `.intensity`。

```js
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);
```

## GUI 可视化调试

前面入门部分讲解过 gui 相关知识，对于光源的等参数，人的大脑很难根据代码想象出来具体效果，所以需要通过可视化的方式调参数。

```js
// 从threejs扩展库引入gui.js
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
// 创建GUI对象
const gui = new GUI();
gui.domElement.style.right = "0px";
gui.domElement.style.width = "300px";
```

## gui 控制环境光光照强度 .intensity

```js
gui.add(ambient, "intensity", 0, 2).name("环境光.intensity");
```

## GUI 控制环境贴图强度 .envMapIntensity

通过材质的环境贴图强度属性 `.envMapIntensity`，可以控制环境贴图对物体表面的影响程度，类比环境光的光照强度。

```js
const obj = {
  envMapIntensity: 1.0,
};
gui.add(obj, "envMapIntensity", 0, 2).onChange(function (value) {
  // 递归遍历，批量设置模型材质的`.envMapIntensity`属性
  gltf.scene.traverse(function (item) {
    if (item.isMesh) {
      item.material.envMapIntensity = value;
    }
  });
});
```
