---
outline: deep
---

# 包围盒Box3

所谓包围盒`Box3`，就是一个长方体空间，把模型的所有顶点数据包围在一个最小的长方体空间中，这个最小长方体空间就是该模型的包围盒`Box3`。

![box3](/phaseG/box3.jpeg)

## 包围盒Box3

包围盒`Box3`表示三维长方体包围区域，使用`min`和`max`两个属性来描述该包围区域，Box3的min和max属性值都是三维向量对象`Vector3`。

描述一个长方体包围盒需要通过xyz坐标来表示，X范围[Xmin,Xmax],Y范围[Ymin,Ymax],Z范围[Zmin,Zmax],.min属性值是Vector3(Xmin, Ymin, Zmin),.max属性值是Vector3(Xmax, Ymax, Zmax)。

## 创建一个立方体网格模型

```js
const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff
});
const mesh = new THREE.Mesh(geometry, material);
```

## 计算模型最小包围盒.expandByObject()

模型对象，比如`mesh`或`group`，作为`.expandByObject()`的参数，可以计算该模型的包围盒。

```js
const box3 = new THREE.Box3();
box3.expandByObject(mesh);
console.log('查看包围盒', box3);
```

## 包围盒尺寸.getSize()

返回包围盒具体的长宽高尺寸

```js
// 计算包围盒尺寸
const size = new THREE.Vector3();
box3.getSize(size);
console.log('模型包围盒尺寸', size);
```
## 包围盒几何中心.getCenter()

`Box3`方法`.getCenter()`计算返回包围盒几何中心

```js
// 计算包围盒中心坐标
const center = new THREE.Vector3();
box3.getCenter(center);
console.log('模型中心坐标', center);
```

![box3Demo](/phaseG/box3Demo.jpg)