---
outline: deep
---

# 阵列立方体

![阵列立方体](/phaseA/matrix.jpg)

## for循环创建一列模型

所谓阵列立方体就是创建多个一样的立方体，实现思路就是for循环。

```js
const geometry = new THREE.BoxGeometry(100, 100, 100);
//材质对象Material
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff, // 设置材质颜色
    transparent: true,// 开启透明
    opacity: 0.5,// 设置透明度
});
for (let i = 0; i < 10; i++) {
    const mesh = new THREE.Mesh(geometry, material); // 网格模型对象Mesh
    // 沿着x轴分布
    mesh.position.set(i*100,0,0);
    scene.add(mesh); // 网格模型添加到场景中
}
```

## 双层for循环创建阵列模型

```js
// 创建一个长方体几何对象Geometry
const geometry = new THREE.BoxGeometry(100, 100, 100);
// 材质对象Material
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff, // 设置材质颜色
    transparent: true,// 开启透明
    opacity: 0.5,// 设置透明度
});
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        const mesh = new THREE.Mesh(geometry, material); // 网格模型对象Mesh
        // 在XOZ平面上分布
        mesh.position.set(i * 100, 0, j * 100);
        scene.add(mesh); // 网格模型添加到场景中  
    }
}
```

## 相机位置拉远，可以看到更大的观察范围

```js
// camera.position.set(200, 200, 200); // [!code --]
camera.position.set(3000, 3000, 3000);  // [!code ++]
```

## 超出视锥体远裁界面的范围的会被剪裁掉

超出视锥体远裁界面的范围的会被剪裁掉，可以调整相机 far 参数和修改相机位置避免。

```js
// const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);  // [!code --]
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 8000);  // [!code ++]
// camera.position.set(200, 200, 200);  // [!code --]
camera.position.set(2000, 2000, 2000); // [!code ++]
```
