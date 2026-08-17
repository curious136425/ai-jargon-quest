import { levels } from '../data/levels'
import { useGame } from '../state/GameContext'

interface ProgressHeaderProps {
  compact?: boolean
  onReset?: () => void
}

export function ProgressHeader({
  compact = false,
  onReset,
}: ProgressHeaderProps) {
  const { completedCount, unlockedModuleIds } = useGame()
  const total = levels.length

  return (
    <header className={`progress-panel ${compact ? 'progress-panel--compact' : ''}`}>
      <div className="progress-panel__topline">
        <div>
          <span className="eyebrow">AI 成长等级</span>
          <strong className="progress-count">
            {completedCount} <span aria-hidden="true">/</span>{' '}
            <span className="sr-only">共</span>{total}
          </strong>
        </div>
        {!compact && (
          <div className="progress-panel__actions">
            <span className="module-count">
              工作台 {unlockedModuleIds.length}/5
            </span>
            {onReset && (
              <button className="text-button" type="button" onClick={onReset}>
                重新开始
              </button>
            )}
          </div>
        )}
      </div>
      <div
        className="segmented-progress"
        role="progressbar"
        aria-label="第一章通关进度"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={completedCount}
      >
        {levels.map((level) => (
          <span
            key={level.id}
            className={
              completedCount >= level.order
                ? 'progress-segment progress-segment--done'
                : 'progress-segment'
            }
            aria-hidden="true"
          />
        ))}
      </div>
    </header>
  )
}
