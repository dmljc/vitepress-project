---
outline: deep
---

# 三维场景 Scene

你可以把三维场景 Scene 对象理解为虚拟的 3D 场景，用来表示模拟生活中的真实三维场景,或者说三维世界。

```js
// 创建3D场景对象Scene
const scene = new THREE.Scene();
```

## 网格模型 Mesh

实际生活中有各种各样的物体，在 threejs 中可以通过网格模型 Mesh 表示一个虚拟的物体，比如一个箱子、一个鼠标。

```js
// 两个参数分别为几何体geometry、材质material
const mesh = new THREE.Mesh(geometry, material);
```

### 物体形状：几何体 Geometry

Three.js 提供了各种各样的几何体 API，用来表示三维物体的几何形状。

- 立方体 BoxGeometry
- 球体 SphereGeometry
- 圆锥 ConeGeometry
- 圆柱体 CylinderGeometry
- 胶囊图形 CapsuleGeometry
- 圆环几何体 TorusGeometry
<!-- - 圆环扭结几何体 TorusKnotGeometry
- 管道几何体 TubeGeometry
- 四面几何体 TetrahedronGeometry
- 八面几何体 OctahedronGeometry
- 十二面几何体 DodecahedronGeometry
- 二十面体 IcosahedronGeometry
- 车削几何体 LatheGeometry // 创建具有轴对称性的网格，比如花瓶。车削绕着 Y 轴进行旋转。 -->

- 矩形平面 PlaneGeometry
- 圆平面 CircleGeometry
- 圆环几何体 RingGeometry
- 形状几何体 ShapeGeometry // 从一个或多个路径形状中创建一个单面多边形几何体。

```js
// 创建一个长方体几何对象Geometry
const geometry = new THREE.BoxGeometry(100, 100, 100);
```

### 双面可见

Three.js 的材质`默认正面可见`，反面不可见，对于`矩形平面` PlaneGeometry、`圆形平面` CircleGeometry 如果你想看到两面，可以设置 `side: THREE.DoubleSide`。

```js
new THREE.MeshBasicMaterial({
  side: THREE.FrontSide, // 默认只有正面可见 // [!code --]
  side: THREE.DoubleSide, // 两面可见 // [!code ++]
});
```

### 物体外观：材质 Material

如果你想定义物体的外观效果，比如颜色，就需要通过材质 Material 相关的 API 实现。

- 基础网格材质 MeshBasicMaterial
- 网格漫反射材质 MeshLambertMaterial
- 网格高光材质 MeshPhongMaterial
- 物理材质 MeshStandardMaterial、MeshPhysicalMaterial
- 点材质 PointsMaterial
- 基础线条材质 LineBasicMaterial
- 点精灵材质 SpriteMaterial
- 深度网格材质 MeshDepthMaterial

threejs 不同材质渲染效果不同，下面就以 threejs 最简单的网格基础材质 MeshBasicMaterial 为例给大家实现一个红色材质效果。

```js
// 创建一个材质对象 Material
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000, //0xff0000设置材质颜色为红色
});
```

## 模型位置.position

实际生活中，一个物体往往是有位置的，对于 threejs 而言也是一样的，你可以通过位置属性.position 定义网格模型 Mesh 在三维场景 Scene 中的位置。

```js
// 网格模型对象Mesh
const mesh = new THREE.Mesh(geometry, material);
// 设置网格模型在三维空间中的位置坐标，默认是坐标原点
mesh.position.set(0, 10, 0);
```

## .add()方法

threejs 中你创建了一个表示物体的虚拟对象 Mesh，需要通过.add()方法，把网格模型 mesh 添加到三维场景 scene 中。

```js
scene.add(mesh);
```
