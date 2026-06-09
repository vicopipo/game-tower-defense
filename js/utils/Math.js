/* ========================
   UTILITAIRES MATHÉMATIQUES
   ======================== */

const MathUtils = {
    /**
     * Distance entre deux points
     */
    distance(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    },

    /**
     * Distance au carré (plus rapide, pour les comparaisons)
     */
    distanceSquared(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return dx * dx + dy * dy;
    },

    /**
     * Angle entre deux points
     */
    angle(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    },

    /**
     * Angle en degrés
     */
    angleDegrees(x1, y1, x2, y2) {
        return this.angle(x1, y1, x2, y2) * 180 / Math.PI;
    },

    /**
     * Vélocité avec angle et vitesse
     */
    velocityFromAngle(angle, speed) {
        return {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
        };
    },

    /**
     * Clamp une valeur entre min et max
     */
    clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    },

    /**
     * Interpolation linéaire
     */
    lerp(a, b, t) {
        return a + (b - a) * this.clamp(t, 0, 1);
    },

    /**
     * Vérifier si un point est dans un rectangle
     */
    pointInRect(px, py, rx, ry, rw, rh) {
        return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
    },

    /**
     * Vérifier si un point est dans un cercle
     */
    pointInCircle(px, py, cx, cy, radius) {
        return this.distanceSquared(px, py, cx, cy) <= radius * radius;
    },

    /**
     * Vérifier si deux cercles se touchent
     */
    circleCollision(x1, y1, r1, x2, y2, r2) {
        return this.distanceSquared(x1, y1, x2, y2) <= (r1 + r2) * (r1 + r2);
    },

    /**
     * Vérifier si un cercle touche un rectangle
     */
    circleRectCollision(cx, cy, r, rx, ry, rw, rh) {
        const closestX = this.clamp(cx, rx, rx + rw);
        const closestY = this.clamp(cy, ry, ry + rh);
        return this.distanceSquared(cx, cy, closestX, closestY) <= r * r;
    },

    /**
     * Nombre aléatoire entre min et max
     */
    random(min, max) {
        return Math.random() * (max - min) + min;
    },

    /**
     * Nombre entier aléatoire entre min et max
     */
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Choix aléatoire dans un array
     */
    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    },

    /**
     * Rotation d'un point autour d'un centre
     */
    rotatePoint(x, y, cx, cy, angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const dx = x - cx;
        const dy = y - cy;
        return {
            x: cx + (dx * cos - dy * sin),
            y: cy + (dx * sin + dy * cos)
        };
    },

    /**
     * Normaliser un vecteur
     */
    normalizeVector(vx, vy) {
        const length = Math.sqrt(vx * vx + vy * vy);
        if (length === 0) return { x: 0, y: 0 };
        return {
            x: vx / length,
            y: vy / length
        };
    }
};
