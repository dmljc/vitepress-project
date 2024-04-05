---
outline: deep
---

# 移除和显示隐藏

## 移除对象 .remove()

前面课程给大家讲解过.add()方法,比如可以通过.add()可以把模型或光源添加到场景中。

```js
group.add(mesh);
scene.add(group);
scene.add(light);
```

.remove()方法和.add()方法是相反的，是把子对象从父对象的.children()属性中删除。

场景对象`Scene`、组对象`Group`、网格模型对象`Mesh`的`.remove()`方法都是继承自它们共同的基类(父类)`Object3D`。

## .remove() 方法使用

`.add()`方法是给父对象添加一个`子对象`，`.remove()`方法是删除父对象中的一个子对象。

```js
// 删除父对象group的子对象网格模型mesh1
group.remove(mesh1);

// 移除场景中环境光
scene.remove(ambient);
// 移除场景中模型对象
scene.remove(model);
```

## 同时移除多个子对象

```js
group.remove(mesh1, mesh2);
```

## 模型隐藏或显示

模型对象的父类`Object3D`封装了一个属性`.visible`，通过该属性可以`隐藏`或`显示`一个模型。

```js
mesh.visible = false; // 隐藏一个网格模型，visible 的默认值是 true
group.visible = false; // 隐藏一个包含多个模型的组对象 group
mesh.visible = true; // 使网格模型 mesh 处于显示状态
```

## 材质属性 .visible

材质对象的父类`Material`封装了一个`.visible`属性，通过该属性可以控制是否隐藏该材质对应的模型对象。

```js
// 隐藏网格模型mesh，visible 的默认值是 true
mesh.material.visible = false;
// 注意如果mesh2和mesh的.material属性指向同一个材质，mesh2也会跟着mesh隐藏
```

:::warning 注意:
如果多个模型引用了同一个材质，如果该材质.visible 设置为 false，意味着隐藏绑定该材质的所有模型。
:::
