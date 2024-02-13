---
outline: deep
---

# 相机 Camera

Threejs如果想把三维场景Scene渲染到web网页上，还需要定义一个虚拟相机Camera，就像生活中想获得一张照片，需要一台用来拍照的相机。Threejs提供了正投影相机 OrthographicCamera 和 透视投影相机 PerspectiveCamera。

## 透视投影相机 PerspectiveCamera

透视投影相机 PerspectiveCamera 本质上就是在模拟人眼观察这个世界的规律。

请注意，在大多数属性发生改变之后，需要调用 updateProjectionMatrix 来使得这些改变生效。

```js
// 实例化一个透视投影相机对象
const camera = new THREE.PerspectiveCamera();
```

### 相机位置.position

生活中用相机拍照，你相机位置不同，拍照结果也不同，threejs中虚拟相机同样如此。
比如有一间房子，你拿着相机站在房间里面，看到的是房间内部，站在房子外面看到的是房子外面效果。
相机对象Camera具有位置属性.position 可以设置相机的位置。

```js
//相机在Three.js三维坐标系中的位置
// 根据需要设置相机位置具体值
camera.position.set(200, 200, 200); 
```

### 相机观察目标.lookAt()

你用相机拍照你需要控制相机的拍照目标，具体说相机镜头对准哪个物体或说哪个坐标。对于threejs相机而言，就是设置.lookAt()方法的参数，指定一个3D坐标。

![相机](/camera.png)

```js
// 相机观察目标指向Threejs 3D空间中某个位置
camera.lookAt(0, 0, 0); //坐标原点
camera.lookAt(0, 10, 0);  //y轴上位置10
camera.lookAt(mesh.position);// 指向mesh对应的位置
```
### 定义相机渲染输出的画布尺寸

你生活中相机拍照的照片是有大小的，对于threejs而言一样，需要定义相机在网页上输出的Canvas画布(照片)尺寸，大小可以根据需要定义。

课程中会把threejs虚拟相机渲染三维场景在浏览器网页上呈现的结果称为Canvas画布。

```js
// 定义相机输出画布的尺寸(单位:像素px)
const width = 800; //宽度
const height = 500; //高度
```

### 透视投影相机PerspectiveCamera：视锥体

透视投影相机的四个参数fov, aspect, near, far构成一个四棱台3D空间，被称为视锥体，只有视锥体之内的物体，才会渲染出来，视锥体范围之外的物体不会显示在Canvas画布上。

![视锥体](/perspective.png)

```js
// width和height用来设置Three.js输出的Canvas画布尺寸(像素px)
const width = 800; //宽度
const height = 500; //高度
// 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
```

## 正投影相机 OrthographicCamera

在这种投影模式下，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。

这对于渲染2D场景或者UI元素是非常有用的。