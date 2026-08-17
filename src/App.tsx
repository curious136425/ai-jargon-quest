import { useEffect } from 'react'
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom'
import { IntroPage } from './pages/IntroPage'
import { LevelPage } from './pages/LevelPage'
import { MapPage } from './pages/MapPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { useGame } from './state/GameContext'

function RootRedirect() {
  const { save } = useGame()
  return <Navigate to={save.introSeen ? '/map' : '/intro'} replace />
}

function LevelRoute() {
  const { levelId } = useParams()
  return <LevelPage key={levelId} />
}

function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== '/map') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [location.pathname])

  return null
}

export default function App() {
  return (
    <div className="app-shell">
      <ScrollManager />
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/level/:levelId" element={<LevelRoute />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}
