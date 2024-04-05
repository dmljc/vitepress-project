---
outline: deep
---

# 模型材质颜色(Color 对象)

`MeshBasicMaterial`、`MeshLambertMaterial`、`MeshPhongMaterial` 等网格材质，可以看到他们都有一个颜色属性`.color`。

```js
{
    r: 0,
    b: 0,
    g: 1,
    isColor: true
}
```

## 材质颜色属性 .color

如果你想修改材质的颜色属性`.color`，那么你就需要了解该属性对应属性值的形式。

- 查文档，找到 .color 属性，可以发现 threejs 材质对象颜色属性 .color 是 threejs 的颜色对象 `Color`。

```js
console.log("material.color", material.color);
```

## 颜色对象 Color

创建一个颜色对象

```js
// 默认是纯白色0xffffff。
const color = new THREE.Color();
// 即
const color = new THREE.Color(0x00ff00);
// 可以查看rgb的值
console.log("查看颜色对象结构", color);
```

## 通过 .r、.g、.b 属性改变颜色值

```js
color.r = 0.0;
color.b = 0.0;
```

## 改变颜色的方法

查看 Color 文档 有 `.setHex()`、`.setRGB()`、`.setStyle()`、`.set()` 等修改颜色值的方法。

```js
color.setRGB(0, 1, 0); // RGB方式设置颜色
color.setHex(0x00ff00); // 十六进制方式设置颜色
color.setStyle("#00ff00"); // 前端CSS颜色值设置颜色

color.set(0x00ff00); // 十六进制方式设置颜色
color.set("#00ff00"); // 前端CSS颜色值设置颜色
```

## 重置模型材质的颜色

十六进制颜色

```js
material.color.set(0x00ffff);
```

## 前端 CSS 风格颜色值：'#00ff00'、'rgb(0,255,0)'等形式

```js
material.color.set("#00ff00");
material.color.set("rgb(0,255,0)");
```
