// Realm Quest - Main Game Logic
class RealmQuest {
    constructor() {
        this.currentScreen = 'login';
        this.user = null;
        this.characters = [];
        this.currentCharacter = null;
        this.gameState = 'idle'; // idle, combat, exploring
        this.enemies = [];
        this.inventory = [];
        this.skills = [];
        this.quests = [];
        this.chatHistory = [];
        this.currentChatTab = 'global';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadGameData();
        this.setupCanvas();
        this.generateInventorySlots();
        this.generateEquipmentSlots();
        this.addSystemMessage("Welcome to Realm Quest! Please login to begin your adventure.");
    }

    setupEventListeners() {
        // Login screen
        document.getElementById('login-btn').addEventListener('click', () => this.handleLogin());
        document.getElementById('register-btn').addEventListener('click', () => this.handleRegister());
        
        // Character selection
        document.querySelectorAll('.char-slot').forEach(slot => {
            slot.addEventListener('click', (e) => this.selectCharacterSlot(e.currentTarget.dataset.slot));
        });
        document.getElementById('create-char-btn').addEventListener('click', () => this.showCharacterCreation());
        document.getElementById('delete-char-btn').addEventListener('click', () => this.deleteCharacter());
        document.getElementById('logout-btn').addEventListener('click', () => this.logout());
        
        // Character creation
        document.getElementById('char-name-input').addEventListener('input', (e) => this.validateCharacterCreation());
        document.querySelectorAll('.class-option').forEach(option => {
            option.addEventListener('click', (e) => this.selectClass(e.currentTarget.dataset.class));
        });
        document.getElementById('confirm-creation-btn').addEventListener('click', () => this.createCharacter());
        document.getElementById('cancel-creation-btn').addEventListener('click', () => this.showCharacterSelection());
        
        // Game interface
        document.getElementById('inventory-btn').addEventListener('click', () => this.togglePanel('inventory'));
        document.getElementById('character-btn').addEventListener('click', () => this.togglePanel('character'));
        document.getElementById('skills-btn').addEventListener('click', () => this.togglePanel('skills'));
        document.getElementById('quests-btn').addEventListener('click', () => this.togglePanel('quests'));
        document.getElementById('map-btn').addEventListener('click', () => this.togglePanel('map'));
        document.getElementById('settings-btn').addEventListener('click', () => this.showSettings());
        
        // Combat
        document.getElementById('attack-btn').addEventListener('click', () => this.attack());
        document.getElementById('skill-btn').addEventListener('click', () => this.useSkill());
        document.getElementById('item-btn').addEventListener('click', () => this.useItem());
        document.getElementById('flee-btn').addEventListener('click', () => this.flee());
        
        // Chat
        document.querySelectorAll('.chat-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchChatTab(e.currentTarget.dataset.tab));
        });
        document.getElementById('send-chat-btn').addEventListener('click', () => this.sendChatMessage());
        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendChatMessage();
        });
        
        // Panel close buttons
        document.querySelectorAll('.close-panel').forEach(btn => {
            btn.addEventListener('click', (e) => this.closePanel(e.currentTarget.dataset.panel));
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    setupCanvas() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        this.renderGameWorld();
    }

    loadGameData() {
        // Load saved data from localStorage
        const savedData = localStorage.getItem('realmQuestData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.user = data.user;
            this.characters = data.characters || [];
            this.updateCharacterSlots();
        }
        
        // Initialize default game data
        this.initializeGameData();
    }

    initializeGameData() {
        // Default skills for each class
        this.classSkills = {
            warrior: [
                { id: 'slash', name: 'Slash', damage: 25, manaCost: 10, cooldown: 3 },
                { id: 'shield_bash', name: 'Shield Bash', damage: 15, manaCost: 15, cooldown: 5, stun: true },
                { id: 'battle_cry', name: 'Battle Cry', damage: 0, manaCost: 20, cooldown: 8, buff: 'attack' }
            ],
            mage: [
                { id: 'fireball', name: 'Fireball', damage: 35, manaCost: 20, cooldown: 4 },
                { id: 'ice_shield', name: 'Ice Shield', damage: 0, manaCost: 25, cooldown: 6, buff: 'defense' },
                { id: 'lightning_bolt', name: 'Lightning Bolt', damage: 40, manaCost: 30, cooldown: 7 }
            ],
            archer: [
                { id: 'precise_shot', name: 'Precise Shot', damage: 30, manaCost: 15, cooldown: 3 },
                { id: 'multi_shot', name: 'Multi Shot', damage: 20, manaCost: 25, cooldown: 6 },
                { id: 'stealth', name: 'Stealth', damage: 0, manaCost: 20, cooldown: 10, buff: 'crit' }
            ],
            cleric: [
                { id: 'heal', name: 'Heal', damage: -30, manaCost: 25, cooldown: 4 },
                { id: 'smite', name: 'Smite', damage: 25, manaCost: 20, cooldown: 5 },
                { id: 'blessing', name: 'Blessing', damage: 0, manaCost: 30, cooldown: 8, buff: 'all' }
            ]
        };

        // Default enemies
        this.enemyTypes = {
            goblin: { name: 'Goblin', hp: 50, attack: 8, defense: 5, exp: 20, gold: 10 },
            orc: { name: 'Orc', hp: 80, attack: 12, defense: 8, exp: 35, gold: 20 },
            troll: { name: 'Troll', hp: 120, attack: 15, defense: 12, exp: 50, gold: 30 },
            dragon: { name: 'Dragon', hp: 300, attack: 25, defense: 20, exp: 200, gold: 100 }
        };

        // Default items
        this.itemTypes = {
            health_potion: { name: 'Health Potion', type: 'consumable', effect: 'heal', value: 50, icon: '❤️' },
            mana_potion: { name: 'Mana Potion', type: 'consumable', effect: 'mana', value: 30, icon: '🔮' },
            iron_sword: { name: 'Iron Sword', type: 'weapon', attack: 10, icon: '⚔️' },
            leather_armor: { name: 'Leather Armor', type: 'armor', defense: 8, icon: '🛡️' }
        };
    }

    // Screen Management
    showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenName + '-screen').classList.add('active');
        this.currentScreen = screenName;
    }

    // Login System
    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (!username || !password) {
            this.addSystemMessage("Please enter both username and password.");
            return;
        }
        
        // Simple authentication (in a real game, this would be server-side)
        if (this.user && this.user.username === username) {
            this.showCharacterSelection();
            this.addSystemMessage(`Welcome back, ${username}!`);
        } else {
            // Create new user
            this.user = { username, password };
            this.characters = [];
            this.saveGameData();
            this.showCharacterSelection();
            this.addSystemMessage(`Welcome to Realm Quest, ${username}!`);
        }
    }

    handleRegister() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (!username || !password) {
            this.addSystemMessage("Please enter both username and password.");
            return;
        }
        
        this.user = { username, password };
        this.characters = [];
        this.saveGameData();
        this.showCharacterSelection();
        this.addSystemMessage(`Account created! Welcome to Realm Quest, ${username}!`);
    }

    // Character Management
    showCharacterSelection() {
        this.showScreen('character-select');
        this.updateCharacterSlots();
    }

    updateCharacterSlots() {
        const slots = document.querySelectorAll('.char-slot');
        slots.forEach((slot, index) => {
            const character = this.characters[index];
            const preview = slot.querySelector('.char-preview');
            const name = slot.querySelector('.char-name');
            const level = slot.querySelector('.char-level');
            
            if (character) {
                preview.textContent = this.getClassIcon(character.class);
                name.textContent = character.name;
                level.textContent = `Level ${character.level}`;
                slot.classList.add('has-character');
            } else {
                preview.textContent = 'Create New';
                name.textContent = 'Empty Slot';
                level.textContent = 'Level 0';
                slot.classList.remove('has-character');
            }
        });
    }

    selectCharacterSlot(slotIndex) {
        document.querySelectorAll('.char-slot').forEach(slot => {
            slot.classList.remove('selected');
        });
        document.querySelector(`[data-slot="${slotIndex}"]`).classList.add('selected');
        
        const character = this.characters[slotIndex];
        const deleteBtn = document.getElementById('delete-char-btn');
        deleteBtn.disabled = !character;
        
        if (character) {
            this.currentCharacter = character;
            this.loadCharacter();
        }
    }

    showCharacterCreation() {
        this.showScreen('char-creation');
        this.selectedClass = null;
        this.updateClassSelection();
    }

    selectClass(className) {
        this.selectedClass = className;
        this.updateClassSelection();
        this.validateCharacterCreation();
    }

    updateClassSelection() {
        document.querySelectorAll('.class-option').forEach(option => {
            option.classList.remove('selected');
        });
        if (this.selectedClass) {
            document.querySelector(`[data-class="${this.selectedClass}"]`).classList.add('selected');
        }
    }

    validateCharacterCreation() {
        const name = document.getElementById('char-name-input').value.trim();
        const confirmBtn = document.getElementById('confirm-creation-btn');
        confirmBtn.disabled = !name || !this.selectedClass;
    }

    createCharacter() {
        const name = document.getElementById('char-name-input').value.trim();
        if (!name || !this.selectedClass) return;
        
        // Check if name already exists
        if (this.characters.some(char => char.name === name)) {
            this.addSystemMessage("A character with that name already exists.");
            return;
        }
        
        const character = {
            name,
            class: this.selectedClass,
            level: 1,
            exp: 0,
            expToNext: 100,
            hp: this.getClassStats(this.selectedClass).hp,
            maxHp: this.getClassStats(this.selectedClass).hp,
            mana: 50,
            maxMana: 50,
            attack: this.getClassStats(this.selectedClass).attack,
            defense: this.getClassStats(this.selectedClass).defense,
            strength: 10,
            dexterity: 10,
            intelligence: 10,
            vitality: 10,
            gold: 100,
            inventory: [],
            equipment: {},
            skills: [...this.classSkills[this.selectedClass]],
            quests: []
        };
        
        this.characters.push(character);
        this.saveGameData();
        this.showCharacterSelection();
        this.addSystemMessage(`Character ${name} created successfully!`);
    }

    loadCharacter() {
        if (!this.currentCharacter) return;
        
        this.showScreen('game-interface');
        this.updateCharacterDisplay();
        this.loadInventory();
        this.loadSkills();
        this.loadQuests();
        this.startGameLoop();
    }

    deleteCharacter() {
        if (!this.currentCharacter) return;
        
        if (confirm(`Are you sure you want to delete ${this.currentCharacter.name}?`)) {
            const index = this.characters.indexOf(this.currentCharacter);
            this.characters.splice(index, 1);
            this.saveGameData();
            this.updateCharacterSlots();
            this.currentCharacter = null;
            this.addSystemMessage("Character deleted.");
        }
    }

    logout() {
        this.user = null;
        this.currentCharacter = null;
        this.showScreen('login');
        this.addSystemMessage("Logged out successfully.");
    }

    // Game Display Updates
    updateCharacterDisplay() {
        if (!this.currentCharacter) return;
        
        const char = this.currentCharacter;
        document.getElementById('char-name-display').textContent = char.name;
        document.getElementById('char-class-display').textContent = char.class;
        document.getElementById('char-level-display').textContent = `Level ${char.level}`;
        
        // Update status bars
        const healthPercent = (char.hp / char.maxHp) * 100;
        const manaPercent = (char.mana / char.maxMana) * 100;
        const expPercent = (char.exp / char.expToNext) * 100;
        
        document.getElementById('health-fill').style.width = `${healthPercent}%`;
        document.getElementById('mana-fill').style.width = `${manaPercent}%`;
        document.getElementById('exp-fill').style.width = `${expPercent}%`;
        
        document.getElementById('health-text').textContent = `${char.hp}/${char.maxHp}`;
        document.getElementById('mana-text').textContent = `${char.mana}/${char.maxMana}`;
        document.getElementById('exp-text').textContent = `${char.exp}/${char.expToNext} XP`;
        
        // Update character stats
        document.getElementById('stat-strength').textContent = char.strength;
        document.getElementById('stat-dexterity').textContent = char.dexterity;
        document.getElementById('stat-intelligence').textContent = char.intelligence;
        document.getElementById('stat-vitality').textContent = char.vitality;
        
        // Update gold
        document.getElementById('gold-amount').textContent = char.gold;
    }

    // Panel Management
    togglePanel(panelName) {
        const panel = document.getElementById(panelName + '-panel');
        const isActive = panel.classList.contains('active');
        
        // Close all panels first
        document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
        
        // Toggle the requested panel
        if (!isActive) {
            panel.classList.add('active');
            this.loadPanelData(panelName);
        }
    }

    closePanel(panelName) {
        document.getElementById(panelName + '-panel').classList.remove('active');
    }

    loadPanelData(panelName) {
        switch (panelName) {
            case 'inventory':
                this.loadInventory();
                break;
            case 'character':
                this.updateCharacterDisplay();
                break;
            case 'skills':
                this.loadSkills();
                break;
            case 'quests':
                this.loadQuests();
                break;
            case 'map':
                this.loadMap();
                break;
        }
    }

    // Inventory System
    generateInventorySlots() {
        const grid = document.getElementById('inventory-grid');
        grid.innerHTML = '';
        
        for (let i = 0; i < 32; i++) {
            const slot = document.createElement('div');
            slot.className = 'inventory-slot';
            slot.dataset.slot = i;
            slot.addEventListener('click', () => this.handleInventoryClick(i));
            grid.appendChild(slot);
        }
    }

    loadInventory() {
        if (!this.currentCharacter) return;
        
        const slots = document.querySelectorAll('.inventory-slot');
        slots.forEach((slot, index) => {
            const item = this.currentCharacter.inventory[index];
            if (item) {
                slot.textContent = this.itemTypes[item.type].icon;
                slot.classList.add('has-item');
                slot.title = this.itemTypes[item.type].name;
            } else {
                slot.textContent = '';
                slot.classList.remove('has-item');
                slot.title = '';
            }
        });
        
        document.getElementById('gold-amount').textContent = this.currentCharacter.gold;
    }

    handleInventoryClick(slotIndex) {
        const item = this.currentCharacter.inventory[slotIndex];
        if (item) {
            this.useInventoryItem(slotIndex);
        }
    }

    useInventoryItem(slotIndex) {
        const item = this.currentCharacter.inventory[slotIndex];
        if (!item) return;
        
        const itemData = this.itemTypes[item.type];
        
        if (itemData.type === 'consumable') {
            if (itemData.effect === 'heal') {
                this.currentCharacter.hp = Math.min(this.currentCharacter.maxHp, this.currentCharacter.hp + itemData.value);
                this.addSystemMessage(`Used ${itemData.name} and restored ${itemData.value} HP.`);
            } else if (itemData.effect === 'mana') {
                this.currentCharacter.mana = Math.min(this.currentCharacter.maxMana, this.currentCharacter.mana + itemData.value);
                this.addSystemMessage(`Used ${itemData.name} and restored ${itemData.value} Mana.`);
            }
            
            // Remove item from inventory
            this.currentCharacter.inventory.splice(slotIndex, 1);
            this.saveGameData();
            this.updateCharacterDisplay();
            this.loadInventory();
        }
    }

    // Skills System
    loadSkills() {
        if (!this.currentCharacter) return;
        
        const skillsList = document.getElementById('skills-list');
        skillsList.innerHTML = '';
        
        this.currentCharacter.skills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-item';
            skillElement.innerHTML = `
                <div class="skill-name">${skill.name}</div>
                <div class="skill-description">Damage: ${skill.damage} | Mana: ${skill.manaCost} | Cooldown: ${skill.cooldown}s</div>
            `;
            skillElement.addEventListener('click', () => this.selectSkill(skill));
            skillsList.appendChild(skillElement);
        });
    }

    selectSkill(skill) {
        if (this.gameState === 'combat') {
            this.useSkillInCombat(skill);
        } else {
            this.addSystemMessage(`Selected skill: ${skill.name}`);
        }
    }

    // Combat System
    startCombat(enemyType) {
        if (this.gameState === 'combat') return;
        
        const enemyData = this.enemyTypes[enemyType];
        this.currentEnemy = {
            ...enemyData,
            currentHp: enemyData.hp
        };
        
        this.gameState = 'combat';
        document.getElementById('combat-interface').style.display = 'flex';
        this.updateCombatDisplay();
        this.addSystemMessage(`A ${enemyData.name} appears! Combat begins!`);
    }

    updateCombatDisplay() {
        if (!this.currentEnemy) return;
        
        document.getElementById('enemy-name').textContent = this.currentEnemy.name;
        const healthPercent = (this.currentEnemy.currentHp / this.currentEnemy.hp) * 100;
        document.getElementById('enemy-health-fill').style.width = `${healthPercent}%`;
        document.getElementById('enemy-health-text').textContent = `${this.currentEnemy.currentHp}/${this.currentEnemy.hp}`;
    }

    attack() {
        if (this.gameState !== 'combat' || !this.currentEnemy) return;
        
        const damage = Math.max(1, this.currentCharacter.attack - this.currentEnemy.defense);
        this.currentEnemy.currentHp -= damage;
        
        this.addSystemMessage(`You attack the ${this.currentEnemy.name} for ${damage} damage!`);
        this.updateCombatDisplay();
        
        if (this.currentEnemy.currentHp <= 0) {
            this.endCombat(true);
        } else {
            this.enemyAttack();
        }
    }

    useSkillInCombat(skill) {
        if (this.gameState !== 'combat' || !this.currentEnemy) return;
        if (this.currentCharacter.mana < skill.manaCost) {
            this.addSystemMessage("Not enough mana!");
            return;
        }
        
        this.currentCharacter.mana -= skill.manaCost;
        const damage = Math.max(1, skill.damage - this.currentEnemy.defense);
        this.currentEnemy.currentHp -= damage;
        
        this.addSystemMessage(`You use ${skill.name} for ${damage} damage!`);
        this.updateCombatDisplay();
        this.updateCharacterDisplay();
        
        if (this.currentEnemy.currentHp <= 0) {
            this.endCombat(true);
        } else {
            this.enemyAttack();
        }
    }

    enemyAttack() {
        const damage = Math.max(1, this.currentEnemy.attack - this.currentCharacter.defense);
        this.currentCharacter.hp -= damage;
        
        this.addSystemMessage(`The ${this.currentEnemy.name} attacks you for ${damage} damage!`);
        this.updateCharacterDisplay();
        
        if (this.currentCharacter.hp <= 0) {
            this.endCombat(false);
        }
    }

    endCombat(victory) {
        if (victory) {
            const exp = this.currentEnemy.exp;
            const gold = this.currentEnemy.gold;
            
            this.currentCharacter.exp += exp;
            this.currentCharacter.gold += gold;
            
            this.addSystemMessage(`Victory! You gained ${exp} XP and ${gold} gold!`);
            
            // Check for level up
            if (this.currentCharacter.exp >= this.currentCharacter.expToNext) {
                this.levelUp();
            }
        } else {
            this.currentCharacter.hp = Math.max(1, this.currentCharacter.hp);
            this.addSystemMessage("You were defeated! Your HP has been restored to 1.");
        }
        
        this.gameState = 'idle';
        this.currentEnemy = null;
        document.getElementById('combat-interface').style.display = 'none';
        this.updateCharacterDisplay();
        this.saveGameData();
    }

    levelUp() {
        this.currentCharacter.level++;
        this.currentCharacter.exp -= this.currentCharacter.expToNext;
        this.currentCharacter.expToNext = Math.floor(this.currentCharacter.expToNext * 1.5);
        
        // Increase stats
        this.currentCharacter.maxHp += 10;
        this.currentCharacter.hp = this.currentCharacter.maxHp;
        this.currentCharacter.maxMana += 5;
        this.currentCharacter.mana = this.currentCharacter.maxMana;
        this.currentCharacter.attack += 2;
        this.currentCharacter.defense += 1;
        
        this.addSystemMessage(`Level up! You are now level ${this.currentCharacter.level}!`);
    }

    flee() {
        if (this.gameState !== 'combat') return;
        
        this.addSystemMessage("You fled from combat!");
        this.endCombat(false);
    }

    // Chat System
    switchChatTab(tabName) {
        this.currentChatTab = tabName;
        document.querySelectorAll('.chat-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        this.loadChatHistory();
    }

    sendChatMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        const chatMessage = {
            type: this.currentChatTab,
            sender: this.currentCharacter ? this.currentCharacter.name : 'System',
            message: message,
            timestamp: new Date().toLocaleTimeString()
        };
        
        this.chatHistory.push(chatMessage);
        this.addChatMessage(chatMessage);
        input.value = '';
        
        // Simulate other players responding
        setTimeout(() => {
            this.simulateOtherPlayers();
        }, 1000 + Math.random() * 2000);
    }

    addChatMessage(chatMessage) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${chatMessage.type}`;
        messageElement.innerHTML = `<strong>${chatMessage.sender}:</strong> ${chatMessage.message}`;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    addSystemMessage(message) {
        const systemMessage = {
            type: 'system',
            sender: 'System',
            message: message,
            timestamp: new Date().toLocaleTimeString()
        };
        
        this.chatHistory.push(systemMessage);
        this.addChatMessage(systemMessage);
    }

    simulateOtherPlayers() {
        const fakePlayers = ['Gandalf', 'Aragorn', 'Legolas', 'Gimli', 'Frodo'];
        const fakeMessages = [
            "Anyone want to party up for the dungeon?",
            "Just found a rare item!",
            "The boss is really tough today",
            "Anyone know where to find the magic scroll?",
            "Great game today everyone!"
        ];
        
        const randomPlayer = fakePlayers[Math.floor(Math.random() * fakePlayers.length)];
        const randomMessage = fakeMessages[Math.floor(Math.random() * fakeMessages.length)];
        
        const fakeMessage = {
            type: 'global',
            sender: randomPlayer,
            message: randomMessage,
            timestamp: new Date().toLocaleTimeString()
        };
        
        this.chatHistory.push(fakeMessage);
        this.addChatMessage(fakeMessage);
    }

    // Game World
    renderGameWorld() {
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw some basic world elements
        this.ctx.fillStyle = '#4a90e2';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Click to explore and find enemies!', this.canvas.width / 2, this.canvas.height / 2);
        
        // Draw some decorative elements
        this.drawWorldDecorations();
    }

    drawWorldDecorations() {
        // Draw some simple decorative elements
        this.ctx.fillStyle = '#2a4a6e';
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 3, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    handleCanvasClick(e) {
        if (this.gameState === 'combat') return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Random chance to encounter an enemy
        if (Math.random() < 0.3) {
            const enemyTypes = Object.keys(this.enemyTypes);
            const randomEnemy = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
            this.startCombat(randomEnemy);
        } else {
            this.addSystemMessage("You explore the area but find nothing of interest.");
        }
    }

    // Utility Functions
    getClassIcon(className) {
        const icons = {
            warrior: '⚔️',
            mage: '🔮',
            archer: '🏹',
            cleric: '⛪'
        };
        return icons[className] || '👤';
    }

    getClassStats(className) {
        const stats = {
            warrior: { hp: 120, attack: 15, defense: 12 },
            mage: { hp: 80, attack: 18, defense: 8 },
            archer: { hp: 90, attack: 16, defense: 10 },
            cleric: { hp: 100, attack: 12, defense: 14 }
        };
        return stats[className] || { hp: 100, attack: 10, defense: 10 };
    }

    handleKeyboardShortcuts(e) {
        switch (e.key) {
            case '1':
                if (this.gameState === 'combat') this.attack();
                break;
            case '2':
                if (this.gameState === 'combat') this.useSkill();
                break;
            case '3':
                if (this.gameState === 'combat') this.useItem();
                break;
            case '4':
                if (this.gameState === 'combat') this.flee();
                break;
            case 'i':
                this.togglePanel('inventory');
                break;
            case 'c':
                this.togglePanel('character');
                break;
            case 's':
                this.togglePanel('skills');
                break;
            case 'q':
                this.togglePanel('quests');
                break;
            case 'm':
                this.togglePanel('map');
                break;
        }
    }

    startGameLoop() {
        // Simple game loop for periodic updates
        setInterval(() => {
            if (this.currentCharacter && this.gameState === 'idle') {
                // Regenerate mana over time
                if (this.currentCharacter.mana < this.currentCharacter.maxMana) {
                    this.currentCharacter.mana = Math.min(this.currentCharacter.maxMana, this.currentCharacter.mana + 1);
                    this.updateCharacterDisplay();
                }
            }
        }, 5000); // Every 5 seconds
    }

    saveGameData() {
        const gameData = {
            user: this.user,
            characters: this.characters
        };
        localStorage.setItem('realmQuestData', JSON.stringify(gameData));
    }

    showSettings() {
        this.addSystemMessage("Settings panel not implemented yet.");
    }

    loadQuests() {
        // Placeholder for quest system
        const questsList = document.getElementById('quests-list');
        questsList.innerHTML = '<div class="quest-item"><div class="quest-name">No active quests</div><div class="quest-description">Visit the quest giver to get started!</div></div>';
    }

    loadMap() {
        // Placeholder for map system
        const mapContent = document.getElementById('map-content');
        mapContent.innerHTML = '<div style="text-align: center; padding: 2rem; color: #b8b8b8;">World map coming soon!</div>';
    }

    useSkill() {
        this.addSystemMessage("Select a skill from the skills panel.");
    }

    useItem() {
        this.addSystemMessage("Select an item from the inventory.");
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.game = new RealmQuest();
}); 