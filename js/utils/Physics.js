/* ========================
   UTILITAIRES DE PHYSIQUE
   ======================== */

const PhysicsUtils = {
    /**
     * Appliquer la gravité
     */
    applyGravity(vy, gravity) {
        return vy + gravity;
    },

    /**
     * Appliquer la friction
     */
    applyFriction(velocity, friction) {
        return velocity * friction;
    },

    /**
     * Collision élastique 1D
     */
    elasticCollision1D(v1, m1, v2, m2) {
        const v1_new = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2);
        const v2_new = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2);
        return { v1: v1_new, v2: v2_new };
    },

    /**
     * Collision inélastique (parfaitement)
     */
    inelasticCollision1D(v1, m1, v2, m2) {
        return ((m1 * v1 + m2 * v2) / (m1 + m2));
    },

    /**
     * Rebond simple
     */
    bounce(velocity, bounceFactor = 0.8) {
        return -velocity * bounceFactor;
    },

    /**
     * Arrêter progressivement la vélocité
     */
    stopVelocity(velocity, damping = 0.95) {
        if (Math.abs(velocity) < 0.01) return 0;
        return velocity * damping;
    },

    /**
     * Projection de mouvement
     */
    projectPosition(x, y, vx, vy, time) {
        return {
            x: x + vx * time,
            y: y + vy * time
        };
    },

    /**
     * Accélération constante
     */
    accelerate(velocity, acceleration, deltaTime) {
        return velocity + acceleration * deltaTime;
    },

    /**
     * Force = masse × accélération
     */
    force(mass, acceleration) {
        return mass * acceleration;
    },

    /**
     * Accélération = force / masse
     */
    acceleration(force, mass) {
        return force / mass;
    },

    /**
     * Énergie cinétique
     */
    kineticEnergy(mass, velocity) {
        return 0.5 * mass * velocity * velocity;
    },

    /**
     * Impulsion (changement de momentum)
     */
    impulse(force, time) {
        return force * time;
    },

    /**
     * Changement de vélocité par impulsion
     */
    velocityFromImpulse(mass, impulse) {
        return impulse / mass;
    }
};
