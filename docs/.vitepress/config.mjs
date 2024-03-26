import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "随手记",
    description: "描述信息x",
    // base: "/vitepress-project", github.io 地址需要base
    base: "/", // 自定义域名
    head: [["link", { rel: "icon", href: "./favicon.ico" }]],
    lastUpdated: true,
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        logo: "/logo.png", 
        nav: [
            { text: "首页", link: "/" },
            { text: "3D可视化", link: "/threejs/index" },
        ],
        sidebar: {
            // 当用户位于 `threejs` 目录时，会显示此侧边栏
            '/threejs/': [
                {
                    text: '基础概念',
                    collapsed: true,
                    items: [
                        { text: '虚拟场景 Scene', link: '/threejs/phaseA/scene' },
                        { text: '虚拟相机 Camera', link: '/threejs/phaseA/camera' },
                        { text: '渲染器 Renderer', link: '/threejs/phaseA/renderer' },
                        { text: '坐标系 AxesHelper', link: '/threejs/phaseA/axesHelper' },
                        { text: '光源 Light', link: '/threejs/phaseA/light' },
                        { text: '轨道控制器 OrbitControls', link: '/threejs/phaseA/orbitControls' },
                        { text: '动画 requestAnimationFrame', link: '/threejs/phaseA/requestAnimationFrame' },
                        { text: '阵列立方体', link: '/threejs/phaseA/matrix' },
                        { text: '渲染器设置(锯齿模糊)', link: '/threejs/phaseA/antialias' },
                        { text: 'Gui 可视化改变三维场景', link: '/threejs/phaseA/gui' },
                        { text: 'Gui 常用事件', link: '/threejs/phaseA/guiEvent' },
                        { text: 'Gui 常用组件', link: '/threejs/phaseA/guiComp' },
                        { text: 'Gui 分组管理', link: '/threejs/phaseA/guiGroup' },
                    ]
                },
                {
                    text: '进阶概念',
                    collapsed: true,
                    items: [
                        { text: '三维对象 Vector3', link: '/threejs/phaseB/vector3' },
                        { text: '欧拉对象 Euler', link: '/threejs/phaseB/euler' },
                        { text: '模型材质颜色 Color 对象', link: '/threejs/phaseB/color' },
                        { text: '模型材质父类 Material对象', link: '/threejs/phaseB/material' },
                        { text: '克隆.clone()和复制.copy()', link: '/threejs/phaseB/clone' },
                        { text: 'Group 层级模型', link: '/threejs/phaseB/group' },
                        { text: '树结构模型', link: '/threejs/phaseB/tree' },
                        { text: '本地坐标和世界坐标', link: '/threejs/phaseB/coordinates' },
                        { text: '移除.remove()和显示隐藏visible', link: '/threejs/phaseB/remove' },
                        { text: '顶点 UV 坐标、纹理贴图', link: '/threejs/phaseB/uv' },
                        { text: '自定义顶点UV坐标', link: '/threejs/phaseB/customUV' },
                        { text: '圆形平面设置纹理贴图', link: '/threejs/phaseB/circle' },
                        { text: '矩形Mesh+背景透明png贴图', link: '/threejs/phaseB/opacity' },
                        { text: 'UV 动画 offset', link: '/threejs/phaseB/uvOffset' },
                    ]
                },
                {
                    text: 'Blender 3D 建模',
                    collapsed: true,
                    items: [
                        { text: 'Blender 基本介绍', link: '/threejs/phaseC/blender' },
                        { text: 'Blender 基本操作', link: '/threejs/phaseC/operate' },
                        { text: '三维模型gltf介绍', link: '/threejs/phaseC/3dModel' },
                        { text: 'Threejs 加载.gltf文件', link: '/threejs/phaseC/gltfLoad' },
                        { text: 'gltf 不同文件形式', link: '/threejs/phaseC/pattern' },
                        { text: '纹理贴图错位', link: '/threejs/phaseC/attribute' },
                    ]
                },
                {
                    text: 'PBR 材质与纹理贴图',
                    collapsed: true,
                    items: [
                        { text: 'PBR 材质简介', link: '/threejs/phaseD/PBR' },
                        { text: 'PBR 材质金属度和粗糙度', link: '/threejs/phaseD/metalness' },
                        { text: '环境贴图.envMap（金属效果）', link: '/threejs/phaseD/envMap' },
                        { text: '清漆层属性.clearcoat(车漆效果）', link: '/threejs/phaseD/clearcoat' },
                        { text: '透光率.transmission和折射率.ior', link: '/threejs/phaseD/transmission' },
                    ]
                },
                {
                    text: 'Canvas 画布',
                    items: [
                        { text: 'Canvas 画布介绍', link: '/threejs/phaseE/basic.md' },
                        { text: 'UI交互界面与Canvas画布叠加', link: '/threejs/phaseE/zIndex.md' },
                        { text: 'UI交互按钮与3D场景交互', link: '/threejs/phaseE/click.md' },
                        { text: 'Three.js背景透明度', link: '/threejs/phaseE/alpha.md' },
                    ]
                },
            ],
        },
        socialLinks: [
            { icon: "github", link: "https://github.com/vuejs/vitepress" },
        ],
        search: {
            provider: "local",
        },
        // 编辑链接
        editLink: {
            pattern: "https://github.com/dmljc/vitepress-project/tree/main/docs/:path", // 自己项目仓库地址
            text: "在 github 上编辑此页",
        },
        lastUpdatedText: "最后更新", // string
        // 右侧边栏配置，默认值是"In hac pagina"
        outlineTitle: "页面导航",
        // 站点页脚配置
        footer: {
            message: "Released under the MIT License",
            copyright: `Copyright © 2024-present Zhang Fang Chao <a href="https://beian.miit.gov.cn">浙ICP备2024066792号-1</a>`,
        },
    },
});
