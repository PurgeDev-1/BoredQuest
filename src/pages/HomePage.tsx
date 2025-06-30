import { Link } from 'react-router-dom'
import { useGameStore } from '../stores/gameStore'
import { motion } from 'framer-motion'

const HomePage = () => {
  const { isAuthenticated } = useGameStore()

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl font-fantasy text-fantasy-gold mb-6 text-shadow">
            RealmQuest
          </h1>
          <p className="text-2xl text-gray-300 mb-8 font-game">
            Embark on epic adventures in a mystical realm filled with magic, monsters, and treasures
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          <div className="game-card">
            <h3 className="text-xl font-fantasy text-fantasy-gold mb-4">Real-time Multiplayer</h3>
            <p className="text-gray-300">Play with friends and other adventurers in real-time combat and exploration</p>
          </div>
          
          <div className="game-card">
            <h3 className="text-xl font-fantasy text-fantasy-gold mb-4">Character Progression</h3>
            <p className="text-gray-300">Level up, gain skills, and become more powerful through epic battles</p>
          </div>
          
          <div className="game-card">
            <h3 className="text-xl font-fantasy text-fantasy-gold mb-4">Dungeon Crawling</h3>
            <p className="text-gray-300">Explore procedurally generated dungeons with unique challenges and rewards</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-x-4"
        >
          {isAuthenticated ? (
            <Link to="/game" className="game-button inline-block">
              Enter the Realm
            </Link>
          ) : (
            <>
              <Link to="/login" className="game-button inline-block">
                Login
              </Link>
              <Link to="/register" className="game-button-secondary inline-block">
                Register
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage 