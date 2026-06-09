/* ========================
   UTILITAIRES DE RENDU
   ======================== */

const RendererUtils = {
    /**
     * Remplir un rectangle
     */
    fillRect(ctx, x, y, width, height, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    },

    /**
     * Tracer un rectangle
     */
    strokeRect(ctx, x, y, width, height, color, lineWidth = 1) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect(x, y, width, height);
    },

    /**
     * Remplir un cercle
     */
    fillCircle(ctx, x, y, radius, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    },

    /**
     * Tracer un cercle
     */
    strokeCircle(ctx, x, y, radius, color, lineWidth = 1) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
    },

    /**
     * Tracer une ligne
     */
    line(ctx, x1, y1, x2, y2, color, lineWidth = 1) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    },

    /**
     * Tracer un polygone
     */
    polygon(ctx, points, color, filled = true, lineWidth = 1) {
        if (points.length === 0) return;

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();

        if (filled) {
            ctx.fillStyle = color;
            ctx.fill();
        } else {
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
        }
    },

    /**
     * Écrire du texte
     */
    text(ctx, text, x, y, color, fontSize = 16, font = 'Arial') {
        ctx.fillStyle = color;
        ctx.font = `${fontSize}px ${font}`;
        ctx.fillText(text, x, y);
    },

    /**
     * Écrire du texte centré
     */
    textCentered(ctx, text, x, y, color, fontSize = 16, font = 'Arial') {
        ctx.fillStyle = color;
        ctx.font = `${fontSize}px ${font}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x, y);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
    },

    /**
     * Mesurer la largeur du texte
     */
    measureText(ctx, text, fontSize = 16, font = 'Arial') {
        ctx.font = `${fontSize}px ${font}`;
        return ctx.measureText(text).width;
    },

    /**
     * Remplir un dégradé linéaire
     */
    linearGradient(ctx, x1, y1, x2, y2, color1, color2) {
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        return gradient;
    },

    /**
     * Remplir un dégradé radial
     */
    radialGradient(ctx, x1, y1, r1, x2, y2, r2, color1, color2) {
        const gradient = ctx.createRadialGradient(x1, y1, r1, x2, y2, r2);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        return gradient;
    },

    /**
     * Flèche de direction
     */
    arrow(ctx, fromX, fromY, toX, toY, color, lineWidth = 2, headSize = 15) {
        const headlen = headSize;
        const angle = Math.atan2(toY - fromY, toX - fromX);

        // Ligne
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();

        // Pointe de flèche
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();
    },

    /**
     * Clearer le canvas
     */
    clear(ctx, x, y, width, height) {
        ctx.clearRect(x, y, width, height);
    },

    /**
     * Appliquer une ombre
     */
    shadow(ctx, color, blur, offsetX = 0, offsetY = 0) {
        ctx.shadowColor = color;
        ctx.shadowBlur = blur;
        ctx.shadowOffsetX = offsetX;
        ctx.shadowOffsetY = offsetY;
    },

    /**
     * Supprimer l'ombre
     */
    clearShadow(ctx) {
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    },

    /**
     * Sauvegarder l'état du canvas
     */
    save(ctx) {
        ctx.save();
    },

    /**
     * Restaurer l'état du canvas
     */
    restore(ctx) {
        ctx.restore();
    }
};
