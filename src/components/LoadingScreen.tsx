import { motion } from 'framer-motion'
import { Sword, Shield, Zap, Heart } from 'lucide-react'

const LoadingScreen = () => {
  const icons = [Sword, Shield, Zap, Heart]
  
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-6xl font-fantasy text-fantasy-gold mb-4 text-shadow">
            RealmQuest
          </h1>
          <p className="text-xl text-gray-300 font-game">
            Loading your adventure...
          </p>
        </motion.div>
        
        <div className="flex justify-center space-x-4 mb-8">
          {icons.map((Icon, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="text-fantasy-gold"
            >
              <Icon size={32} />
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="h-2 bg-gradient-to-r from-fantasy-gold to-fantasy-bronze rounded-full max-w-md mx-auto"
        />
      </div>
    </div>
  )
}

export default LoadingScreen 