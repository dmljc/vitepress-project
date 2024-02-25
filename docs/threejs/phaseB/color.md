---
outline: deep
---

# 模型材质颜色(Color对象)

`MeshBasicMaterial`、`MeshLambertMaterial`、`MeshPhongMaterial` 等网格材质，可以看到他们都有一个颜色属性`.color`。

```js
{
    r: 0,
    b: 0,
    g: 1,
    isColor: true
}
```

## 材质颜色属性.color

如果你想修改材质的颜色属性`.color`，那么你就需要了解该属性对应属性值的形式。

- 查文档，找到 .color 属性，可以发现 threejs 材质对象颜色属性 .color 是 threejs 的颜色对象 `Color`。
- console.log()打印：浏览器控制台查看材质颜色属性的属性值

