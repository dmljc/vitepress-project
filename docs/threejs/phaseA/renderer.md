---
outline: deep
---

# 渲染器 Renderer

生活中如果有了景物和相机，那么如果想获得一张照片，就需要你拿着相机，按一下，咔，完成拍照。对于threejs而言，如果完成“咔”这个拍照动作，就需要一个新的对象，也就是WebGL渲染器WebGLRenderer。

## 创建渲染器对象

```js
const renderer = new THREE.WebGLRenderer();
```

## 设置Canvas画布尺寸.setSize()

```js
// 定义threejs输出画布的尺寸(单位:像素px)
const width = 800; //宽度
const height = 500; //高度
renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)
```

## 渲染器渲染方法.render()

渲染器WebGLRenderer执行渲染方法.render()就可以生成一个Canvas画布(照片)，并把三维场景Scene呈现在canvas画布上面,你可以把.render()理解为相机的拍照动作“咔”。

```js
// 执行渲染操作
renderer.render(scene, camera); 
```

## 渲染器Canvas画布属性.domElement

渲染器WebGLRenderer通过属性.domElement可以获得渲染方法.render()生成的Canvas画布，.domElement本质上就是一个HTML元素：Canvas画布。

```js
document.body.appendChild(renderer.domElement);
```

## Canvas画布插入到任意HTML元素中

```js
<div id="webgl"></div>

document.getElementById('webgl').appendChild(renderer.domElement);
```