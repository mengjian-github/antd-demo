# Ant Design 后台管理系统示例

这是一个基于 React + TypeScript + Ant Design 构建的后台管理系统示例项目，作为《Marscode 移动端完美适配秘籍》课程的前置项目。本项目展示了一个完整的后台管理系统的基础功能，为后续的移动端适配课程做准备。

## 项目特点

- 🚀 基于 Vite 构建，开发体验极佳
- 💻 使用 TypeScript 提供类型安全
- 🎨 集成 Ant Design 组件库
- 📊 包含数据可视化图表
- 🔒 完整的 ESLint 配置
- 📱 待适配移动端

## 技术栈

- React 18
- TypeScript 5
- Ant Design 5
- Vite 5
- ESLint
- Less

## 功能特性

- 用户管理 CRUD 操作
- 数据统计展示
- 表格搜索和筛选
- 表单验证
- 响应式布局（桌面端）

## 快速开始

### 环境要求

- Node.js >= 16
- npm >= 8

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 项目结构

```
antd-demo/
├── src/                    # 源代码目录
│   ├── App.tsx            # 主应用组件
│   ├── main.tsx           # 应用入口
│   └── index.css          # 全局样式
├── public/                 # 静态资源
├── vite.config.ts         # Vite 配置
├── tsconfig.json          # TypeScript 配置
├── package.json           # 项目依赖
└── README.md              # 项目文档
```

## 主要功能模块

1. **仪表盘**
   - 用户统计数据
   - 数据可视化图表

2. **用户管理**
   - 用户列表展示
   - 用户信息编辑
   - 用户搜索和筛选
   - 批量操作功能

3. **系统设置**
   - 基本设置
   - 安全设置
   - 通知设置

## 待实现功能

- 移动端适配
- 响应式布局优化
- 触摸事件支持
- 移动端特定交互

## 课程相关

本项目是《Marscode 移动端完美适配秘籍》课程的基础项目，后续课程将基于此项目进行移动端适配的优化和改造。课程将涵盖：

- 响应式布局设计
- 移动端交互优化
- 触摸事件处理
- 性能优化
- 移动端特定功能

## 注意事项

1. 本项目目前仅适配桌面端
2. 建议使用 Chrome 最新版本进行开发
3. 开发时请遵循 TypeScript 类型规范
4. 代码提交前请确保通过 ESLint 检查

## 许可证

MIT
