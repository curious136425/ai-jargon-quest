import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { FinaleAssembler } from '../components/FinaleAssembler'
import { ProgressHeader } from '../components/ProgressHeader'
import { RewardPanel } from '../components/RewardPanel'
import { Xiaoyao } from '../components/Xiaoyao'
import { InteractionRenderer } from '../components/interactions/InteractionRenderer'
import { levelById, levels } from '../data/levels'
import { useGame } from '../state/GameContext'
import { getNextLevelId } from '../state/progression'
import type { ConceptLevel } from '../types/game'

export function LevelPage() {
  const { levelId } = useParams()
  const navigate = useNavigate()
  const {
    save,
    isUnlocked,
    isCompleted,
    completeLevel,
    visitLevel,
  } = useGame()
  const level = levelId ? levelById.get(levelId) : undefined
  const [showReward, setShowReward] = useState(false)
  const completedAtEntry = useRef(level ? isCompleted(level.id) : false).current

  useEffect(() => {
    if (level && save.introSeen && isUnlocked(level.id)) {
      visitLevel(level.id)
    }
  }, [isUnlocked, level, save.introSeen, visitLevel])

  if (!save.introSeen) return <Navigate to="/intro" replace />

  if (!level) {
    return (
      <main className="not-found-page page">
        <div className="pixel-card empty-state">
          <span className="empty-state__icon" aria-hidden="true">❓</span>
          <h1>没有找到这一关</h1>
          <p>关卡编号可能写错了，地图上的道路仍然安全。</p>
          <Link className="pixel-button pixel-button--primary" to="/map">返回地图</Link>
        </div>
      </main>
    )
  }

  if (!isUnlocked(level.id)) {
    return (
      <main className="locked-page page">
        <div className="pixel-card empty-state">
          <span className="empty-state__icon" aria-hidden="true">🔒</span>
          <h1>这条路还没有解锁</h1>
          <p>先完成前一关，小妖才能带着刚学会的能力继续前进。</p>
          <Link className="pixel-button pixel-button--primary" to="/map">查看当前关卡</Link>
        </div>
      </main>
    )
  }

  const handleSuccess = () => {
    completeLevel(level.id)
    if (level.kind === 'concept') setShowReward(true)
  }

  const nextLevelId = getNextLevelId(level.id)
  const zoneEnds =
    nextLevelId &&
    levelById.get(nextLevelId)?.zoneId !== level.zoneId

  const goNext = () => {
    if (!nextLevelId) {
      navigate('/map')
      return
    }
    if (zoneEnds && level.order !== 15) {
      navigate('/map')
      return
    }
    navigate(`/level/${nextLevelId}`)
  }

  const lessonCards = (
    <>
      <section className="story-card story-card--problem">
        <div className="story-card__speaker">
          <Xiaoyao className="xiaoyao--speaker" />
          <span>小妖遇到了麻烦</span>
        </div>
        <p>{level.problem}</p>
      </section>

      <section className="explanation-stack">
        <article className="lesson-card lesson-card--simple">
          <span className="lesson-card__label">一句话说明</span>
          <p>{level.simpleExplanation}</p>
        </article>
        <article className="lesson-card lesson-card--precise">
          <span className="lesson-card__label">再准确一点</span>
          <p>{level.accurateExplanation}</p>
        </article>
        <article className="lesson-card lesson-card--story">
          <span className="lesson-card__label">小妖怎么用</span>
          {level.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </article>
        <article className="lesson-card lesson-card--analogy">
          <span className="lesson-card__label">生活里像什么</span>
          <p>{level.analogy}</p>
        </article>
        <article className="lesson-card lesson-card--confusion">
          <span className="lesson-card__label">别混淆</span>
          <p>{level.confusion}</p>
        </article>
      </section>
    </>
  )

  return (
    <main className={`level-page page zone-${level.zoneId}`}>
      <nav className="level-nav" aria-label="关卡导航">
        <Link to="/map" className="back-link" aria-label="返回闯关地图">‹ 地图</Link>
        <span>{level.zoneName}</span>
        <span>{String(level.order).padStart(2, '0')} / {levels.length}</span>
      </nav>
      <ProgressHeader compact />

      <header className="level-title-block">
        <span className="level-number">第 {level.order} 关</span>
        <h1>{level.name}</h1>
        <div className="level-title-meta">
          <strong>{level.zhName}</strong>
          <span>{level.termKindLabel}</span>
        </div>
      </header>

      {lessonCards}

      {level.kind === 'concept' ? (
        <section className="interaction-card" aria-labelledby="challenge-title">
          <span className="challenge-kicker">小妖的试炼</span>
          <h2 id="challenge-title">用刚学会的能力解决它</h2>
          <InteractionRenderer
            key={level.id}
            interaction={level.interaction}
            onSuccess={handleSuccess}
          />
        </section>
      ) : (
        <section className="finale-card" aria-labelledby="assembly-title">
          <span className="challenge-kicker">最终组装</span>
          <h2 id="assembly-title">点亮小妖的 AI 工作台</h2>
          <p>{level.prompt}</p>
          <FinaleAssembler
            level={level}
            alreadyCompleted={completedAtEntry}
            onComplete={handleSuccess}
          />
        </section>
      )}

      {level.kind === 'concept' && showReward && (
        <RewardPanel
          level={level as ConceptLevel}
          review={completedAtEntry}
          nextLabel={zoneEnds && level.order !== 15 ? '进入新区域' : '下一关'}
          onNext={goNext}
          onMap={() => navigate('/map')}
        />
      )}

      {level.kind === 'finale' && isCompleted(level.id) && (
        <div className="finale-return">
          <Link className="pixel-button pixel-button--primary" to="/map">回到完整地图</Link>
        </div>
      )}
    </main>
  )
}
