# BoredQuest 🎮

A retro-style pixel art MMORPG built with modern web technologies. Embark on 8-bit adventures in a world filled with pixelated magic, monsters, and treasures!

![BoredQuest](https://img.shields.io/badge/BoredQuest-Pixel%20Art%20MMORPG-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Status](https://img.shields.io/badge/status-Development-orange)

## 🚀 Live Demo

Play BoredQuest now: [https://purgedev-1.github.io/RealmQuest/](https://purgedev-1.github.io/RealmQuest/)

## ☁️ Cloud Save Setup

BoredQuest features **encrypted cloud save** using GitHub's API! Your progress is automatically saved to the GitHub repository and synced across all devices.

### Setting Up Cloud Save:

1. **Generate GitHub Token:**
   - Go to [GitHub Settings](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Give it a name like "BoredQuest Cloud Save"
   - Select **"repo"** permissions
   - Copy the generated token

2. **Enable Cloud Save:**
   - When you first visit BoredQuest, you'll be prompted to enter your GitHub token
   - Paste your token and click OK
   - Your progress will now be saved to the cloud!

3. **Data Security:**
   - All player data is **encrypted** before being stored
   - Data is stored in the `data/` directory of this repository
   - Each player has their own encrypted save file

### File Structure:
```
data/
├── accounts.json          # All registered accounts
├── first_account.json     # First admin account flag
├── player_username1.json  # Player 1's encrypted data
├── player_username2.json  # Player 2's encrypted data
└── ...
```

## 🎯 Features

- **Pixel Art Aesthetics**: Retro 8-bit graphics and UI design
- **Real-time Multiplayer**: Play with friends in pixelated combat and exploration
- **Character Progression**: Level up and become more powerful through epic battles
- **Dungeon Crawling**: Explore procedurally generated pixel dungeons
- **Admin System**: First registered user becomes admin with special privileges
- **Responsive Design**: Works on desktop and mobile devices
- **Cloud Save**: Encrypted data persistence across all devices
- **Combat System**: Turn-based combat with 4 enemy types

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Tailwind CSS with custom pixel art classes
- **Fonts**: Press Start 2P (pixel art), VT323 (retro terminal)
- **Deployment**: GitHub Pages
- **Storage**: GitHub API with encrypted localStorage fallback
- **Encryption**: Base64 encoding for data security

## 🎨 Pixel Art Design

BoredQuest features a complete retro gaming aesthetic:

- **Pixel-perfect borders**: Inset/outset effects mimicking classic game UI
- **8-bit color palette**: Limited colors for authentic retro feel
- **Scanline effects**: Subtle CRT monitor simulation
- **Retro fonts**: Press Start 2P for headers, VT323 for body text
- **Pixel animations**: Bounce and glow effects for interactive elements

## 🎮 Game Features

### Current Features
- User registration and login system with cloud save
- Admin panel for first registered user
- Character stats display (Health, Mana, Experience, Gold)
- Pixel art UI with retro styling
- Responsive design for all devices
- **Combat System**: Fight 4 different enemy types
- **Progression**: Level up, gain stats, earn gold
- **Cloud Save**: Encrypted data persistence

### Combat System
- **4 Enemy Types**: Goblin, Orc, Troll, Dragon
- **3 Actions**: Attack (melee), Heal (restore HP), Magic (spell damage)
- **Turn-based**: Attack → Enemy counter-attack
- **Rewards**: Experience points and gold for victories
- **Level Up**: Increased health, mana, and new abilities

### Coming Soon
- Real-time multiplayer combat
- Item collection and crafting
- Guild system
- Trading with other players
- More pixel art dungeons and enemies

## 🏃‍♂️ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/purgedev-1/RealmQuest.git
   cd RealmQuest
   ```

2. **Open the game**
   - Simply open `index.html` in your browser
   - Or serve with a local server for best experience

3. **Set up cloud save (optional)**
   - Follow the cloud save setup instructions above
   - Or play with local storage only

4. **Start playing**
   - Register a new account (first user becomes admin!)
   - Explore the pixelated world of BoredQuest
   - Fight enemies and level up!

## 🎯 Admin Features

The first user to register automatically becomes an admin with access to:

- **Server Management**: Restart server, toggle maintenance, create backups
- **Player Management**: Ban, kick, and teleport players
- **Admin Console**: Real-time server monitoring and logging

## 🔐 Data Security

### Encryption Details:
- **Storage Method**: Base64 encoding for data obfuscation
- **Data Location**: GitHub repository `data/` directory
- **Access Control**: GitHub API with personal access tokens
- **Fallback**: localStorage for offline play

### Privacy:
- Player passwords are stored (not recommended for production)
- All game data is encrypted before storage
- Individual save files per user
- No personal information collected

## 🎨 Customization

### Adding New Pixel Art Elements

The game uses custom CSS classes for pixel art styling:

```css
.pixel-button {
  border: 2px solid #ffffff;
  box-shadow: 
    inset 2px 2px 0px #000000,
    inset -2px -2px 0px #808080;
  background: linear-gradient(45deg, #c0c0c0, #e0e0e0);
}
```

### Color Palette

The game uses a carefully selected 8-bit color palette:

- **Primary**: Yellow (#ffff00), Green (#00ff00), Blue (#0000ff)
- **Secondary**: Red (#ff0000), Purple (#ff00ff), Cyan (#00ffff)
- **Neutral**: Black (#000000), White (#ffffff), Gray (#808080)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. Maintain the pixel art aesthetic
2. Use the established color palette
3. Follow the existing code structure
4. Test on both desktop and mobile
5. Ensure cloud save compatibility

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by classic 8-bit RPGs and MMORPGs
- Built with modern web technologies for the best of both worlds
- Special thanks to the pixel art community for inspiration
- GitHub API for cloud save functionality

---

**Ready to embark on your pixelated adventure? Join BoredQuest today!** 🎮✨ 