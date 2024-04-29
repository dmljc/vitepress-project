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
const geometry = new THREE.BoxGeometry(120, 130, 140);
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff
});
const mesh = new THREE.Mesh(geometry, material);
```

## 计算模型最小包围盒.expandByObject()

模型对象，比如`mesh`或`group`，作为`.expandByObject()`的参数，可以计算该模型的包围盒。

expandByObject 方法则用于将现有的边界框扩大，以便能够包含给定的对象。如果边界框尚未设置（即，其 min 和 max 属性尚未初始化），则此方法的行为与 setFromObject 类似。

```js
const box3 = new THREE.Box3();
box3.expandByObject(mesh);
console.log('查看包围盒', box3);
// {
//     isBox3: true,
//     max: {
//         x: 60,
//         y: 65, 
//         z: 70,
//     },
//     min: {
//         x: -60,
//         y: -65, 
//         z: -70,
//     },
// }
```

## 包围盒尺寸.getSize()

返回包围盒具体的长宽高尺寸

```js
// 计算包围盒尺寸
const size = new THREE.Vector3();
box3.getSize(size);
console.log('模型包围盒尺寸', size);

// {x: 120, y: 130, z: 140}
```
## 包围盒几何中心.getCenter()

`Box3`方法`.getCenter()`计算返回包围盒几何中心

```js
// 计算包围盒中心坐标
const center = new THREE.Vector3();
box3.getCenter(center);
console.log('模型中心坐标', center);
// {x: 0, y: 0, z: 0}
```

![box3Demo](/phaseG/box3Demo.jpg)

## setFromObject

`setFromObject` 方法用于根据给定的对象（通常是Mesh或Group）设置边界框的大小和位置。
这个方法会计算对象的顶点位置，并确定一个最小的边界框，这个框能够完全包围对象。

```js
const box = new THREE.Box3();  
box.setFromObject(mesh);
```

在这个例子中，box 会根据 mesh 的顶点位置来设置其边界。

## expandByObject 和setFromObject 区别

- 初始状态：如果边界框是空的（即，尚未通过任何对象设置其边界），setFromObject 和 expandByObject 都会设置边界框以包含对象。但如果边界框已经有内容，setFromObject 会重置边界框以仅包含新对象，而 expandByObject 则会保留现有边界并扩大它以包含新对象。
- 用途：setFromObject 通常用于首次设置边界框，而 expandByObject 则用于在已经存在的边界框中添加更多对象
