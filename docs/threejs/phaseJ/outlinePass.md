---
outline: deep
---

# 后处理 (发光描边 OutlinePass)

查看 threejs 文件包目录 `examples/jsm/postprocessing/`，你可以看到 Three.js 提供了一个扩展库 `EffectComposer.js` 可以实现一些后期处理效果。

所谓后期处理，就像 ps 一样，对 threejs 的渲染结果进行后期处理，比如添加发光效果。

## 不同功能后处理通道

查看 threejs 文件包目录 `examples/jsm/postprocessing/`，你可以看到 threejs 提供了很多后处理通道，想实现什么样的后期处理效果，需要调用 threejs 对应的后处理通道扩展库。

- `OutlinePass.js` 高亮发光描边
- `UnrealBloomPass.js` Bloom 发光
- `GlitchPass.js` 画面抖动效果

比如 `OutlinePass.js` 扩展库提供的类 `OutlinePass` 就可以给一个模型添加一个`高亮发光描边`，下面就给大家演示下如何实现。

![OutlinePass](/phaseJ/outlinePass.jpg)

## 创建后处理对象 EffectComposer

大家都知道 three.js `WebGL` 渲染器执行渲染方法 `.render()` 会得到一张图像，如果你需要对一个 webgl 渲染器的渲染结果进行后期处理，就把它作为 `EffectComposer` 的参数。

```js
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";

const composer = new EffectComposer(renderer);
```

## 渲染器通道 RenderPass

通过 `EffectComposer(renderer)` 指定了需要后处理的渲染器 `WebGLRenderer`，渲染器通道 `RenderPass` 的作用是指定后处理对应的相机 `camera` 和场景 `scene`。

```js
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";

const renderPass = new RenderPass(scene, camera);
```

给 `EffectComposer` 添加一个渲染器通道 `RenderPass`

```js
composer.addPass(renderPass);
```

## OutlinePass 通道

`OutlinePass` 可以**给指定的某个模型对象添加一个高亮发光描边效果**。

```js
// 引入OutlinePass通道
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js";

// 创建OutlinePass通道，第一个参数v2的尺寸和canvas画布保持一致
const v2 = new THREE.Vector2(window.innerWidth, window.innerHeight);
const outlinePass = new OutlinePass(v2, scene, camera);
```

## OutlinePass 属性.selectedObjects

给哪个模型对象设置发光描边效果，就可以通过 `OutlinePass` 的选择对象属性 `.selectedObjects` 设置。

```js
// 一个模型对象
outlinePass.selectedObjects = [mesh];
// 多个模型对象
outlinePass.selectedObjects = [mesh1, mesh2, group];
```

## 设置 OutlinePass 通道

最后把创建好的 `OutlinePass` 通道添加到后处理 `composer` 中。

```js
composer.addPass(outlinePass);
```

## 渲染循环执行 EffectComposer.render()

渲染循环中后处理 `EffectComposer` 执行 `.render()`，会调用 webgl 渲染器执行 .render()，也就是说 `renderer.render(scene, camera)` 不用再执行。

```js
// 渲染循环
function render() {
  renderer.render(scene, camera); // [!code --]
  composer.render(); // [!code ++]
  requestAnimationFrame(render);
}
render();
```

## 示例代码如下：

::: code-group

:::

修改 OutlinePass 默认描边效果
参考下节课具体讲解
