---
outline: deep
---

# Gui 常用的组件

![常用的组件](/phaseA/guiComp.jpg)

## 拖动条
·
.add() 方法参数 3 和 4 数据类型是`数字`。

`格式：add(控制对象，对象具体属性，其他参数)`

参数 3 和参数 4，分别是一个数字，交互界面是一个鼠标可以拖动的`拖动条`，可以在一个区间改变属性的值。

```js·
// 表示在 X 轴可以移动的范围是 0 -- 180 px
gu·.add(obj, 'x', 0, 180).onChange(function (value) {
    mesh.position.x = value;
});
```

## Select 选择器

.add() 方法参数 3 数据类型是`数组`。

```js
const obj = {
    translate: 0,
};

gui.add(obj, 'translate', [-100, 0, 100]).name('沿Y轴移动').onChange(function (value) {
    mesh.position.y = value;
});
```

.add() 方法参数 3 是一个`对象`

```js
const obj = {
    translate: 0,
};
// 参数3数据类型：对象(下拉菜单)
gui.add(obj, 'translate', {
    // left: -100,
    // center: 0,
    // right: 100
    左: -100,
    中: 0,
    右: 100
}).name('沿X轴移动').onChange(function (value) {
    mesh.position.x = value;
});
```

## Radio 单选框

.add() 方法参数 3 对应属性的数据类型`布尔值`。

```js
const obj = {
    bool: false,
};

gui.add(obj, 'bool').name('是否沿Y轴旋转60度').onChange(function (value) {
    mesh.rotateY(value ? 60 : -60);
});
```

## 颜色选择器

addColor() 生成颜色值改变的`交互界面`。

```js
const obj = {
    color: 0x00ffff,
};

gui.addColor(obj, 'color').onChange(function(value){
    mesh.material.color.set(value);
});
```
