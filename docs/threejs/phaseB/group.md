---
outline: deep
---

# Group层级模型(树结构)案例

![Group](/phaseB/group.svg)

场景对象`Scene`的子对象，除了组对象`Group`之外，还可以看到环境光`AmbientLight`、平行光`DirectionalLight`、辅助坐标对象`AxesHelper`。

场景对象对象`scene`构成的层级模型本身是一个`树结构`，场景对象层级模型的第一层，也就是树结构的根节点，一般来说网格模型`Mesh`、点模型`Points`、线模型`Line`是树结构的最外层叶子结点。构建层级模型的中间层一般都是通过Threejs 的 `Group`类来完成，Group类实例化的对象可以称为组对象。

父对象执行`.add()`方法的本质就是把参数中的子对象添加到自身的子对象属性`.children`中。

```js
// 创建两个网格模型 mesh1、mesh2
const geometry = new THREE.BoxGeometry(20, 20, 20);
const material = new THREE.MeshLambertMaterial({color: 0x00ffff});
// 创建一个组对象group
const group = new THREE.Group();
const mesh1 = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry, material);
mesh2.translateX(25);
// 把mesh1型插入到组group中，mesh1作为group的子对象
group.add(mesh1);
// 把mesh2型插入到组group中，mesh2作为group的子对象
group.add(mesh2);
// 把group插入到场景中作为场景子对象
scene.add(group);
```

## .add()方法总结

场景对象`Scene`、组对象`Group`的`.add()`方法都是继承自它们`共同的基类(父类)Object3D`。

```js
// add 方法可以单独插入一个对象，
group.add(mesh1);
group.add(mesh2);
// 也可以同时插入多个子对象。
group.add(mesh1, mesh2);
```

## 父对象旋转缩放平移变换，子对象跟着变化

网格模型`mesh1`、`mesh2`作为设置为父对象`group`的子对象，如果父对象group进行旋转、缩放、平移变换，子对象同样跟着变换，`就像你的头旋转了，眼睛会跟着头旋转`。

```js
// 沿着Y轴平移mesh1和mesh2的父对象，mesh1和mesh2跟着平移
group.translateY(100);

// 父对象缩放，子对象跟着缩放
group.scale.set(4,4,4);

// 父对象旋转，子对象跟着旋转
group.rotateY(Math.PI/6);
```

## Object3D表示模型对象节点

受 threejs 历史影响，你会在很多别的代码中看到`Object3D`作为`Group`来使用，如果看到不用奇怪。某种程度上，你`可把两者画等号`，只是`Group`更加`语义化`，`Object3D`本身就是`表示模型节点`的意思。

```js
const mesh1 = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry, material);
const obj = new THREE.Object3D();// obj作为mesh1和mesh2的父对象
obj.add(mesh1,mesh2);
```

## mesh也能添加mesh子对象

threejs 默认`mesh`也可以添加`子对象`，其实原因很简单`mesh`和`Group`父类都是`Object3D`，本质上也可以认为都是`Object3D`。

```js
// mesh基类也是Object3D
mesh1.add(mesh2);
```