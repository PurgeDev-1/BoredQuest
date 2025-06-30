import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../stores/gameStore'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useGameStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const success = await register(username, password, email)
      if (success) {
        navigate('/game')
      }
    } catch (error) {
      console.error('Registration failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="game-card max-w-md w-full">
        <h2 className="text-3xl font-fantasy text-fantasy-gold mb-6 text-center">
          Join RealmQuest
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-fantasy-gold focus:outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-fantasy-gold focus:outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-fantasy-gold focus:outline-none"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full game-button disabled:opacity-50"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage 