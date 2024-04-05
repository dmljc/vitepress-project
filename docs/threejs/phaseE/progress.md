---
outline: deep
---

# 模型加载进度条

web3d 可视化项目开发，很多时候，3D 模型的大小要比普通前端项目的文件大得多，这时候往往需要设置一个进度条，表示模型的加载进度。

[进度条在线案例](http://www.yanhuangxueyuan.com/3D/jixiezhuangpei/index.html)

## 进度条 HTML、CSS、JavaScript 代码

课件中提供的是用原生 HTML、CSS、JavaScript 代码写的一个进度条，当然实际开发的时候，你可以不自己写，选择成熟的 UI 组件库，比如你使用 vue 技术栈的 Element-ui 进度条组件。

```html
<head>
  <style>
    /* 进度条css样式 */
    #container {
      position: absolute;
      width: 400px;
      height: 16px;
      top: 50%;
      left: 50%;
      margin-left: -200px;
      margin-top: -8px;
      border-radius: 8px;
      border: 1px solid #009999;
      overflow: hidden;
    }
    #per {
      height: 100%;
      width: 0px;
      background: #00ffff;
      color: #00ffff;
      line-height: 15px;
    }
  </style>
</head>
<body style="background-color: #001111;">
  <div id="container">
    <!-- 进度条 -->
    <div id="per"></div>
  </div>
  <script>
    const percentDiv = document.getElementById("per"); // 获取进度条元素
    percentDiv.style.width = 0.8 * 400 + "px"; //进度条元素长度
    percentDiv.style.textIndent = 0.8 * 400 + 5 + "px"; //缩进元素中的首行文本
    percentDiv.innerHTML = "80%"; //进度百分比
  </script>
</body>
```

## 加载器查看模型加载进度

gltf 模型加载进度具体语法可以查看`GLTFLoader`文档。

```js
loader.load(模型路径, 加载完成函数, 加载过程函数);
```

模型本身是有大小的，通过浏览器从服务器加载的时候，本身网络传输是需要时间的。

`.load()`方法的参数 2 是一个函数，参数 2 函数是模型加载完成以后才会被调用执行。

`.load()`方法的参数 3 是一个函数，通过函数的参数获取模型加载信息，每当模型加载部分内容，该函数就会被调用，一次加载过程中一般会被调用多次，直到模型加载完成。

```js
loader.load(
  "../工厂.glb",
  function (gltf) {
    model.add(gltf.scene);
  },
  function (xhr) {
    // 控制台查看加载进度xhr
    // 通过加载进度xhr可以控制前端进度条进度
    const percent = xhr.loaded / xhr.total;
    console.log("加载进度" + percent);
  }
);
```

## 加载进度控制进度条

把案例源码原生 HTML、CSS 进度条.html 中进度条的 HTML、CSS、JavaScript 代码复制到 threejs 代码中，修改即可。

```js
loader.load(
  "../工厂.glb",
  function (gltf) {
    model.add(gltf.scene);
  },
  function (xhr) {
    const percent = xhr.loaded / xhr.total;
    percentDiv.style.width = percent * 400 + "px"; //进度条元素长度
    percentDiv.style.textIndent = percent * 400 + 5 + "px"; //缩进元素中的首行文本
    percentDiv.innerHTML = Math.floor(percent * 100) + "%"; //进度百分比
  }
);
```

## 加载完成隐藏进度条

threejs 模型加载完成后，就不需要显示进度条，可以通过`.style.display`属性设置，也可以通过`.style.visibility`属性`隐藏进度条`。

```js
loader.load(
  "../工厂.glb",
  function (gltf) {
    model.add(gltf.scene);
    // 加载完成，隐藏进度条
    // document.getElementById("container").style.visibility ='hidden';
    document.getElementById("container").style.display = "none";
  },
  function (xhr) {
    const percent = xhr.loaded / xhr.total;
    console.log("加载进度" + percent);
  }
);
```
