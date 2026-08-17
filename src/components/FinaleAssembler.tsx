import { useMemo, useState } from 'react'
import type { FinaleLevel, ModuleId } from '../types/game'
import { Xiaoyao } from './Xiaoyao'

interface FinaleAssemblerProps {
  level: FinaleLevel
  alreadyCompleted: boolean
  onComplete: () => void
}

export function FinaleAssembler({
  level,
  alreadyCompleted,
  onComplete,
}: FinaleAssemblerProps) {
  const [installedIds, setInstalledIds] = useState<ModuleId[]>(
    alreadyCompleted ? level.modules.map((module) => module.id) : [],
  )
  const [feedback, setFeedback] = useState(
    alreadyCompleted ? '五个模块已经全部接通。' : '',
  )
  const complete = installedIds.length === level.modules.length

  const installedSet = useMemo(() => new Set(installedIds), [installedIds])

  const install = (moduleId: ModuleId) => {
    if (installedSet.has(moduleId)) return

    const module = level.modules.find((item) => item.id === moduleId)
    if (!module) return

    const next = [...installedIds, moduleId]
    setInstalledIds(next)
    setFeedback(module.installFeedback)
    if (next.length === level.modules.length) {
      onComplete()
    }
  }

  return (
    <section className={complete ? 'finale-assembler finale-assembler--complete' : 'finale-assembler'}>
      <div className="workbench-machine" aria-label={`已安装 ${installedIds.length} 个工作台模块`}>
        <div className="machine-screen">
          <span aria-hidden="true">AI</span>
          <small>{complete ? 'ONLINE' : 'BUILDING'}</small>
        </div>
        <div className="machine-slots">
          {level.modules.map((module) => {
            const installed = installedSet.has(module.id)
            return (
              <div key={module.id} className={installed ? 'machine-slot machine-slot--installed' : 'machine-slot'}>
                <span aria-hidden="true">{installed ? module.icon : '◇'}</span>
                <small>{module.name}</small>
              </div>
            )
          })}
        </div>
        <div className="machine-lights" aria-hidden="true">
          {level.modules.map((module) => (
            <span key={module.id} className={installedSet.has(module.id) ? 'light light--on' : 'light'} />
          ))}
        </div>
      </div>

      <div className="module-install-list">
        {level.modules.map((module, index) => {
          const installed = installedSet.has(module.id)
          const recommended = index === installedIds.length && !installed
          return (
            <button
              key={module.id}
              className={`${installed ? 'module-install module-install--installed' : 'module-install'}${recommended ? ' module-install--recommended' : ''}`}
              type="button"
              disabled={installed}
              onClick={() => install(module.id)}
            >
              <span className="module-install__icon" aria-hidden="true">{module.icon}</span>
              <span>
                <strong>{module.name}</strong>
                <small>{module.description}</small>
              </span>
              <span className="module-install__state">
                {installed ? '已安装 ✓' : '点击安装'}
              </span>
            </button>
          )
        })}
      </div>

      {feedback && <p className="assembly-feedback" role="status" aria-live="polite">{feedback}</p>}

      {complete && (
        <section className="completion-story" aria-labelledby="completion-title">
          <div className="pixel-confetti" aria-hidden="true">
            {Array.from({ length: 16 }, (_, index) => <i key={index} />)}
          </div>
          <Xiaoyao className="xiaoyao--complete" />
          <p className="completion-kicker">🎉 第一章完成</p>
          <h2 id="completion-title">{level.completionTitle}</h2>
          <div className="ending-copy">
            {level.ending.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="graduation-badge">
            <span aria-hidden="true">🏆</span>
            <small>获得称号</small>
            <strong>{level.badge}</strong>
          </div>
          <div className="coming-soon-grid">
            {level.comingSoon.map((chapter) => (
              <article key={chapter.id} className="coming-soon-card">
                <span>敬请期待</span>
                <h3>{chapter.name}</h3>
                <p>{chapter.description}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </section>
  )
}
