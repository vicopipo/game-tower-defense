/* ========================
   CLASSE TOUR
   ======================== */

class Tower extends Entity {
    constructor(x, y, type = 'gun') {
        super(x, y, 40, 40, 'tower');
        
        this.towerType = type;
        this.level = 1;
        this.experience = 0;
        
        // Configuration par type
        this.setupByType(type);
        
        // Cible
        this.target = null;
        this.lastShotTime = 0;
        this.range = this.baseRange;
        this.fireRate = this.baseFireRate;
        this.damage = this.baseDamage;
    }

    /**
     * Configurer la tour selon son type
     */
    setupByType(type) {
        const configs = {
            'gun': {
                cost: 100,
                damage: 10,
                fireRate: 1,
                range: 150,
                color: '#3498db',
                description: 'Tour de Tir'
            },
            'freeze': {
                cost: 150,
                damage: 5,
                fireRate: 0.8,
                range: 120,
                color: '#9b59b6',
                description: 'Tour de Gel'
            },
            'electric': {
                cost: 200,
                damage: 15,
                fireRate: 1.2,
                range: 180,
                color: '#f1c40f',
                description: 'Tour d\'Électricité'
            },
            'poison': {
                cost: 175,
                damage: 3,
                fireRate: 1.5,
                range: 130,
                color: '#2ecc71',
                description: 'Tour de Poison'
            }
        };

        const config = configs[type] || configs['gun'];
        this.cost = config.cost;
        this.baseDamage = config.damage;
        this.baseFireRate = config.fireRate;
        this.baseRange = config.range;
        this.color = config.color;
        this.description = config.description;
    }

    /**
     * Mettre à jour la tour
     */
    update(deltaTime, gameState) {
        super.update(deltaTime, gameState);

        if (!this.active) return;

        // Chercher une cible
        this.findTarget(gameState.enemies);

        // Tirer si on a une cible
        if (this.target && this.canShoot(deltaTime)) {
            this.shoot(gameState);
        }
    }

    /**
     * Chercher une cible
     */
    findTarget(enemies) {
        let closestEnemy = null;
        let closestDistance = this.range;

        for (const enemy of enemies) {
            if (!enemy.active || enemy.isDead) continue;

            const distance = this.distanceTo(enemy);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestEnemy = enemy;
            }
        }

        this.target = closestEnemy;
    }

    /**
     * Vérifier si on peut tirer
     */
    canShoot(deltaTime) {
        this.lastShotTime += deltaTime;
        if (this.lastShotTime >= 1 / this.fireRate) {
            this.lastShotTime = 0;
            return true;
        }
        return false;
    }

    /**
     * Tirer sur une cible
     */
    shoot(gameState) {
        if (!this.target) return;

        const center = this.getCenter();
        const angle = this.angleTo(this.target);
        const speed = 300;

        const projectile = new Projectile(
            center.x,
            center.y,
            this.towerType,
            angle,
            speed,
            this.damage
        );

        gameState.projectiles.push(projectile);
    }

    /**
     * Rendre la tour
     */
    render(ctx) {
        if (!this.visible) return;

        const center = this.getCenter();

        // Cercle de portée (en debug)
        if (window.DEBUG) {
            RendererUtils.strokeCircle(ctx, center.x, center.y, this.range, 'rgba(52, 152, 219, 0.2)', 1);
        }

        // Corps de la tour
        RendererUtils.fillCircle(ctx, center.x, center.y, this.width / 2, this.color);

        // Border
        RendererUtils.strokeCircle(ctx, center.x, center.y, this.width / 2, '#ecf0f1', 2);

        // Canon pointant vers la cible
        if (this.target) {
            const angle = this.angleTo(this.target);
            const x2 = center.x + Math.cos(angle) * (this.width / 2 + 10);
            const y2 = center.y + Math.sin(angle) * (this.width / 2 + 10);
            RendererUtils.line(ctx, center.x, center.y, x2, y2, '#ecf0f1', 3);
        }

        // Barre de santé
        this.renderHealthBar(ctx);

        // Particules
        this.renderParticles(ctx);
    }

    /**
     * Rendre la barre de santé
     */
    renderHealthBar(ctx) {
        const barWidth = this.width;
        const barHeight = 5;
        const barY = this.y - 10;

        // Background
        RendererUtils.fillRect(ctx, this.x, barY, barWidth, barHeight, '#2c3e50');

        // Health
        const healthPercent = this.health / this.maxHealth;
        RendererUtils.fillRect(ctx, this.x, barY, barWidth * healthPercent, barHeight, '#2ecc71');
    }

    /**
     * Améliorer la tour
     */
    upgrade() {
        this.level++;
        this.damage = this.baseDamage * (1 + this.level * 0.15);
        this.fireRate = this.baseFireRate * (1 + this.level * 0.1);
        this.range = this.baseRange * (1 + this.level * 0.08);
    }

    /**
     * Vendre la tour
     */
    sell() {
        return Math.floor(this.cost * 0.75); // 75% de remboursement
    }

    /**
     * Créer un effet de mort
     */
    createDeathEffect() {
        // Explosion avec particules
        const center = this.getCenter();
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const vx = Math.cos(angle) * 200;
            const vy = Math.sin(angle) * 200;
            const particle = new Particle(center.x, center.y, vx, vy, '█', this.color, 0.5);
            this.particles.push(particle);
        }
    }

    /**
     * Obtenir les informations
     */
    getInfo() {
        return {
            type: this.description,
            level: this.level,
            damage: this.damage.toFixed(1),
            fireRate: this.fireRate.toFixed(1),
            range: this.range.toFixed(0),
            health: `${this.health.toFixed(0)}/${this.maxHealth}`,
            cost: this.cost,
            sellPrice: this.sell()
        };
    }
}
