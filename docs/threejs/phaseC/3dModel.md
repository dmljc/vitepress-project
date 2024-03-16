---
outline: deep
---

# 建模软件(Blender)绘制3D场景

## 三维建模软件作用

对于简单的立方体、球体等模型，你可以通过three.js的几何体相关API快速实现，不过复杂的模型，比如一辆轿车、一栋房子、一个仓库，一般需要通过3D建模软件来实现。

## 三维建模软件简介

3D美术常用的三维建模软件，比如`Blender`、`3dmax`、`C4D`、`maya`等等

- Blender(轻量开源)
- 3dmax
- C4D
- maya

特殊行业项目可能涉及到行业软件，比如机械相关、建筑相关

- 机械相关：`SW`、`UG`等
- 建筑相关：`草图大师`、`revit`

## 分工和流程

- 3D美术：使用三维建模软件绘制3D模型，导出`gltf`等常见格式
- 程序：`加载解析`三维软件导出的三维模型

比如使用`Blender`三维建模软件导出`gltf`格式模型，然后再通过threejs`加载三维模型`。

## 程序员学习Blender好处

- 3D相关概念，相比较代码，建模软件，更加形象，容易理解
- Blender与Threejs代码的交互，与美术更好的配合，Blender如何导出模型

## GLTF格式简介 

`gltf`格式文件几乎可以包含所有的三维模型相关信息的数据，比如模型层级关系、PBR材质、纹理贴图、骨骼动画、变形动画...

## GLTF格式信息

如果你有一定的前端基础，那么你对`JSON`一定不陌生，`GLTF`文件就是通过`JSON`的键值对方式来表示模型信息，比如`meshes`表示`网格模型`信息，`materials`表示`材质`信息...

```js
{
  "asset": {
    "version": "2.0",
  },
...
// 模型材质信息
  "materials": [
    {
      "pbrMetallicRoughness": {//PBR材质
        "baseColorFactor": [1,1,0,1],
        "metallicFactor": 0.5,//金属度
        "roughnessFactor": 1//粗糙度
      }
    }
  ],
  // 网格模型数据
  "meshes": ...
  // 纹理贴图
  "images": [
        {
            // uri指向外部图像文件
            "uri": "贴图名称.png"//图像数据也可以直接存储在.gltf文件中
        }
   ],
     "buffers": [
    // 一个buffer对应一个二进制数据块，可能是顶点位置 、顶点索引等数据
    {
      "byteLength": 840,
     //这里面的顶点数据，也快成单独以.bin文件的形式存在   
      "uri": "data:application/octet-stream;base64,AAAAPwAAAD8AAAA/AAAAPwAAAD8AAAC/.......
    }
  ],
}
```
## .bin文件

有些`gltf`文件会关联一个或多个`.bin`文件，`.bin`文件以`二进制形式存储了模型的顶点数据等信息`。.bin文件中的信息其实就是对应gltf文件中的buffers属性，buffers.bin中的模型数据，可以存储在.gltf文件中，也可以单独一个二进制.bin文件。

```js
"buffers": [
    {
        "byteLength": 102040,
        "uri": "文件名.bin"
    }
]
```

## 二进制.glb

`gltf`格式文件不一定就是以扩展名`.gltf`结尾，`.glb`就是`gltf`格式的`二进制文件`。比如你可以把.gltf模型和贴图信息全部合成得到一个.glb文件中，`.glb文件相对.gltf文件体积更小，网络传输自然更快`。

