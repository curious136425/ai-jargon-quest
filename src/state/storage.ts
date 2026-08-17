import type { SaveV1 } from '../types/game'
import {
  getCurrentLevelId,
  isLevelUnlocked,
  normalizeCompletedIds,
  orderedLevelIds,
} from './progression'

export const SAVE_KEY = 'ai-jargon-quest:save'

export function createDefaultSave(): SaveV1 {
  return {
    schemaVersion: 1,
    introSeen: false,
    completedLevelIds: [],
    lastVisitedLevelId: null,
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export function normalizeSave(value: unknown): SaveV1 {
  if (!isObject(value) || value.schemaVersion !== 1) {
    return createDefaultSave()
  }

  const introSeen = value.introSeen === true
  if (!introSeen) return createDefaultSave()

  const completedLevelIds = normalizeCompletedIds(value.completedLevelIds)
  const candidateLastVisited =
    typeof value.lastVisitedLevelId === 'string'
      ? value.lastVisitedLevelId
      : null

  const lastVisitedLevelId =
    candidateLastVisited &&
    orderedLevelIds.includes(candidateLastVisited) &&
    isLevelUnlocked(candidateLastVisited, completedLevelIds)
      ? candidateLastVisited
      : getCurrentLevelId(completedLevelIds)

  return {
    schemaVersion: 1,
    introSeen,
    completedLevelIds,
    lastVisitedLevelId,
  }
}

function browserStorage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage
  } catch {
    return null
  }
}

export function loadSave(storage: Storage | null = browserStorage()): SaveV1 {
  if (!storage) return createDefaultSave()

  try {
    const raw = storage.getItem(SAVE_KEY)
    if (!raw) return createDefaultSave()
    return normalizeSave(JSON.parse(raw) as unknown)
  } catch {
    return createDefaultSave()
  }
}

export function persistSave(
  save: SaveV1,
  storage: Storage | null = browserStorage(),
): boolean {
  if (!storage) return false

  try {
    storage.setItem(SAVE_KEY, JSON.stringify(save))
    return true
  } catch {
    return false
  }
}

export function removeSave(
  storage: Storage | null = browserStorage(),
): boolean {
  if (!storage) return false

  try {
    storage.removeItem(SAVE_KEY)
    return true
  } catch {
    return false
  }
}
