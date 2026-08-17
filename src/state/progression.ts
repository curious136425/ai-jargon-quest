import { levels } from '../data/levels'
import type { LevelId, ModuleId } from '../types/game'

export const orderedLevelIds = levels
  .slice()
  .sort((a, b) => a.order - b.order)
  .map((level) => level.id)

export function normalizeCompletedIds(candidateIds: unknown): LevelId[] {
  if (!Array.isArray(candidateIds)) return []

  const candidateSet = new Set(
    candidateIds.filter((item): item is string => typeof item === 'string'),
  )
  const normalized: LevelId[] = []

  for (const levelId of orderedLevelIds) {
    if (!candidateSet.has(levelId)) break
    normalized.push(levelId)
  }

  return normalized
}

export function isLevelUnlocked(
  levelId: LevelId,
  completedLevelIds: LevelId[],
): boolean {
  const index = orderedLevelIds.indexOf(levelId)
  if (index < 0) return false
  if (index === 0) return true

  const completed = new Set(completedLevelIds)
  return orderedLevelIds.slice(0, index).every((id) => completed.has(id))
}

export function getCurrentLevelId(completedLevelIds: LevelId[]): LevelId {
  const completed = new Set(completedLevelIds)
  return (
    orderedLevelIds.find((levelId) => !completed.has(levelId)) ??
    orderedLevelIds[orderedLevelIds.length - 1]
  )
}

export function getNextLevelId(levelId: LevelId): LevelId | null {
  const index = orderedLevelIds.indexOf(levelId)
  if (index < 0 || index >= orderedLevelIds.length - 1) return null
  return orderedLevelIds[index + 1]
}

export function addCompletedLevel(
  levelId: LevelId,
  completedLevelIds: LevelId[],
): LevelId[] {
  if (!isLevelUnlocked(levelId, completedLevelIds)) return completedLevelIds
  if (completedLevelIds.includes(levelId)) return completedLevelIds

  return normalizeCompletedIds([...completedLevelIds, levelId])
}

export function getUnlockedModuleIds(
  completedLevelIds: LevelId[],
): ModuleId[] {
  const completed = new Set(completedLevelIds)
  return levels.flatMap((level) => {
    if (
      level.kind === 'concept' &&
      level.workbenchReward &&
      completed.has(level.id)
    ) {
      return [level.workbenchReward.id]
    }
    return []
  })
}
