---
outlien: deep
---

# 常用属性

## 外部模型材质是否共享的问题

美术通过三维建模软件，比如Blender绘制好一个三维场景以后，一些外观一样的Mesh，`可能会共享一个材质对象`。

改变一个模型颜色其它模型跟着变化

由于楼房的`Mesh`共享了1号楼Mesh的材质，当你通过`mesh1.material`改变mesh1材质，本质上是改变所有楼Mesh的材质。
```js
const mesh1 = gltf.scene.getObjectByName("1号楼");
// 改变1号楼Mesh材质颜色
mesh1.material.color.set(0xff0000);
```

## .name标记材质，判断两个mesh是否共享材质

```js
const mesh1 = gltf.scene.getObjectByName("1号楼");
// 通过name标记mesh1对应材质
mesh1.material.name = '楼房材质';
const mesh2 = gltf.scene.getObjectByName("2号楼");
// 通过name相同，可以判断mesh1.material和mesh2.material共享了同一个材质对象
console.log('mesh2.material.name', mesh2.material.name);
```

解决问题方向:下面两个方案，可以任选其一：

- 三维建模软件中设置，需要代码改变材质的Mesh不要共享材质，要独享材质。
- 代码批量更改：克隆材质对象，重新赋值给mesh的材质属性

## 更换gltf颜色贴图

执行`mesh.material.map = texture`;新的纹理对象`Texture`赋值给`.material.map`就可以更换材质贴图。

```js
loader.load("../手机模型.glb", function (gltf) {
    const mesh = gltf.scene.children[0]; // 获取Mesh
    mesh.material.map = texture; //更换不同风格的颜色贴图
})
```

:::info 注意：
如果直接给gltf模型材质设置`.map`属性更换贴图，会出现`纹理贴图错位的问题`，这主要和纹理对象`Texture`的`翻转属性.flipY`有关。
:::

## 纹理对象Texture翻转属性.flipY默认值

`.flipY`表示是否`翻转纹理贴图在Mesh上的显示位置`。纹理对象`Texture`翻转属性`.flipY`默认值是`true`。

## gltf的贴图翻转属性.flipY默认值

`gltf`的贴图翻转属性`.flipY`默认值是`false`。

```js
loader.load("../手机模型.glb", function (gltf) {
    const mesh = gltf.scene.children[0]; //获取Mesh
    console.log('.flipY', mesh.material.map.flipY);
})
```

::: warning 注意：  
如果更换单独加载的纹理贴图，比如颜色贴图.map，注意把纹理贴图.flipY的值设置给gltf中纹理值false。

// 是否翻转纹理贴图

texture.flipY = false;
:::