import { describe, expect, it } from 'vitest'
import {
  addCompletedLevel,
  getCurrentLevelId,
  getUnlockedModuleIds,
  isLevelUnlocked,
  normalizeCompletedIds,
  orderedLevelIds,
} from '../state/progression'

describe('顺序解锁', () => {
  it('新玩家只能进入第一关', () => {
    expect(isLevelUnlocked(orderedLevelIds[0], [])).toBe(true)
    expect(isLevelUnlocked(orderedLevelIds[1], [])).toBe(false)
    expect(getCurrentLevelId([])).toBe(orderedLevelIds[0])
  })

  it('完成一关只解锁下一关', () => {
    const afterFirst = addCompletedLevel(orderedLevelIds[0], [])
    expect(afterFirst).toEqual([orderedLevelIds[0]])
    expect(isLevelUnlocked(orderedLevelIds[1], afterFirst)).toBe(true)
    expect(isLevelUnlocked(orderedLevelIds[2], afterFirst)).toBe(false)
  })

  it('不能直接完成锁定关，重复完成保持幂等', () => {
    expect(addCompletedLevel(orderedLevelIds[2], [])).toEqual([])
    const completed = [orderedLevelIds[0]]
    expect(addCompletedLevel(orderedLevelIds[0], completed)).toBe(completed)
  })

  it('损坏或跳跃记录会被裁成连续前缀', () => {
    expect(normalizeCompletedIds([
      orderedLevelIds[0],
      orderedLevelIds[2],
      'unknown',
      orderedLevelIds[0],
    ])).toEqual([orderedLevelIds[0]])
  })

  it('根据已通关关卡推导模块，不保存重复状态', () => {
    expect(getUnlockedModuleIds(orderedLevelIds.slice(0, 4))).toEqual([])
    expect(getUnlockedModuleIds(orderedLevelIds.slice(0, 5))).toEqual(['module-dialogue'])
    expect(getUnlockedModuleIds(orderedLevelIds.slice(0, 15))).toHaveLength(5)
  })
})
