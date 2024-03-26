---
outline: deep
---

# UI交互按钮与3D场景交互

实际开发的时候，往往会通过前端HTML、CSS代码创建按钮等交互界面，用来与3D场景交互。
如果你是用vue或react开发web3d项目，也可以不用HTML、CSS自己写，可以使用UI组件库。

![event](/phaseE/event.jpg)

## UI按钮改变Mesh颜色

::: code-group

```js:line-numbers [tempalte]
<template>
    <div ref="canvas"></div>
    {/* js方案 */}
    <div class="pos">
        <div id="red" class="bu">红</div>
        <div id="green" class="bu" style="margin-left: 10px;">绿</div>
    </div>

    {/* vue 方案 */}
    <div class="pos">
        <div id="red" class="bu" @click="changeColor(0xff0000)"> 红 </div>
        <div id="green" class="bu" @click="changeColor(0x00ff00)" style="margin-left: 10px"> 绿</div>
    </div>
</template>
```

```js:line-numbers [js]
// js方案要在mounted钩子中调用以保证能拿到dom
onMounted(() => {
    document.getElementById('red').addEventListener('click', () => {
        mesh.material.color.set(0xff0000);
    });
    document.getElementById('green').addEventListener('click', () =>{
        mesh.material.color.set(0x00ff00);
    });
});

// vue方案改变材质颜色
const changeColor = (color: number) => {
    mesh.material.color.set(color);
};
```



