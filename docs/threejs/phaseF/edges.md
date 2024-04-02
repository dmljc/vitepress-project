---
outline: deep
---

# 模型边界线 EdgesGeometry

借助`EdgesGeometry`可以给模型设置一个模型`边界线`。

![edges](/phaseF/edges.jpg)

## 长方体边线

先用`EdgesGeometry`重新计算长方体几何体，返回一个新的几何体，然后用线模型`LineSegments`模型渲染新的几何体即可。

::: code-group
```vue [index.vue]
代码同 生成圆弧顶点 章节
```

```js [model.js]
import * as THREE from 'three';

// 创建一个立方体网格模型
const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshLambertMaterial({
    color: 0x004444,
    transparent: true,
    opacity: 0.6
});
const mesh = new THREE.Mesh(geometry, material);

// 长方体几何体作为 EdgesGeometry 参数创建一个新的几何体
const edges = new THREE.EdgesGeometry(geometry);
const edgesMaterial = new THREE.LineBasicMaterial({
    color: 0x00ffff
});

// 在顶点之间绘制一条线
const line = new THREE.LineSegments(edges, edgesMaterial);
mesh.add(line);
export default mesh;
```
:::

## 圆柱体边线

![cylin](/phaseF/cylin.jpg)

相比上面的立方体几何体，圆柱体的代码变动如下：

```js
// 创建一个立方体网格模型
const geometry = new THREE.BoxGeometry(50, 50, 50); // [!code --]
// 创建一个圆柱体网格模型
const geometry = new THREE.CylinderGeometry(60, 60, 100, 3); // [!code ++]
const material = new THREE.MeshLambertMaterial({
    color: 0x004444,
    transparent: true, // [!code --]
    opacity: 0.6 // [!code --]
});
```

**相邻面法线夹角大于30度，才会显示线条**

```js
const edges = new THREE.EdgesGeometry(geometry, 30);
```

![cy](/phaseF/cy.jpg)

## 外部 gltf 模型设置材质和边线

### 边线设置前效果

![jianzhu](/phaseF/jianzhu.jpg)

### 边线设置后效果

![jianzhuline](/phaseF/jianzhuline.jpg)

核心代码如下：

```js
loader.load('/建筑模型.gltf', (gltf) => {
    // 递归遍历设置每个模型的材质，同时设置每个模型的边线
    gltf.scene.traverse((obj) => {
        if (obj.isMesh) {
            obj.material = new THREE.MeshLambertMaterial({
                color: 0x004444,
                transparent: true,
                opacity: 0.6
            });
            const edges = new THREE.EdgesGeometry(obj.geometry);
            const edgesMaterial = new THREE.LineBasicMaterial({
                color: 0x00ffff
            });

            const line = new THREE.LineSegments(edges, edgesMaterial);
            obj.add(line);
        }
    });
    group.add(gltf.scene);
});
```

### 示例代码如下

::: code-group
```vue [index.vue]
代码同 生成圆弧顶点 章节
```

```js [model.js]
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 创建一个GLTF加载器
const loader = new GLTFLoader();
const group = new THREE.Group();

loader.load('/建筑模型.gltf', (gltf) => {
    // 递归遍历设置每个模型的材质，同时设置每个模型的边线
    gltf.scene.traverse((obj) => {
        if (obj.isMesh) {
            obj.material = new THREE.MeshLambertMaterial({
                color: 0x004444,
                transparent: true,
                opacity: 0.6
            });
            const edges = new THREE.EdgesGeometry(obj.geometry);
            const edgesMaterial = new THREE.LineBasicMaterial({
                color: 0x00ffff
            });

            const line = new THREE.LineSegments(edges, edgesMaterial);
            obj.add(line);
        }
    });
    group.add(gltf.scene);
});

export default group;
```
:::
