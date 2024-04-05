---
outline: deep
---

# addFolder() 分组

![光源分组](/phaseA/guiGroup.jpg)

new GUI() 实例化一个 gui 对象，默认创建一个总的菜单，通过 gui 对象的 `.addFolder()`方法可以创建一个子菜单，当通过 GUI 控制的属性比较多的时候，可以使用 .addFolder() 进行分组。

`.addFolder()` 返回的子文件夹对象，同样具有 gui 对象的 `.add()`、 `.onChange()`、 `.addColor()` 等等属性。

```js
// Gui 控制三维场景的UI交互界面
const gui = new GUI();
const lightFolfer = gui.addFolder("光源"); // [!code ++]

gui.add(ambientLight, "intensity", 0, 2).name("环境光强度").step(0.1); // [!code --]
gui.add(pointLight, "intensity", 0, 2).name("点光源强度").step(0.1); // [!code --]

lightFolfer.add(ambientLight, "intensity", 0, 2).name("环境光强度").step(0.1); // [!code ++]
lightFolfer.add(pointLight, "intensity", 0, 2).name("点光源强度").step(0.1); // [!code ++]
```

## 关闭和展开交互界面

默认是展开 `gui.open()`分组的，可以关闭`gui.close()`。

```js
// 创建GUI对象
const gui = new GUI();
// 关闭菜单
gui.close();
```

```js
// 创建光源子菜单
const lightFolfer = gui.addFolder("光源");
// 关闭菜单
lightFolfer.close();
```

## addFolder() 子菜单嵌套子菜单

.addFolder() 创建的对象，同样也具有 .addFolder()属性，可以继续嵌套子菜单，俗称套娃。
