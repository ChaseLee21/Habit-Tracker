class Emoji {
    constructor (emoji, x, y, velX, velY, color, size) {
        this.emoji = emoji
        this.x = x
        this.y = y
        this.velX = velX
        this.velY = velY
        this.color = color
        this.size = size
    }

    draw (ctx) {
        ctx.fillStyle = this.color
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
                    emojis[j].color = this.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
                }
            }
        }
    }
}

export default Emoji
