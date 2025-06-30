import { useGameStore } from '../stores/gameStore'
import { Navigate } from 'react-router-dom'

const GamePage = () => {
  const { isAuthenticated, player, currentTab, setCurrentTab } = useGameStore()

  if (!isAuthenticated || !player) {
    return <Navigate to="/login" replace />
  }

  const tabs = [
    { id: 'character', label: 'Character' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'skills', label: 'Skills' },
    { id: 'quests', label: 'Quests' },
    { id: 'guild', label: 'Guild' },
    { id: 'market', label: 'Market' },
    { id: 'chat', label: 'Chat' },
  ] as const

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Character Info Bar */}
        <div className="game-card mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-fantasy text-fantasy-gold">
                {player.username} - Level {player.level}
              </h2>
              <p className="text-gray-300">Class: {player.class}</p>
            </div>
            <div className="text-right">
              <p className="text-fantasy-gold font-bold">{player.gold} Gold</p>
              <p className="text-gray-300">Location: {player.location}</p>
            </div>
          </div>
          
          {/* Health and Mana Bars */}
          <div className="mt-4 space-y-2">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Health</span>
                <span>{player.health}/{player.maxHealth}</span>
              </div>
              <div className="health-bar">
                <div 
                  className="health-bar-fill"
                  style={{ width: `${(player.health / player.maxHealth) * 100}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Mana</span>
                <span>{player.mana}/{player.maxMana}</span>
              </div>
              <div className="mana-bar">
                <div 
                  className="mana-bar-fill"
                  style={{ width: `${(player.mana / player.maxMana) * 100}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Experience</span>
                <span>{player.experience} XP</span>
              </div>
              <div className="experience-bar">
                <div 
                  className="experience-bar-fill"
                  style={{ width: `${(player.experience % 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-game transition-colors ${
                currentTab === tab.id
                  ? 'bg-fantasy-gold text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="game-card">
          {currentTab === 'character' && (
            <div>
              <h3 className="text-xl font-fantasy text-fantasy-gold mb-4">Character Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-gray-300">Level</p>
                  <p className="text-2xl font-bold text-fantasy-gold">{player.level}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-300">Health</p>
                  <p className="text-2xl font-bold text-green-500">{player.maxHealth}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-300">Mana</p>
                  <p className="text-2xl font-bold text-blue-500">{player.maxMana}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-300">Gold</p>
                  <p className="text-2xl font-bold text-fantasy-gold">{player.gold}</p>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'inventory' && (
            <div>
              <h3 className="text-xl font-fantasy text-fantasy-gold mb-4">Inventory</h3>
              {player.inventory.length === 0 ? (
                <p className="text-gray-400">Your inventory is empty.</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {player.inventory.map((item) => (
                    <div key={item.id} className="inventory-slot inventory-slot-filled">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-gray-600 rounded mx-auto mb-2"></div>
                        <p className="text-sm font-bold">{item.name}</p>
                        {item.quantity && item.quantity > 1 && (
                          <p className="text-xs text-gray-400">x{item.quantity}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentTab === 'skills' && (
            <div>
              <h3 className="text-xl font-fantasy text-fantasy-gold mb-4">Skills</h3>
              {player.skills.length === 0 ? (
                <p className="text-gray-400">You haven't learned any skills yet.</p>
              ) : (
                <div className="space-y-2">
                  {player.skills.map((skill) => (
                    <div key={skill.id} className="bg-gray-700 rounded-lg p-3">
                      <h4 className="font-bold">{skill.name}</h4>
                      <p className="text-sm text-gray-300">{skill.description}</p>
                      <p className="text-xs text-gray-400">Level {skill.level}/{skill.maxLevel}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentTab === 'quests' && (
            <div>
              <h3 className="text-xl font-fantasy text-fantasy-gold mb-4">Quests</h3>
              <p className="text-gray-400">No active quests available.</p>
            </div>
          )}

          {currentTab === 'guild' && (
            <div>
              <h3 className="text-xl font-fantasy text-fantasy-gold mb-4">Guild</h3>
              {player.guild ? (
                <p className="text-gray-300">You are a member of {player.guild}.</p>
              ) : (
                <p className="text-gray-400">You are not in a guild.</p>
              )}
            </div>
          )}

          {currentTab === 'market' && (
            <div>
              <h3 className="text-xl font-fantasy text-fantasy-gold mb-4">Market</h3>
              <p className="text-gray-400">Market is currently closed.</p>
            </div>
          )}

          {currentTab === 'chat' && (
            <div>
              <h3 className="text-xl font-fantasy text-fantasy-gold mb-4">Chat</h3>
              <div className="bg-gray-700 rounded-lg p-4 h-64 overflow-y-auto">
                <p className="text-gray-400">Welcome to RealmQuest! Chat will be available soon.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GamePage 