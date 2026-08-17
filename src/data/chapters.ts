import type { Chapter, Zone } from '../types/game'

export const zones: Zone[] = [
  {
    id: 'dialogue-valley',
    name: '对话谷',
    subtitle: '把话说明白',
    icon: '💬',
  },
  {
    id: 'data-forest',
    name: '资料森林',
    subtitle: '让资料找得到',
    icon: '🌲',
  },
  {
    id: 'automation-workshop',
    name: '自动化工坊',
    subtitle: '让事情按步骤发生',
    icon: '⚙️',
  },
  {
    id: 'connection-city',
    name: '连接之城',
    subtitle: '让 AI 使用外部能力',
    icon: '🔌',
  },
  {
    id: 'workbench-summit',
    name: '终点工作台',
    subtitle: '把能力组装起来',
    icon: '✨',
  },
]

export const chapters: Chapter[] = [
  {
    id: 'chapter-01',
    name: '第一章 · AI 黑话世界',
    subtitle: '小妖的学习工作台',
    status: 'active',
    levelIds: [
      'l01-ai-assistant',
      'l02-model',
      'l03-prompt',
      'l04-context',
      'l05-token',
      'l06-workspace',
      'l07-memory',
      'l08-knowledge-base',
      'l09-rag',
      'l10-workflow',
      'l11-skill',
      'l12-tool-use',
      'l13-agent',
      'l14-api',
      'l15-mcp',
      'l16-ai-workbench',
    ],
  },
  {
    id: 'chapter-02',
    name: '第二章 · 开发世界',
    subtitle: 'IDE、Codex、Git 与 GitHub',
    status: 'comingSoon',
  },
  {
    id: 'chapter-03',
    name: '第三章 · Agent 世界',
    subtitle: '让多个执行者一起完成任务',
    status: 'comingSoon',
  },
  {
    id: 'chapter-04',
    name: '第四章 · AI 工作流世界',
    subtitle: '把真实工作变成稳定流程',
    status: 'comingSoon',
  },
]

export function getZone(zoneId: Zone['id']) {
  return zones.find((zone) => zone.id === zoneId)
}
