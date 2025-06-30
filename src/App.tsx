import { useState } from 'react'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username && password) {
      setIsLoggedIn(true)
      setCurrentPage('game')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentPage('home')
    setUsername('')
    setPassword('')
  }

  if (currentPage === 'home') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-7xl font-bold text-yellow-500 mb-6">
            RealmQuest
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Embark on epic adventures in a mystical realm filled with magic, monsters, and treasures
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-bold text-yellow-500 mb-4">Real-time Multiplayer</h3>
              <p className="text-gray-300">Play with friends and other adventurers in real-time combat and exploration</p>
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-bold text-yellow-500 mb-4">Character Progression</h3>
              <p className="text-gray-300">Level up, gain skills, and become more powerful through epic battles</p>
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-bold text-yellow-500 mb-4">Dungeon Crawling</h3>
              <p className="text-gray-300">Explore procedurally generated dungeons with unique challenges and rewards</p>
            </div>
          </div>

          <div className="space-x-4">
            {isLoggedIn ? (
              <button 
                onClick={() => setCurrentPage('game')}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-2 px-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
              >
                Enter the Realm
              </button>
            ) : (
              <>
                <button 
                  onClick={() => setCurrentPage('login')}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-2 px-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
                >
                  Login
                </button>
                <button 
                  onClick={() => setCurrentPage('register')}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:from-gray-500 hover:to-gray-600 transition-all duration-300"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (currentPage === 'login') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-md w-full">
          <h2 className="text-3xl font-bold text-yellow-500 mb-6 text-center">
            Login to RealmQuest
          </h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-yellow-500 focus:outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-yellow-500 focus:outline-none"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-2 px-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
            >
              Login
            </button>
          </form>
          
          <button 
            onClick={() => setCurrentPage('home')}
            className="w-full mt-4 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-500 transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  if (currentPage === 'register') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-md w-full">
          <h2 className="text-3xl font-bold text-yellow-500 mb-6 text-center">
            Join RealmQuest
          </h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-yellow-500 focus:outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-yellow-500 focus:outline-none"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-2 px-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
            >
              Create Account
            </button>
          </form>
          
          <button 
            onClick={() => setCurrentPage('home')}
            className="w-full mt-4 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-500 transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  if (currentPage === 'game') {
    return (
      <div className="min-h-screen bg-gray-900">
        <header className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-bold text-yellow-500">
                RealmQuest
              </h1>
              <button
                onClick={handleLogout}
                className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-500 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">
              Welcome, {username}!
            </h2>
            <p className="text-gray-300 mb-4">You are now in the mystical realm of RealmQuest.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-gray-300">Level</p>
                <p className="text-2xl font-bold text-yellow-500">1</p>
              </div>
              <div className="text-center">
                <p className="text-gray-300">Health</p>
                <p className="text-2xl font-bold text-green-500">100</p>
              </div>
              <div className="text-center">
                <p className="text-gray-300">Mana</p>
                <p className="text-2xl font-bold text-blue-500">50</p>
              </div>
              <div className="text-center">
                <p className="text-gray-300">Gold</p>
                <p className="text-2xl font-bold text-yellow-500">100</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-yellow-500 mb-4">Game Features Coming Soon</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Real-time multiplayer combat</li>
              <li>• Character progression and leveling</li>
              <li>• Dungeon exploration</li>
              <li>• Item collection and crafting</li>
              <li>• Guild system</li>
              <li>• Trading with other players</li>
            </ul>
          </div>
        </main>
      </div>
    )
  }

  return null
}

export default App 