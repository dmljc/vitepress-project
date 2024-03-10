---
outline: deep
---

# 自定义顶点UV坐标

## 顶点UV坐标的作用

顶点UV坐标的作用是`从纹理贴图上提取像素映射到网格模型Mesh的几何体表面上`。

浏览器控制台查看threejs几何体默认的UV坐标数据：

```js
// 矩形平面
const geometry = new THREE.PlaneGeometry(200, 100);

console.log('uv', geometry.attributes.uv);
```

## 纹理贴图UV坐标范围

顶点UV坐标可以在`0~1.0`之间任意取值，纹理贴图左下角对应的UV坐标是`(0,0)`，右上角对应的坐标`(1,1)`。

![uv](/phaseB/uv.jpeg)

## 自定义顶点 UVgeometry.attributes.uv

顶点UV坐标`geometry.attributes.uv`和顶点位置坐标`geometry.attributes.position`是一一对应的，

UV顶点坐标你可以根据需要在`0~1`之间任意设置，具体怎么设置，要看你想把图片的哪部分映射到`Mesh`的几何体表面上。

```js
/**纹理坐标0~1之间随意定义*/
const uvs = new Float32Array([
    0, 0, // 图片左下角
    1, 0, // 图片右下角
    1, 1, // 图片右上角
    0, 1, // 图片左上角
]);
// 设置几何体 attributes 属性的位置 normal属性
// 2个为一组 表示一个顶点的纹理坐标
geometry.attributes.uv = new THREE.BufferAttribute(uvs, 2); 
```

## 获取纹理贴图四分之一

获取纹理贴图左下角四分之一部分的像素值

```js
const uvs = new Float32Array([
    0, 0, 
    0.5, 0, 
    0.5, 0.5, 
    0, 0.5, 
]);
```