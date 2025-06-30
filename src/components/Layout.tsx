import { Outlet } from 'react-router-dom'
import { useGameStore } from '../stores/gameStore'

const Layout = () => {
  const { isAuthenticated, logout } = useGameStore()

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-fantasy text-fantasy-gold">
                RealmQuest
              </h1>
            </div>
            
            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={logout}
                  className="game-button-secondary"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout 