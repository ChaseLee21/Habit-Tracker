class Emoji {
    constructor (emoji, x, y, velX, velY, size) {
        this.emoji = emoji
        this.x = x
        this.y = y
        this.velX = velX
        this.velY = velY
        this.size = size
        this.gravity = 0.1
        this.friction = 0.9
    }

    draw(ctx) {
        // Draw the emoji
        ctx.textBaseline = 'top'
        ctx.font = `${this.size}px "Segoe UI Emoji", sans-serif`

        const adjustX = this.size * 0.15

        ctx.fillText(this.emoji, this.x - adjustX, this.y)
        // Set border color and thickness
        // ctx.strokeStyle = 'black'
        // ctx.lineWidth = 1 
        // const rectX = this.x
        // const rectY = this.y 
        // const rectWidth = this.size
        // const rectHeight = this.size
        // ctx.strokeRect(rectX, rectY, rectWidth, rectHeight)
    }

    update (canvas) {
        // Check for bottom boundary
        if (this.y + this.size >= canvas.height) {
            this.y = canvas.height - this.size;
            this.velY *= -1; // Reverse velocity to bounce off the boundary
        }

        // Add check for top boundary
        if (this.y - this.size <= 0) {
            this.y = this.size;
            this.velY *= -1; // Reverse velocity to bounce off the boundary
        }

        // Add check for right boundary
        if (this.x + this.size >= canvas.width) {
            this.x = canvas.width - this.size;
            this.velX *= -1; // Reverse velocity to bounce off the boundary
        }

        // Add check for left boundary
        if (this.x - this.size <= 0) {
            this.x = this.size;
            this.velX *= -1; // Reverse velocity to bounce off the boundary
        }

        this.x += this.velX;
        this.y += this.velY;
    }
        
    collisionDetect(emojis, canvas) {
        for (let j = 0; j < emojis.length; j++) {
            if (!(this === emojis[j]) && !emojis[j].cooldown) {
                const dx = this.x - emojis[j].x;
                const dy = this.y - emojis[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
    
                if (distance < this.size + emojis[j].size) {
                    // Elastic collision physics with reduced impact
                    const nx = dx / distance;
                    const ny = dy / distance;
                    const p = 2 * (this.velX * nx + this.velY * ny - emojis[j].velX * nx - emojis[j].velY * ny) / (this.mass + emojis[j].mass) * 0.5; // Scale down the velocity change
    
                    this.velX -= p * this.mass * nx;
                    this.velY -= p * this.mass * ny;
                    emojis[j].velX += p * emojis[j].mass * nx;
                    emojis[j].velY += p * emojis[j].mass * ny;
    
                    // Apply cooldown to prevent immediate recollision
                    this.cooldown = true;
                    emojis[j].cooldown = true;
                    setTimeout(() => { this.cooldown = false; emojis[j].cooldown = false; }, 100);
    
                    // Velocity damping with reduced impact
                    this.velX *= 0.9;
                    this.velY *= 0.9;
                    emojis[j].velX *= 0.9;
                    emojis[j].velY *= 0.9;
    
                    // Adjust positions to ensure minimal overlap with careful adjustment
                    const overlap = 0.5 * (this.size + emojis[j].size - distance); // Reduced overlap adjustment
                    const adjustX = overlap * (dx / distance);
                    const adjustY = overlap * (dy / distance);
    
                    this.x += adjustX;
                    this.y += adjustY;
                    emojis[j].x -= adjustX;
                    emojis[j].y -= adjustY;
    
                    // Ensure emojis are within canvas bounds after adjustment
                    this.x = Math.max(this.size, Math.min(this.x, canvas.width - this.size));
                    this.y = Math.max(this.size, Math.min(this.y, canvas.height - this.size));
                    emojis[j].x = Math.max(emojis[j].size, Math.min(emojis[j].x, canvas.width - emojis[j].size));
                    emojis[j].y = Math.max(emojis[j].size, Math.min(emojis[j].y, canvas.height - emojis[j].size));
                }
            }
        }
    }
}

export default Emoji
