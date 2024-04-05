---
outline: deep
---

# PBR 材质简介

![PBR](/phaseD/网格材质.svg)

所谓`PBR`就是:`基于物理的渲染`(physically-based rendering)。

Three.js 提供了两个 PBR 材质相关的 API`MeshStandardMaterial`和`MeshPhysicalMaterial`;`MeshPhysicalMaterial`是`MeshStandardMaterial`扩展的`子类`，提供了更多功能属性。

<!-- # 光照模型 -->

`PBR材质`相比 MeshLambertMaterial 和 MeshPhongMaterial 可以提供更`逼真的`、`更接近生活中的`材质效果，当然也会占用更多的电脑硬件资源。

## 渲染占用资源和表现能力

整体上来看，就是渲染表现能力越强，占用的计算机硬件资源更多。

`MeshBasicMaterial` < `MeshLambertMaterial` < `MeshPhongMaterial` < `MeshStandardMaterial` < `MeshPhysicalMaterial`
