import { describe, expect, it } from 'vitest'
import { orderedLevelIds } from '../state/progression'
import {
  SAVE_KEY,
  createDefaultSave,
  loadSave,
  normalizeSave,
  persistSave,
  removeSave,
} from '../state/storage'

class TestStorage implements Storage {
  private data = new Map<string, string>()
  get length() { return this.data.size }
  clear() { this.data.clear() }
  getItem(key: string) { return this.data.get(key) ?? null }
  key(index: number) { return [...this.data.keys()][index] ?? null }
  removeItem(key: string) { this.data.delete(key) }
  setItem(key: string, value: string) { this.data.set(key, value) }
}

describe('版本化存档', () => {
  it('坏 JSON、未知版本和错误类型都安全回到新游戏', () => {
    const storage = new TestStorage()
    storage.setItem(SAVE_KEY, '{broken')
    expect(loadSave(storage)).toEqual(createDefaultSave())
    expect(normalizeSave({ schemaVersion: 99 })).toEqual(createDefaultSave())
    expect(normalizeSave(null)).toEqual(createDefaultSave())
  })

  it('过滤未知关卡并修复非法的最后访问关', () => {
    const normalized = normalizeSave({
      schemaVersion: 1,
      introSeen: true,
      completedLevelIds: [orderedLevelIds[0], 'unknown', orderedLevelIds[2]],
      lastVisitedLevelId: orderedLevelIds[5],
    })
    expect(normalized.completedLevelIds).toEqual([orderedLevelIds[0]])
    expect(normalized.lastVisitedLevelId).toBe(orderedLevelIds[1])
  })

  it('写入、重载和删除只影响本游戏键', () => {
    const storage = new TestStorage()
    storage.setItem('another-app', 'keep-me')
    const save = {
      ...createDefaultSave(),
      introSeen: true,
      completedLevelIds: [orderedLevelIds[0]],
      lastVisitedLevelId: orderedLevelIds[1],
    }
    expect(persistSave(save, storage)).toBe(true)
    expect(loadSave(storage)).toEqual(save)
    expect(removeSave(storage)).toBe(true)
    expect(storage.getItem(SAVE_KEY)).toBeNull()
    expect(storage.getItem('another-app')).toBe('keep-me')
  })
})
