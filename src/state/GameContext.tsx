import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { LevelId, ModuleId, SaveV1 } from '../types/game'
import {
  addCompletedLevel,
  getCurrentLevelId,
  getUnlockedModuleIds,
  isLevelUnlocked,
} from './progression'
import {
  createDefaultSave,
  loadSave,
  persistSave,
  removeSave,
} from './storage'

interface GameContextValue {
  save: SaveV1
  completedCount: number
  currentLevelId: LevelId
  unlockedModuleIds: ModuleId[]
  markIntroSeen: () => void
  visitLevel: (levelId: LevelId) => boolean
  completeLevel: (levelId: LevelId) => boolean
  isCompleted: (levelId: LevelId) => boolean
  isUnlocked: (levelId: LevelId) => boolean
  resetProgress: () => void
}

const GameContext = createContext<GameContextValue | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [save, setSave] = useState<SaveV1>(() => loadSave())

  const replaceSave = useCallback((next: SaveV1) => {
    setSave(next)
    persistSave(next)
  }, [])

  const markIntroSeen = useCallback(() => {
    setSave((previous) => {
      if (previous.introSeen) return previous
      const next: SaveV1 = {
        ...previous,
        introSeen: true,
        lastVisitedLevelId: getCurrentLevelId(previous.completedLevelIds),
      }
      persistSave(next)
      return next
    })
  }, [])

  const visitLevel = useCallback(
    (levelId: LevelId) => {
      if (!save.introSeen || !isLevelUnlocked(levelId, save.completedLevelIds)) {
        return false
      }

      if (save.lastVisitedLevelId !== levelId) {
        replaceSave({ ...save, lastVisitedLevelId: levelId })
      }
      return true
    },
    [replaceSave, save],
  )

  const completeLevel = useCallback(
    (levelId: LevelId) => {
      if (!save.introSeen || !isLevelUnlocked(levelId, save.completedLevelIds)) {
        return false
      }

      const completedLevelIds = addCompletedLevel(
        levelId,
        save.completedLevelIds,
      )
      if (completedLevelIds === save.completedLevelIds) return true

      replaceSave({
        ...save,
        completedLevelIds,
        lastVisitedLevelId: getCurrentLevelId(completedLevelIds),
      })
      return true
    },
    [replaceSave, save],
  )

  const resetProgress = useCallback(() => {
    removeSave()
    setSave(createDefaultSave())
  }, [])

  const value = useMemo<GameContextValue>(
    () => ({
      save,
      completedCount: save.completedLevelIds.length,
      currentLevelId: getCurrentLevelId(save.completedLevelIds),
      unlockedModuleIds: getUnlockedModuleIds(save.completedLevelIds),
      markIntroSeen,
      visitLevel,
      completeLevel,
      isCompleted: (levelId) => save.completedLevelIds.includes(levelId),
      isUnlocked: (levelId) =>
        save.introSeen && isLevelUnlocked(levelId, save.completedLevelIds),
      resetProgress,
    }),
    [completeLevel, markIntroSeen, resetProgress, save, visitLevel],
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame 必须在 GameProvider 中使用')
  }
  return context
}
