/* ========================
   CLASSE DE BASE - ENTITÉ
   ======================== */

class Entity {
    constructor(x, y, width, height, type = 'entity') {
        // Position et dimensions
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // Type et ID
        this.type = type;
        this.id = Math.random().toString(36).substr(2, 9);

        // Vélocité
        this.vx = 0;
        this.vy = 0;

        // Santé
        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.isDead = false;

        // Collision
        this.collidable = true;
        this.solid = true;

        // État
        this.visible = true;
        this.active = true;

        // Effecteurs
        this.effects = [];
        this.particles = [];
    }

    /**
     * Mettre à jour l'entité
     */
    update(deltaTime, gameState) {
        if (!this.active) return;

        // Appliquer la vélocité
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;

        // Mettre à jour les effecteurs
        this.updateEffects(deltaTime);

        // Mettre à jour les particules
        this.updateParticles(deltaTime);
    }

    /**
     * Rendre l'entité
     */
    render(ctx) {
        if (!this.visible) return;

        // Rect par défaut
        RendererUtils.fillRect(ctx, this.x, this.y, this.width, this.height, '#3498db');
    }

    /**
     * Appliquer des dégâts
     */
    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            this.die();
        }
        this.createDamageEffect();
    }

    /**
     * Créer un effet de dégât
     */
    createDamageEffect() {
        const particle = new Particle(
            this.x + this.width / 2,
            this.y - this.height / 2,
            MathUtils.random(-100, 100),
            MathUtils.random(-150, -50),
            '-' + this.health.toString(),
            '#e74c3c',
            0.5
        );
        this.particles.push(particle);
    }

    /**
     * Morte
     */
    die() {
        this.isDead = true;
        this.active = false;
        this.visible = false;
        this.createDeathEffect();
    }

    /**
     * Créer un effet de mort
     */
    createDeathEffect() {
        // À implémenter dans les sous-classes
    }

    /**
     * Ajouter un effecteur
     */
    addEffect(effect) {
        this.effects.push(effect);
    }

    /**
     * Mettre à jour les effecteurs
     */
    updateEffects(deltaTime) {
        for (let i = this.effects.length - 1; i >= 0; i--) {
            const effect = this.effects[i];
            effect.duration -= deltaTime;
            effect.update(this, deltaTime);

            if (effect.duration <= 0) {
                this.effects.splice(i, 1);
            }
        }
    }

    /**
     * Mettre à jour les particules
     */
    updateParticles(deltaTime) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.update(deltaTime);

            if (particle.isDead) {
                this.particles.splice(i, 1);
            }
        }
    }

    /**
     * Rendre les particules
     */
    renderParticles(ctx) {
        for (const particle of this.particles) {
            particle.render(ctx);
        }
    }

    /**
     * Vérifier la collision avec un point
     */
    isPointInside(px, py) {
        return MathUtils.pointInRect(px, py, this.x, this.y, this.width, this.height);
    }

    /**
     * Vérifier la collision avec un rectangle
     */
    collidesWith(other) {
        return !(this.x + this.width < other.x ||
                 this.x > other.x + other.width ||
                 this.y + this.height < other.y ||
                 this.y > other.y + other.height);
    }

    /**
     * Guérir l'entité
     */
    heal(amount) {
        this.health = Math.min(this.health + amount, this.maxHealth);
    }

    /**
     * Récupérer le centre
     */
    getCenter() {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        };
    }

    /**
     * Distance avec une autre entité
     */
    distanceTo(other) {
        const c1 = this.getCenter();
        const c2 = other.getCenter();
        return MathUtils.distance(c1.x, c1.y, c2.x, c2.y);
    }

    /**
     * Angle vers une autre entité
     */
    angleTo(other) {
        const c1 = this.getCenter();
        const c2 = other.getCenter();
        return MathUtils.angle(c1.x, c1.y, c2.x, c2.y);
    }

    /**
     * Arrêter le mouvement
     */
    stop() {
        this.vx = 0;
        this.vy = 0;
    }

    /**
     * Cloner l'entité
     */
    clone() {
        const clone = new Entity(this.x, this.y, this.width, this.height, this.type);
        clone.vx = this.vx;
        clone.vy = this.vy;
        clone.maxHealth = this.maxHealth;
        clone.health = this.health;
        return clone;
    }
}
