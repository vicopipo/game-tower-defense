/* ========================
   UTILITAIRES DE PATHFINDING
   ======================== */

const PathfindingUtils = {
    /**
     * A* Pathfinding - Find the shortest path
     */
    aStar(start, end, grid, gridWidth, gridHeight) {
        const openSet = [start];
        const cameFrom = new Map();
        const gScore = new Map();
        const fScore = new Map();

        const key = (node) => `${node.x},${node.y}`;
        const heuristic = (node) => {
            return MathUtils.distance(node.x, node.y, end.x, end.y);
        };

        gScore.set(key(start), 0);
        fScore.set(key(start), heuristic(start));

        while (openSet.length > 0) {
            // Find node with lowest fScore
            let current = openSet[0];
            let currentIndex = 0;
            for (let i = 1; i < openSet.length; i++) {
                if (fScore.get(key(openSet[i])) < fScore.get(key(current))) {
                    current = openSet[i];
                    currentIndex = i;
                }
            }

            if (current.x === end.x && current.y === end.y) {
                return this.reconstructPath(cameFrom, current, key);
            }

            openSet.splice(currentIndex, 1);
            const neighbors = this.getNeighbors(current, gridWidth, gridHeight, grid);

            for (const neighbor of neighbors) {
                const tentativeGScore = gScore.get(key(current)) + 1;

                if (!gScore.has(key(neighbor)) || tentativeGScore < gScore.get(key(neighbor))) {
                    cameFrom.set(key(neighbor), current);
                    gScore.set(key(neighbor), tentativeGScore);
                    fScore.set(key(neighbor), gScore.get(key(neighbor)) + heuristic(neighbor));

                    if (!openSet.some(n => n.x === neighbor.x && n.y === neighbor.y)) {
                        openSet.push(neighbor);
                    }
                }
            }
        }

        return []; // No path found
    },

    /**
     * Reconstruct path from A*
     */
    reconstructPath(cameFrom, current, key) {
        const path = [current];
        while (cameFrom.has(key(current))) {
            current = cameFrom.get(key(current));
            path.unshift(current);
        }
        return path;
    },

    /**
     * Get neighbors in grid
     */
    getNeighbors(node, gridWidth, gridHeight, grid, diagonal = false) {
        const neighbors = [];
        const directions = [
            { x: 0, y: -1 }, // up
            { x: 1, y: 0 },  // right
            { x: 0, y: 1 },  // down
            { x: -1, y: 0 }  // left
        ];

        if (diagonal) {
            directions.push(
                { x: 1, y: -1 },  // up-right
                { x: 1, y: 1 },   // down-right
                { x: -1, y: 1 },  // down-left
                { x: -1, y: -1 }  // up-left
            );
        }

        for (const dir of directions) {
            const newX = node.x + dir.x;
            const newY = node.y + dir.y;

            if (newX >= 0 && newX < gridWidth && newY >= 0 && newY < gridHeight) {
                if (!grid[newY] || grid[newY][newX] !== 1) { // 1 = obstacle
                    neighbors.push({ x: newX, y: newY });
                }
            }
        }

        return neighbors;
    },

    /**
     * Bresenham's line algorithm - draw line on grid
     */
    bresenham(x0, y0, x1, y1) {
        const line = [];
        const dx = Math.abs(x1 - x0);
        const dy = Math.abs(y1 - y0);
        const sx = x0 < x1 ? 1 : -1;
        const sy = y0 < y1 ? 1 : -1;
        let err = dx - dy;

        let x = x0;
        let y = y0;

        while (true) {
            line.push({ x, y });

            if (x === x1 && y === y1) break;

            const e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x += sx;
            }
            if (e2 < dx) {
                err += dx;
                y += sy;
            }
        }

        return line;
    },

    /**
     * Simplify a path using line of sight
     */
    simplifyPath(path) {
        if (path.length <= 2) return path;

        const simplified = [path[0]];

        for (let i = 2; i < path.length; i++) {
            const last = simplified[simplified.length - 1];
            const current = path[i];
            const prev = path[i - 1];

            // Check if we can skip prev by going directly from last to current
            if (!this.lineOfSight(last, current)) {
                simplified.push(prev);
            }
        }

        simplified.push(path[path.length - 1]);
        return simplified;
    },

    /**
     * Check if there's a direct line of sight
     */
    lineOfSight(p1, p2, obstacles = []) {
        const line = this.bresenham(p1.x, p1.y, p2.x, p2.y);
        for (const point of line) {
            for (const obstacle of obstacles) {
                if (point.x === obstacle.x && point.y === obstacle.y) {
                    return false;
                }
            }
        }
        return true;
    },

    /**
     * Smooth a path for visual movement
     */
    smoothPath(path, tension = 0.5) {
        if (path.length < 3) return path;

        const smoothed = [path[0]];

        for (let i = 1; i < path.length - 1; i++) {
            const p0 = path[i - 1];
            const p1 = path[i];
            const p2 = path[i + 1];

            const x = p1.x + (p2.x - p0.x) * tension;
            const y = p1.y + (p2.y - p0.y) * tension;

            smoothed.push({ x, y });
            smoothed.push(p1);
        }

        smoothed.push(path[path.length - 1]);
        return smoothed;
    }
};
