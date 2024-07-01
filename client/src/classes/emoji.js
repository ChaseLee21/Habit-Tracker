class Emoji {
    constructor (emoji, x, y, velX, velY, size) {
        this.emoji = emoji
        this.x = x
        this.y = y
        this.velX = velX
        this.velY = velY
        this.size = size
        this.gravity = 0.1
    }

    draw (ctx) {
        ctx.font = `${this.size}px "Segoe UI Emoji", sans-serif`
        ctx.fillText(this.emoji, this.x, this.y)
    }

    update (canvas) {
        if (this.x + this.size > canvas.width || this.x < 0) {
            this.velX = -this.velX
        }

        if (this.y + this.size > canvas.height || this.y < 0) {
            this.velY = -this.velY
        }

        if (this.y + this.size < canvas.height) {
            this.velY += this.gravity
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

                if (distance < this.size + emojis[j].size) {
                    emojis[j].velX = -emojis[j].velX
                    emojis[j].velY = -emojis[j].velY
                    this.velX = -this.velX
                    this.velY = -this.velY
                }
            }
        }
    }
}

export default Emoji
