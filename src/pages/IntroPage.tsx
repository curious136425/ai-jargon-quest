import { Navigate, useNavigate } from 'react-router-dom'
import { Xiaoyao } from '../components/Xiaoyao'
import { useGame } from '../state/GameContext'

const floatingTerms = [
  { label: 'MODEL', top: '8%', left: '5%', delay: '-0.3s' },
  { label: 'PROMPT', top: '17%', left: '71%', delay: '-1.2s' },
  { label: 'TOKEN', top: '31%', left: '7%', delay: '-2.1s' },
  { label: 'RAG', top: '42%', left: '78%', delay: '-0.8s' },
  { label: 'AGENT', top: '58%', left: '4%', delay: '-2.8s' },
  { label: 'API', top: '70%', left: '82%', delay: '-1.7s' },
  { label: 'MCP', top: '84%', left: '10%', delay: '-3.4s' },
]

export function IntroPage() {
  const navigate = useNavigate()
  const { save, markIntroSeen } = useGame()

  if (save.introSeen) return <Navigate to="/map" replace />

  const startGame = () => {
    markIntroSeen()
    navigate('/map')
  }

  return (
    <main className="intro-page page">
      <div className="pixel-stars" aria-hidden="true" />
      <div className="floating-terms" aria-hidden="true">
        {floatingTerms.map((term) => (
          <span
            key={term.label}
            style={{ top: term.top, left: term.left, animationDelay: term.delay }}
          >
            {term.label}
          </span>
        ))}
      </div>

      <section className="intro-hero" aria-labelledby="game-title">
        <div className="chapter-kicker">CHAPTER 01</div>
        <h1 id="game-title">
          <span>AI 黑话世界</span>
          <small>小妖的学习工作台</small>
        </h1>
        <div className="intro-character-wrap">
          <span className="intro-glow" aria-hidden="true" />
          <Xiaoyao className="xiaoyao--intro" eager />
        </div>
      </section>

      <section className="story-scroll" aria-label="开场剧情">
        <p>小妖第一次打开 ChatGPT 时，以为 AI 就是一个会聊天的机器人。</p>
        <p>后来，Model、Prompt、Token、Agent、API、MCP 陆续出现在她眼前。</p>
        <p>她决定进入 AI 世界，把这些陌生词一个个弄明白。</p>
        <p className="story-scroll__goal">
          每学会一个词，她就给自己的 AI 学习工作台添上一项能力。
        </p>
      </section>

      <button className="pixel-button pixel-button--primary start-button" type="button" onClick={startGame}>
        <span>开始闯关</span>
        <span aria-hidden="true">▶</span>
      </button>
      <p className="save-note">进度会自动保存在这个浏览器里</p>
    </main>
  )
}
