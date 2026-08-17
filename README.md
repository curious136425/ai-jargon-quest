# AI 黑话世界：小妖的学习工作台

一个手机端优先、可直接运行的 React H5 小游戏。玩家沿着纵向像素地图依次完成 15 个概念关，再把获得的五个模块装成 AI 工作台。

在线试玩：https://curious136425.github.io/ai-jargon-quest/

## 运行

需要 Node.js 20.19 或更高版本。

Windows 用户可以直接双击项目根目录里的 `启动游戏.cmd`。浏览器会自动打开，游玩期间不要关闭随之出现的终端窗口。

```bash
npm install
npm run dev
```

终端会显示本地访问地址。浏览器打开后即可从开场剧情开始。

其他命令：

```bash
npm run build
npm run test
npm run preview
```

## Android 测试版

项目已加入 Capacitor Android 工程，位于 `android/`。根目录中的 `AI黑话世界-v1.0.0-test.apk` 可以直接发送到 Android 7.0 或更新版本的手机安装。详细步骤见 `APK安装说明.md`。

当前 APK 使用调试证书签名，适合试玩和小范围测试。上架应用商店前需要创建正式发布签名，并生成 Release APK 或 AAB。

## 玩法

1. 第一次打开先看开场剧情，点击“开始闯关”。
2. 地图只开放当前关卡，完成后自动解锁下一关。
3. 每关先看故事、解释、类比和易混淆点，再完成一个轻互动。
4. 答错不会扣分，可以立刻重试；答对会获得能力卡并自动存档。
5. 第 15 关完成后进入终章，安装五个模块即可获得“AI 新手村毕业”称号。
6. 已完成关卡可以反复查看。地图右上角可重新开始，操作前会二次确认。

存档只保存在当前浏览器的 `localStorage` 中。更换设备、浏览器或清除站点数据后，进度不会自动同步。

## 主要结构

```text
src/
├─ components/              通用界面、奖励、终章组装
│  └─ interactions/         三种数据驱动互动
├─ data/
│  ├─ levels.ts             16 个节点的全部教学内容
│  └─ chapters.ts           区域与未来章节
├─ pages/                   开场、地图、关卡和安全错误页
├─ state/
│  ├─ GameContext.tsx       游戏状态入口
│  ├─ progression.ts        解锁、下一关、模块奖励纯逻辑
│  └─ storage.ts            版本化存档、损坏回退与清理
├─ styles/global.css        移动优先的像素冒险视觉
└─ types/game.ts            Level 与 Interaction 类型
```

角色图片位于 `public/assets/xiaoyao.png`，是为本项目生成的原创像素角色。

## 修改或增加关卡

关卡文案没有写在页面组件里。日常修改只需编辑 `src/data/levels.ts`：

- `problem`：小妖本关遇到的具体麻烦
- `simpleExplanation`：一句小白话
- `accurateExplanation`：补足边界的准确解释
- `story`：同一条学习工作台故事里的行动
- `analogy`：生活类比
- `confusion`：最容易混淆的相邻概念
- `interaction`：`scenario`、`chip-builder` 或 `tap-order`
- `abilityCard`：通关能力卡
- `workbenchReward`：区域节点解锁的工作台模块，可选

答案使用稳定字符串 ID，不依赖选项位置。新增同类关卡时，复制一个数据对象并更换 ID、顺序和内容即可，统一关卡页与互动组件不需要修改。

如果需要新增区域或未来章节，编辑 `src/data/chapters.ts`。如果要增加全新的互动形式，先在 `src/types/game.ts` 扩展 `Interaction` 联合类型，再增加对应组件。

关卡顺序会参与存档校验。正式发布后若要在已经上线的关卡中间插入新关，建议同时在 `src/state/storage.ts` 增加一次存档迁移，并提高 `schemaVersion`。

## 已覆盖的质量检查

- 关卡 ID、顺序、答案、区域、五个模块和终章配置
- 三种互动的答错重试、答对去重与状态隔离
- 锁关深链拦截、坏存档回退、只清理本游戏存档
- 从第 1 关到第 16 关的完整浏览器组件流程
- 360、390、430 像素宽度的真实 Chromium 截图与横向溢出检查
- 所有可点击控件不小于 44 × 44 像素
- 终章完成后存档包含完整 16 关

## 内容口径

第一章用通用概念建立能力链，具体产品只作例子。`Skill` 明确标为生态词，`MCP` 明确标为协议，`AI 工作台` 明确标为本章为了讲组合关系而使用的名字。IDE、Codex、Git 和 GitHub 留在第二章“开发世界”。
