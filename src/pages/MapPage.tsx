import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ProgressHeader } from '../components/ProgressHeader'
import { ResetDialog } from '../components/ResetDialog'
import { Xiaoyao } from '../components/Xiaoyao'
import { levels } from '../data/levels'
import { getZone, zones } from '../data/chapters'
import { useGame } from '../state/GameContext'

export function MapPage() {
  const navigate = useNavigate()
  const {
    save,
    currentLevelId,
    completedCount,
    unlockedModuleIds,
    isCompleted,
    isUnlocked,
    resetProgress,
  } = useGame()
  const [resetOpen, setResetOpen] = useState(false)
  const [lockedMessage, setLockedMessage] = useState('')
  const currentRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!save.introSeen) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.setTimeout(() => {
      currentRef.current?.scrollIntoView({
        block: 'center',
        behavior: reducedMotion ? 'auto' : 'smooth',
      })
    }, 80)
  }, [currentLevelId, save.introSeen])

  if (!save.introSeen) return <Navigate to="/intro" replace />

  const openLevel = (levelId: string, order: number) => {
    if (!isUnlocked(levelId)) {
      setLockedMessage(`先完成第 ${String(order - 1).padStart(2, '0')} 关，前方的路才会亮起。`)
      return
    }
    navigate(`/level/${levelId}`)
  }

  const confirmReset = () => {
    resetProgress()
    setResetOpen(false)
    navigate('/intro', { replace: true })
  }

  return (
    <main className="map-page page">
      <ProgressHeader onReset={() => setResetOpen(true)} />

      <header className="map-intro">
        <span className="chapter-kicker">CHAPTER 01</span>
        <h1>小妖的成长路线</h1>
        <p>从会聊天出发，把十五种能力装进自己的 AI 学习工作台。</p>
      </header>

      <section className="workbench-preview" aria-label="已解锁的工作台模块">
        <div>
          <span className="eyebrow">工作台建造进度</span>
          <strong>{unlockedModuleIds.length} / 5 个模块</strong>
        </div>
        <div className="module-dots">
          {['💬', '📚', '⚙️', '🤖', '🔌'].map((icon, index) => (
            <span
              key={icon}
              className={index < unlockedModuleIds.length ? 'module-dot module-dot--on' : 'module-dot'}
              aria-label={index < unlockedModuleIds.length ? `模块 ${index + 1} 已解锁` : `模块 ${index + 1} 未解锁`}
            >
              {index < unlockedModuleIds.length ? icon : '◇'}
            </span>
          ))}
        </div>
      </section>

      {lockedMessage && (
        <p className="map-toast" role="status" aria-live="polite">
          🔒 {lockedMessage}
          <button type="button" aria-label="关闭提示" onClick={() => setLockedMessage('')}>×</button>
        </p>
      )}

      <section className="adventure-map" aria-label="第一章闯关地图">
        {zones.map((zone) => {
          const zoneLevels = levels.filter((level) => level.zoneId === zone.id)
          return (
            <section key={zone.id} className={`map-zone map-zone--${zone.id}`} aria-labelledby={`zone-${zone.id}`}>
              <header className="zone-banner" id={`zone-${zone.id}`}>
                <span aria-hidden="true">{zone.icon}</span>
                <div>
                  <h2>{zone.name}</h2>
                  <p>{zone.subtitle}</p>
                </div>
              </header>

              <div className="zone-road">
                {zoneLevels.map((level, index) => {
                  const completed = isCompleted(level.id)
                  const current = level.id === currentLevelId
                  const unlocked = isUnlocked(level.id)
                  const state = completed ? 'completed' : current ? 'current' : unlocked ? 'unlocked' : 'locked'
                  const side = level.order === 16 ? 'center' : index % 2 === 0 ? 'left' : 'right'
                  const zoneInfo = getZone(level.zoneId)

                  return (
                    <div key={level.id} className={`map-stop map-stop--${side} map-stop--${state}`}>
                      {current && (
                        <div className="player-marker" aria-label="小妖当前在这里">
                          <Xiaoyao className="xiaoyao--marker" />
                          <span>小妖在这里</span>
                        </div>
                      )}
                      <button
                        ref={current ? currentRef : undefined}
                        type="button"
                        className="level-node"
                        aria-current={current ? 'step' : undefined}
                        aria-disabled={!unlocked}
                        onClick={() => openLevel(level.id, level.order)}
                      >
                        <span className="node-core">
                          {completed ? '✓' : state === 'locked' ? '🔒' : String(level.order).padStart(2, '0')}
                        </span>
                        <span className="node-copy">
                          <strong>{level.name}</strong>
                          <small>{level.zhName}</small>
                          <em>
                            {completed ? '已掌握' : current ? '当前关卡' : unlocked ? '可挑战' : '未解锁'}
                          </em>
                        </span>
                      </button>
                      {index < zoneLevels.length - 1 && (
                        <div className={completed ? 'road-segment road-segment--done' : 'road-segment'} aria-hidden="true">
                          <i /><i /><i />
                        </div>
                      )}
                      <span className="zone-sr sr-only">{zoneInfo?.name}</span>
                    </div>
                  )
                })}
              </div>
            </section>
          )
        })}
      </section>

      <footer className="map-footer">
        <p>{completedCount === levels.length ? '第一章已经完整点亮。小妖随时可以回来复习。' : '道路会随着通关逐段亮起。已经掌握的关卡可以反复查看。'}</p>
      </footer>

      <ResetDialog
        open={resetOpen}
        onCancel={() => setResetOpen(false)}
        onConfirm={confirmReset}
      />
    </main>
  )
}
