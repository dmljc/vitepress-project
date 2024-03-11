---
outline: deep
---

# 圆形纹理贴图和阵列

## 圆形纹理贴图

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

## 纹理对象Texture阵列

使用纹理对象`Texture`的阵列功能+矩形平面几何体`PlaneGeometry`实现一个`地面瓷砖效果`。

## 矩形平面设置颜色贴图

```js
const geometry = new THREE.PlaneGeometry(2000, 2000);
// 纹理贴图加载器 TextureLoader
const texLoader = new THREE.TextureLoader();
// .load()方法加载图像，返回一个纹理对象 texture
const texture = texLoader.load('./瓷砖.jpg');
const material = new THREE.MeshLambertMaterial({
    // 设置纹理贴图：Texture对象作为材质map属性的属性值
    map: texture, //map 表示材质的颜色贴图属性
});
const mesh = new THREE.Mesh(geometry, material);
```

## 纹理对象Texture的阵列功能
```js
// .load()方法加载图像，返回一个纹理对象Texture
const texture = texLoader.load('./瓷砖.jpg');
// 设置阵列模式
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
// uv两个方向纹理重复数量
texture.repeat.set(12,12);//注意选择合适的阵列数量
```
## 旋转矩形平面

注意旋转方向影响矩形平面背面还是正面朝上，threejs默认渲染正面，不渲染背面。
```js
// 旋转矩形平面
mesh.rotateX(-Math.PI/2);
```