---
outline: deep
---

# Canvas 元素

`Canvas`是 HTML 的元素之一，Canvas 元素的 CSS 布局规律和 div、img 等其它 HTML 元素相似，`webgl`就是依赖于`canvas`实现，threejs 是基于`webgl`封装的，自然也要依赖`canvas`，具体说就是把`三维场景`渲染到`canvas画布上`。

```html
<!-- canvas元素默认是行内块元素 -->
<canvas style="background-color: #ff0000;" width="300" height="180"></canvas>
```

## threejs 渲染结果 CSS 布局

![layout](/phaseE/layout.jpg)

threejs 默认把 canvas 设置为块元素`display: block;`。既然 three.js 渲染输出的 Canvas 画布本质上就是一个 HTML 元素，那么你布局的时候，直接使用你的前端 CSS 知识即可。以下是用 canvas 实现的一个布局效果。

```html
<head>
  <style>
    body {
      overflow: hidden;
      margin: 0px;
    }
  </style>
</head>
<body style="background: #555555;">
  <div style="height: 55px;background-color: #444444;">上面布局</div>
  <!-- 下 -->
  <div>
    <div
      id="left"
      style="position: absolute;top: 60px;background-color: #444444;width: 195px;"
    >
      下面左侧布局
    </div>
    <div
      id="webgl"
      style="position: absolute;top: 60px;left: 200px;background-color: #444444;"
    >
      下面右侧布局
    </div>
  </div>
  <script>
    const width = window.innerWidth - 200;
    const height = window.innerHeight - 60;
    document.getElementById("left").style.height = height + "px";
    document.getElementById("webgl").style.width = width + "px";
    document.getElementById("webgl").style.height = height + "px";
  </script>
</body>
```

## threejs Canvas 画布尺寸设置

设置 canvas 画布的尺寸，注意在浏览器窗口文档区域整体宽高基础上，减掉其他顶部和左侧 div 元素和布局间隙的尺寸。

- canvas 画布的宽度： window.innerWidth 减掉左侧 div 元素宽度 195px 和布局间距 5px
- canvas 画布的高度： window.innerHeight 减掉顶部 div 元素高度 55px 和布局间距 5px

```js
// 200表示左侧div元素宽度195px+间距5px
const width = window.innerWidth - 200; //canvas画布高度
//60表示顶部div元素高度55px+间距5px
const height = window.innerHeight - 60; //canvas画布宽度
...
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
renderer.setSize(width, height);
```

## Canvas 随着窗口变化

```js
// 画布跟随窗口变化
window.onresize = function () {
  const width = window.innerWidth - 200; //canvas画布高度
  const height = window.innerHeight - 60; //canvas画布宽度
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};
```
