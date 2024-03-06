---
outline: deep
---

# 本地坐标和世界坐标

## 本地(局部)坐标

任何一个模型的`本地坐标`(局部坐标)就是模型的`.position`属性。

## 世界坐标

一个模型的`世界坐标`，说的是，模型自身`.position`和`所有父对象.position累加`的坐标。

```js
// mesh 的世界坐标就是mesh.position与group.position的累加
const mesh = new THREE.Mesh(geometry, material); 
mesh.position.set(50, 0, 0);
const group = new THREE.Group();
group.add(mesh);
group.position.set(50, 0, 0);
```

## .getWorldPosition() 获取世界坐标

`mesh.getWorldPosition(V3)`读取一个模型的`世界坐标`，并把读取`结果`存储到`参数V3`中。

```js
// 声明一个三维向量用来表示某个坐标
const worldPosition = new THREE.Vector3();
// 获取 mesh 的世界坐标，你会发现 mesh 的世界坐标受到父对象 group 的 .position 影响
mesh.getWorldPosition(worldPosition);
console.log('本地坐标', mesh.position);
console.log('世界坐标', worldPosition);
```

## 给子对象添加一个局部坐标系

`mesh.add(坐标系)`给`mesh`添加一个`局部坐标系`。

```js
// 可视化mesh的局部坐标系
const meshAxesHelper = new THREE.AxesHelper(50);
mesh.add(meshAxesHelper);
```

## 改变模型相对局部坐标原点位置

通过改变几何体`顶点坐标`，可以改变模型自身相对坐标原点的位置。

```js
// 长方体的几何中心默认与本地坐标原点重合
const geometry = new THREE.BoxGeometry(50, 50, 50);
```

```js
// 平移几何体的顶点坐标，改变几何体自身相对局部坐标原点的位置
geometry.translate(50/2, 0, 0);
```

## 旋转测试

局部坐标相对模型发生改变，旋转轴自然也会发生变化。

```js
// .rotateY()默认绕几何体中心旋转，经过上面几何体平移变化，
// 你会发现.rotateY()是绕长方体面上一条线旋转
mesh.rotateY(Math.PI/3);
```

你可以设置旋转动画，观察几何体平移前后旋转动画差异。

```js
function render() {
    model.rotateY(0.01); // 旋转动画
    requestAnimationFrame(render);
}
render();
```