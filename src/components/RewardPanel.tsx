import type { ConceptLevel } from '../types/game'

interface RewardPanelProps {
  level: ConceptLevel
  review: boolean
  nextLabel: string
  onNext: () => void
  onMap: () => void
}

export function RewardPanel({
  level,
  review,
  nextLabel,
  onNext,
  onMap,
}: RewardPanelProps) {
  return (
    <section className="reward-panel" aria-labelledby="reward-title" role="status">
      <div className="reward-sparkles" aria-hidden="true">
        <span>✦</span><span>✧</span><span>✦</span>
      </div>
      <span className="reward-kicker">
        {review ? '复习完成' : 'AI 认知 +1'}
      </span>
      <h2 id="reward-title">
        {level.abilityCard.icon} 获得「{level.abilityCard.name}」能力卡
      </h2>
      <p>{level.abilityCard.description}</p>

      {level.workbenchReward && !review && (
        <div className="module-unlock">
          <span aria-hidden="true">{level.workbenchReward.icon}</span>
          <div>
            <strong>工作台模块已解锁</strong>
            <p>{level.workbenchReward.name}</p>
          </div>
        </div>
      )}

      <div className="reward-actions">
        <button className="pixel-button pixel-button--primary" type="button" onClick={onNext}>
          {nextLabel}
          <span aria-hidden="true">▶</span>
        </button>
        <button className="text-button" type="button" onClick={onMap}>
          回到地图
        </button>
      </div>
    </section>
  )
}
