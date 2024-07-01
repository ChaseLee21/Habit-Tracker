class Emoji {
    constructor (emoji, x, y, velX, velY, size) {
        this.emoji = emoji
        this.x = x
        this.y = y
        this.velX = velX
        this.velY = velY
        this.size = size
        this.gravity = 0.9
        this.friction = 0.9
    }

    draw(ctx) {
        // Draw the emoji
        ctx.font = `${this.size}px "Segoe UI Emoji", sans-serif`
        ctx.fillText(this.emoji, this.x, this.y)
        // Set border color and thickness
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 1 
        const rectX = this.x
        const rectY = this.y 
        const rectWidth = this.size
        const rectHeight = this.size
        ctx.strokeRect(rectX, rectY, rectWidth, rectHeight)
    }

    update (canvas) {
        if (this.x + this.size > canvas.width || this.x < 0) {
            this.velX = -this.velX
            if (this.velX === 0) {
                this.velX += .03
            }
        }

        if (this.y + this.size > canvas.height || this.y < 0) {
            this.velY = -this.velY
            this.velY = this.velY * this.friction
        }

        if (this.y + this.size < canvas.height) {
            this.velY += this.gravity
        } else if (this.y + this.size >= canvas.height){
            // Friction applied to emojis X Velocity when emoji is on the ground
            this.velX = this.velX * this.friction
        }

        this.x += this.velX
        this.y += this.velY
    }

    collisionDetect (emojis) {
        for (let j = 0; j < emojis.length; j++) {
            if (!(this === emojis[j])) {
                const dx = this.x - emojis[j].x
                const dy = this.y - emojis[j].y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance <= this.size) {
                    // Reverse velocities
                    this.velX = -this.velX
                    emojis[j].velX = -emojis[j].velX
                
                    // Move emojis apart to reduce overlap
                    const overlap = (this.size) - distance
                    const adjustX = (overlap / 2) * (dx / distance)
                    const adjustY = (overlap / 2) * (dy / distance)
                
                    this.x += adjustX
                    this.y += adjustY
                    emojis[j].x -= adjustX
                    emojis[j].y -= adjustY
                }
            }
        }
    }
}

export default Emoji
