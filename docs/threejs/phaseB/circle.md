---
outline: deep
---

# 圆形平面设置纹理贴图

思考下，怎么实现矩形图片剪裁为圆形渲染。

其实很简单，可以通过圆形几何体`CircleGeometry`创建一个网格模型`Mesh`，把一张图片作为圆形`Mesh`材质的`颜色贴图`，这样就可以把一张方形图片剪裁渲染为圆形效果。

```js
// 圆形平面
const geometry = new THREE.CircleGeometry(100);
// 纹理贴图加载器
const texLoader = new THREE.TextureLoader();
const texture = texLoader.load('./one.jpg');

const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry, material);
```

## 本质原理

`CircleGeometry`的UV坐标会对颜色纹理贴图`.map`进行提取，`CircleGeometry`的UV坐标默认提取的就是一个`圆形轮廓`。