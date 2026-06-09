# Tower Defense - Jeu de Défense de Base

Un jeu Tower Defense complet en JavaScript vanilla avec support du PvP, de l'IA et d'un éditeur de cartes intégré.

## 🎮 Fonctionnalités

### Modes de Jeu
- **Solo contre l'IA** - Combattez l'intelligence artificielle
- **PvP** - Affrontez un autre joueur
- **Survie** - Survie à des vagues infinies

### Gameplay
- Construction et placement de tours
- Système de vagues d'ennemis progressif
- Combat en temps réel
- Gestion des ressources (or, santé)
- Système de projectiles et de collision

### Éditeur de Cartes
- Tracer des chemins personnalisés
- Placer des obstacles
- Définir les points de spawn et d'arrivée
- Sauvegarder et charger des cartes

### Visuels et Son
- Rendu en temps réel avec Canvas
- Système de particules
- Mini-carte interactive
- Effets visuels configurables

## 🚀 Démarrage

1. Clonez le repository:
```bash
git clone https://github.com/vicopipo/game-tower-defense.git
cd game-tower-defense
```

2. Ouvrez `index.html` dans votre navigateur:
```bash
open index.html
```

Ou utilisez un serveur local:
```bash
python -m http.server 8000
```

## 📁 Structure du Projet

```
game-tower-defense/
├── index.html                 # Page principale
├── styles/
│   └── main.css              # Feuille de style
├── js/
│   ├── main.js               # Point d'entrée
│   ├── Game.js               # Logique principale du jeu
│   ├── utils/
│   │   ├── Math.js           # Fonctions mathématiques
│   │   ├── Physics.js        # Calculs de physique
│   │   ├── Pathfinding.js    # Recherche de chemin
│   │   └── Renderer.js       # Fonctions de rendu
│   ├── entities/
│   │   ├── Entity.js         # Classe de base
│   │   ├── Player.js         # Joueur
│   │   ├── Tower.js          # Tours défensives
│   │   ├── Enemy.js          # Ennemis
│   │   ├── Projectile.js     # Projectiles
│   │   └── Particle.js       # Particules
│   ├── systems/
│   │   ├── PhysicsSystem.js  # Système de physique
│   │   ├── RenderSystem.js   # Système de rendu
│   │   ├── InputSystem.js    # Système d'entrée
│   │   ├── CollisionSystem.js# Détection de collision
│   │   └── WaveSystem.js     # Gestion des vagues
│   ├── ai/
│   │   ├── AIBehavior.js     # Comportement IA
│   │   └── PathfindingAI.js  # Pathfinding IA
│   └── managers/
│       ├── GameManager.js    # Gestionnaire de jeu
│       ├── UIManager.js      # Gestionnaire d'UI
│       └── MapEditor.js      # Éditeur de cartes
└── README.md                 # Ce fichier
```

## 🎮 Contrôles

- **Clic Gauche** - Placer une tour / Sélectionner
- **Clic Droit** - Vendre / Annuler
- **P** - Pause/Reprendre
- **Espace** - Démarrer la vague suivante
- **Échap** - Menu principal

## 📊 Système de Jeu

### Tours
- **Tour de Tir** - Tire des projectiles à faible portée
- **Tour de Gel** - Ralentit les ennemis
- **Tour d'Électricité** - Électrocute plusieurs cibles
- **Tour de Poison** - Inflige des dégâts continus

### Ennemis
- **Soldat** - Ennemi de base
- **Tank** - Ennemi robuste avec beaucoup de PV
- **Rapide** - Ennemi agile et rapide
- **Boss** - Ennemi final puissant

### Vagues
- Augmentation progressive de la difficulté
- Plus d'ennemis à chaque vague
- Des types d'ennemis variés
- Récompenses en or

## 🎨 Personnalisation

Modifiez les paramètres dans `Game.js`:
- Équilibre des tours (coût, dégâts, portée)
- Vitesse du jeu
- Taille de la carte
- Nombre de vagues

## 🐛 Débogage

Le jeu inclut un mode debug configurable. Activez-le dans `main.js`:
```javascript
DEBUG = true; // Affiche les hitbox, les chemins, etc.
```

## 📝 Licence

MIT - Libre d'utilisation

## 👤 Auteur

Créé par **vicopipo**

---

**Bon jeu! 🎮**
