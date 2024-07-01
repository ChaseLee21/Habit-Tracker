import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getUser } from '../util/axios'
import Emoji from '../classes/emoji'
import { random } from '../util/helpers'

function Progress (props) {
    const userId = props.user.user.id || ''
    const [user, setUser] = useState({})

    useEffect(() => {
        async function fetchUser () {
            try {
                const userData = await getUser(userId)
                if (userData) {
                    setUser(userData)
                    console.log(userData)
                } else {
                    console.log('No user data found')
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchUser()
    }, [])
    
    useEffect(() => {
        if (user.emojis) {
            initCanvas()
        }
    }, [user.emojis])

    useEffect(() => {
        document.title = 'Progress | Habit Tracker'
    }, [])

    function initCanvas () {
        // Set up canvas
        const canvas = document.querySelector('canvas')
        const ctx = canvas.getContext('2d')
        // Adjust for device pixel ratio
        const dpr = window.devicePixelRatio || 1
        const rect = canvas.getBoundingClientRect()
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        ctx.scale(dpr, dpr)
        // Clear canvas and draw emojis
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        const emojiArray = Array.from(user.emojis).filter((emoji, index) => index % 2 === 0 && emoji !== '')
        drawEmojis(ctx, emojiArray)
    }

    function drawEmojis (ctx, emojiString) {
        const y = ctx.canvas.height / 100
        const size = 40
        const emojis = emojiString.map(emoji => {
            return new Emoji(emoji, random(0, ctx.canvas.width), y, random(-1, 1), random(-1, 1), size)
        })
        emojis.forEach(emoji => {
            console.log(emoji)
            emoji.update(ctx.canvas)
            emoji.draw(ctx)
            emoji.collisionDetect(emojis)
        })
        requestAnimationFrame(() => updateEmojis(ctx, emojis))
    }

    function updateEmojis (ctx, emojis) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        emojis.forEach(emoji => {
            emoji.collisionDetect(emojis)
            emoji.update(ctx.canvas)
            emoji.draw(ctx)
        })
        requestAnimationFrame(() => updateEmojis(ctx, emojis))
    }

    return (
        <>
            <main>
                <canvas className='w-full h-full min-h-[80vh]'>

                </canvas>
            </main>
        </>
    )
}

Progress.propTypes = {
    user: PropTypes.shape({
        user: PropTypes.shape({
            id: PropTypes.string
        })
    }).isRequired
}

export default Progress
