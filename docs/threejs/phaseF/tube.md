---
outline: deep
---

# 曲线路径管道 TubeGeometry

## 管道 TubeGeometry

管道`TubeGeometry`几何体的功能就是基于一个 3D 曲线路径，生成一个`管道几何体`。

```js
TubeGeometry(path, tubularSegments, radius, radiusSegments, closed);
```

| 参数            | 值                         |
| --------------- | -------------------------- |
| path            | 扫描路径，路径要用三维曲线 |
| tubularSegments | 路径方向细分数，默认 64    |
| radius          | 管道半径，默认 1           |
| radiusSegments  | 管道圆弧细分数，默认 8     |
| closed          | Boolean 值，管道是否闭合   |

## 样条曲线生成圆管案例

![tubespline](/phaseF/tubespline.jpg)

```js
// 三维样条曲线
const path = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-50, 20, 90),
  new THREE.Vector3(-10, 40, 40),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(60, -60, 0),
  new THREE.Vector3(70, 0, 80),
]);

// path:路径，40：沿着轨迹细分数，2：管道半径，25：管道截面圆细分数
const geometry = new THREE.TubeGeometry(path, 40, 2, 25);
```

### 观察管道内壁

threejs 默认只渲染 mesh 三角形的正面，如果想看到管道内壁，可以设置双面渲染`THREE.DoubleSide`。

```js
const material = new THREE.MeshLambertMaterial({
  side: THREE.DoubleSide, // 双面显示看到管道内壁
});
```

### 测试其他曲线

你也可以使用下面`直线`替换上面的样条曲线查看圆管生成效果。

```js
// LineCurve3 创建直线段路径
const path = new THREE.LineCurve3(
  new THREE.Vector3(0, 100, 0),
  new THREE.Vector3(0, 0, 0)
);
```

### 示例代码如下：

::: code-group

```vue [index.vue]
代码同 生成圆弧顶点 章节
```

```js [model.js]
import * as THREE from "three";

// 三维样条曲线
const path = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-50, 20, 90),
  new THREE.Vector3(-10, 40, 40),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(60, -60, 0),
  new THREE.Vector3(70, 0, 80),
]);

// LineCurve3 创建直线段路径
// const path = new THREE.LineCurve3(new THREE.Vector3(0, 100, 0), new THREE.Vector3(0, 0, 0));

// path:路径，40：沿着轨迹细分数，2：管道半径，25：管道截面圆细分数
const geometry = new THREE.TubeGeometry(path, 40, 4, 25);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);

export default mesh;
```

:::

## 三维二次贝塞尔曲线生成管道几何体

![tube3w2c](/phaseF/tube3w2c.jpg)

```js
// p1、p2、p3表示三个点坐标
const p1 = new THREE.Vector3(-80, 0, 0);
const p2 = new THREE.Vector3(20, 100, 0);
const p3 = new THREE.Vector3(80, 0, 100);
// 三维二次贝赛尔曲线
const path = new THREE.QuadraticBezierCurve3(p1, p2, p3);
```

### 示例代码如下：

::: code-group

```vue [index.vue]
代码同 生成圆弧顶点 章节
```

```js [model.js]
import * as THREE from "three";

// p1、p2、p3表示三个点坐标
const p1 = new THREE.Vector3(-80, 0, 0);
const p2 = new THREE.Vector3(20, 100, 0);
const p3 = new THREE.Vector3(80, 0, 100);

// 三维二次贝赛尔曲线
const path = new THREE.QuadraticBezierCurve3(p1, p2, p3);

// path:路径，40：沿着轨迹细分数，2：管道半径，25：管道截面圆细分数
const geometry = new THREE.TubeGeometry(path, 40, 4, 25);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);

export default mesh;
```

:::

## CurvePath 多段路径生成管道案例

`CurvePath`组合曲线，也可以作为`TubeGeometry`的参数 1，用于生成管道几何体。

下面组合曲线`CurvePath`是由一段三维贝塞尔曲线`QuadraticBezierCurve3`加上两段 3D 直线`LineCurve3`拼接组成。

```js
import * as THREE from "three";

// 创建多段线条的顶点数据
const p1 = new THREE.Vector3(0, 0, 100);
const p2 = new THREE.Vector3(0, 0, 30);
const p3 = new THREE.Vector3(0, 0, 0);
const p4 = new THREE.Vector3(30, 0, 0);
const p5 = new THREE.Vector3(100, 0, 0);

// 3D直线线段1
const line1 = new THREE.LineCurve3(p1, p2);
// 三维二次贝塞尔曲线
const curve = new THREE.QuadraticBezierCurve3(p2, p3, p4);
// 3D直线线段2
const line2 = new THREE.LineCurve3(p4, p5);
const CurvePath = new THREE.CurvePath();
CurvePath.curves.push(line1, curve, line2);

const geometry = new THREE.TubeGeometry(CurvePath, 50, 4, 25);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
export default mesh;
```
