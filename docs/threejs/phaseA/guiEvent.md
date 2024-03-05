---
outline: deep
---

# gui 调试界面自定义

![自定义调试界面](/phaseA/guiEvent.jpg)

## name() 方法

.add() 创建的交互界面，会默认显示所改变属性的名字，为了通过交互界面更好理解你改变的某个对象属性，你可以通过 .name() 方法改变 gui 生成交互界面显示的内容。

```js
const gui = new GUI();
gui.add(ambient, 'intensity', 0, 2.0).name('环境光强度');
gui.add(directionalLight, 'intensity', 0, 2.0).name('平行光强度');
```
## .step() 方法

步长 .step() 方法可以设置交互界面每次改变属性值间隔是多少。默认是保留三位小数，步长设置为 0.1 之后就是保留一位小数。

```js
gui.add(ambient, 'intensity', 0, 2.0).name('环境光强度').step(0.1);
```

## .onChange() 方法

当 gui 界面某个值的时候，.onChange() 方法就会执行。

```js:{7,10,13}line-numbers
const gui = new GUI();
const obj = {
    x: 0,
    y: 0,
    z: 0,
};
gui.add(obj, 'x', 0, 180).onChange((value) => {
    mesh.position.x = value;
});
gui.add(obj, 'y', 0, 180).onChange((value) => {
    mesh.position.y = value;
});
gui.add(obj, 'z', 0, 180).onChange((value) => {
    mesh.position.z = value;
});
```
## .addColor() 颜色值改变

addColor() 生成颜色值改变的交互界面。

```js
const obj = {
    color: 0x00ffff,
};

gui.addColor(obj, 'color').onChange(function(value){
    mesh.material.color.set(value);
});
```
