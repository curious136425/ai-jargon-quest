import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="not-found-page page">
      <div className="pixel-card empty-state">
        <span className="empty-state__icon" aria-hidden="true">
          🗺️
        </span>
        <h1>这条路还没画出来</h1>
        <p>地址可能写错了，回到闯关地图继续找路吧。</p>
        <Link className="pixel-button pixel-button--primary" to="/map">
          返回地图
        </Link>
      </div>
    </main>
  )
}
