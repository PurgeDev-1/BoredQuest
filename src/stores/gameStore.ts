import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import React from 'react'

export interface Player {
  id: string
  username: string
  level: number
  experience: number
  health: number
  maxHealth: number
  mana: number
  maxMana: number
  gold: number
  class: 'warrior' | 'mage' | 'archer' | 'priest'
  inventory: Item[]
  equipment: Equipment
  skills: Skill[]
  location: string
  guild?: string
}

export interface Item {
  id: string
  name: string
  type: 'weapon' | 'armor' | 'consumable' | 'material' | 'quest'
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  level: number
  value: number
  description: string
  icon: string
  stackable: boolean
  quantity?: number
}

export interface Equipment {
  weapon?: Item
  helmet?: Item
  chestplate?: Item
  gloves?: Item
  boots?: Item
  ring1?: Item
  ring2?: Item
  amulet?: Item
}

export interface Skill {
  id: string
  name: string
  description: string
  level: number
  maxLevel: number
  cooldown: number
  manaCost: number
  damage: number
  type: 'attack' | 'heal' | 'buff' | 'debuff'
}

export interface GameState {
  // Game state
  isLoading: boolean
  isAuthenticated: boolean
  player: Player | null
  
  // UI state
  currentTab: 'character' | 'inventory' | 'skills' | 'quests' | 'guild' | 'market' | 'chat'
  showModal: boolean
  modalContent: React.ReactNode | null
  
  // Game actions
  initializeGame: () => void
  login: (username: string, password: string) => Promise<boolean>
  register: (username: string, password: string, email: string) => Promise<boolean>
  logout: () => void
  updatePlayer: (updates: Partial<Player>) => void
  addItem: (item: Item) => void
  removeItem: (itemId: string, quantity?: number) => void
  equipItem: (item: Item, slot: keyof Equipment) => void
  unequipItem: (slot: keyof Equipment) => void
  setCurrentTab: (tab: GameState['currentTab']) => void
  openModal: (content: React.ReactNode) => void
  closeModal: () => void
}

const createInitialPlayer = (username: string, playerClass: Player['class']): Player => ({
  id: crypto.randomUUID(),
  username,
  level: 1,
  experience: 0,
  health: 100,
  maxHealth: 100,
  mana: 50,
  maxMana: 50,
  gold: 100,
  class: playerClass,
  inventory: [],
  equipment: {},
  skills: [],
  location: 'town-square',
})

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial state
      isLoading: true,
      isAuthenticated: false,
      player: null,
      currentTab: 'character',
      showModal: false,
      modalContent: null,

      // Actions
      initializeGame: () => {
        // Simulate loading time
        setTimeout(() => {
          set({ isLoading: false })
        }, 2000)
      },

      login: async (username: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // For demo purposes, accept any login
        const player = createInitialPlayer(username, 'warrior')
        set({ 
          isAuthenticated: true, 
          player,
          isLoading: false 
        })
        return true
      },

      register: async (username: string, password: string, email: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const player = createInitialPlayer(username, 'warrior')
        set({ 
          isAuthenticated: true, 
          player,
          isLoading: false 
        })
        return true
      },

      logout: () => {
        set({ 
          isAuthenticated: false, 
          player: null,
          currentTab: 'character',
          showModal: false,
          modalContent: null
        })
      },

      updatePlayer: (updates: Partial<Player>) => {
        const { player } = get()
        if (player) {
          set({ player: { ...player, ...updates } })
        }
      },

      addItem: (item: Item) => {
        const { player } = get()
        if (player) {
          const existingItem = player.inventory.find(i => i.id === item.id)
          if (existingItem && item.stackable) {
            const updatedInventory = player.inventory.map(i => 
              i.id === item.id 
                ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) }
                : i
            )
            set({ player: { ...player, inventory: updatedInventory } })
          } else {
            set({ 
              player: { 
                ...player, 
                inventory: [...player.inventory, { ...item, quantity: item.quantity || 1 }] 
              } 
            })
          }
        }
      },

      removeItem: (itemId: string, quantity = 1) => {
        const { player } = get()
        if (player) {
          const updatedInventory = player.inventory
            .map(item => {
              if (item.id === itemId) {
                const newQuantity = (item.quantity || 1) - quantity
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : null
              }
              return item
            })
            .filter(Boolean) as Item[]
          
          set({ player: { ...player, inventory: updatedInventory } })
        }
      },

      equipItem: (item: Item, slot: keyof Equipment) => {
        const { player } = get()
        if (player) {
          const updatedEquipment = { ...player.equipment, [slot]: item }
          const updatedInventory = player.inventory.filter(i => i.id !== item.id)
          set({ 
            player: { 
              ...player, 
              equipment: updatedEquipment,
              inventory: updatedInventory
            } 
          })
        }
      },

      unequipItem: (slot: keyof Equipment) => {
        const { player } = get()
        if (player && player.equipment[slot]) {
          const item = player.equipment[slot]!
          const updatedEquipment = { ...player.equipment }
          delete updatedEquipment[slot]
          set({ 
            player: { 
              ...player, 
              equipment: updatedEquipment,
              inventory: [...player.inventory, item]
            } 
          })
        }
      },

      setCurrentTab: (tab: GameState['currentTab']) => {
        set({ currentTab: tab })
      },

      openModal: (content: React.ReactNode) => {
        set({ showModal: true, modalContent: content })
      },

      closeModal: () => {
        set({ showModal: false, modalContent: null })
      },
    }),
    {
      name: 'realmquest-storage',
      partialize: (state) => ({ 
        isAuthenticated: state.isAuthenticated,
        player: state.player 
      }),
    }
  )
) 