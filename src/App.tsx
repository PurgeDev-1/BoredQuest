import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useGameStore } from './stores/gameStore'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LoadingScreen from './components/LoadingScreen'

function App() {
  const { isLoading, initializeGame } = useGameStore()

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="game" element={<GamePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App 