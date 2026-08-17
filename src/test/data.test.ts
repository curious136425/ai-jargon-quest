import { describe, expect, it } from 'vitest'
import { chapters, zones } from '../data/chapters'
import { levels } from '../data/levels'

describe('关卡数据', () => {
  it('包含 15 个概念关和第 16 个终章', () => {
    expect(levels).toHaveLength(16)
    expect(levels.filter((level) => level.kind === 'concept')).toHaveLength(15)
    expect(levels.at(-1)?.kind).toBe('finale')
  })

  it('使用唯一且连续的稳定标识', () => {
    expect(new Set(levels.map((level) => level.id)).size).toBe(levels.length)
    expect(levels.map((level) => level.order)).toEqual(
      Array.from({ length: 16 }, (_, index) => index + 1),
    )
    expect(levels.every((level) => level.id.startsWith(`l${String(level.order).padStart(2, '0')}`))).toBe(true)
  })

  it('每种互动的答案都能在自身数据中找到', () => {
    for (const level of levels) {
      if (level.kind !== 'concept') continue
      const interaction = level.interaction

      if (interaction.type === 'scenario') {
        expect(interaction.options.some((option) => option.id === interaction.answerId)).toBe(true)
        expect(new Set(interaction.options.map((option) => option.id)).size).toBe(interaction.options.length)
      }

      if (interaction.type === 'chip-builder') {
        const chipIds = interaction.chips.map((chip) => chip.id)
        expect(interaction.requiredChipIds.every((id) => chipIds.includes(id))).toBe(true)
        expect(new Set(chipIds).size).toBe(chipIds.length)
      }

      if (interaction.type === 'tap-order') {
        const stepIds = interaction.steps.map((step) => step.id)
        expect(interaction.steps).toHaveLength(3)
        expect(interaction.correctOrder).toHaveLength(3)
        expect(interaction.correctOrder.every((id) => stepIds.includes(id))).toBe(true)
        expect(new Set(stepIds).size).toBe(stepIds.length)
      }
    }
  })

  it('五个工作台模块不重不漏', () => {
    const rewardedModules = levels.flatMap((level) =>
      level.kind === 'concept' && level.workbenchReward
        ? [level.workbenchReward.id]
        : [],
    )
    const finale = levels.at(-1)
    expect(new Set(rewardedModules).size).toBe(5)
    expect(finale?.kind).toBe('finale')
    if (finale?.kind === 'finale') {
      expect(finale.modules.map((module) => module.id).sort()).toEqual(
        rewardedModules.slice().sort(),
      )
    }
  })

  it('明确标注生态词和本章组合词', () => {
    expect(levels.find((level) => level.name === 'Skill')?.termKind).toBe('ecosystem')
    expect(levels.find((level) => level.name === 'AI Workbench')?.termKind).toBe('game-defined')
  })

  it('章节和地图区域完整', () => {
    expect(zones).toHaveLength(5)
    expect(chapters[0].status).toBe('active')
    expect(chapters.slice(1)).toHaveLength(3)
    expect(chapters.slice(1).every((chapter) => chapter.status === 'comingSoon')).toBe(true)
  })
})
