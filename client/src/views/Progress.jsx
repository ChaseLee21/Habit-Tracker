import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getUser } from '../util/axios'
import Emoji from '../classes/emoji'
import { random, splitEmoji } from '../util/helpers'

function Progress (props) {
    const userId = props.user.user.id || ''
    const [user, setUser] = useState({})
    const testEmojis = '🍎🍏🍊🍋🍌🍉🍇🍓🍈🍒🍑🥭🍍🥥🧀🥚🍳🥞🥓🥩🍗🍖🌭🍔🍟🍕🥪🥙🌮🌯🥗🥘🥫🍝🍜🍲🍛🍣🍱🥟🍤🍙🍚🍘🍥🥠🍢🍡🍧🍨🍦🥧🧁🍰🎂🍮🍭🍬🍫🍿🍩🍪🌰🥜🍯🥛🍼🍵🍶🍺🍻🥂🍷🥃🍸🍹🍾🥤🧃🧉🧊🥢🍽🍴🥄🔪🏺🌍🌎🌏🌐🗺🗾🧭'

    useEffect(() => {
        async function fetchUser () {
            try {
                const userData = await getUser(userId)
                if (userData) {
                    setUser(userData)
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
        // Set canvas width and height
        const canvasContainer = document.getElementById('canvasContainer')
        const canvasWidth = canvasContainer ? canvasContainer.offsetWidth : window.innerWidth * 0.97
        const canvasHeight = canvasContainer ? canvasContainer.offsetHeight : window.innerHeight * 0.97
        console.log(canvasWidth, canvasHeight, canvasContainer.offsetWidth, canvasContainer.offsetHeight, canvasContainer)
        // Adjust for device pixel ratio
        const dpr = window.devicePixelRatio || 1
        const rect = canvas.getBoundingClientRect()
        console.log(rect)
        // TODO: fix canvas width and height to match container which is being resized too big because of dpr
        canvas.width = canvasWidth * dpr
        canvas.height = canvasHeight * dpr
        console.log(canvas.width, canvas.height, dpr)
        ctx.scale(dpr, dpr)
        // Clear canvas and draw emojis
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        const emojiArray = splitEmoji(testEmojis)
        drawEmojis(ctx, emojiArray)
    }

    function drawEmojis(ctx, emojiString) {
        const y = ctx.canvas.height / 6
        const size = 40
        const emojis = emojiString.map(emoji => {
            return new Emoji(emoji, random(0, ctx.canvas.width), y, random(-0.5, 0.5), random(-0.5, 0.5), size)
        })
        console.log(emojis)
        emojis.forEach(emoji => {
            emoji.update(ctx.canvas)
            emoji.draw(ctx)
            emoji.collisionDetect(emojis, ctx.canvas)
        })
        requestAnimationFrame(() => updateEmojis(ctx, emojis))
    }

    function updateEmojis (ctx, emojis) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        emojis.forEach(emoji => {
            emoji.collisionDetect(emojis, ctx.canvas)
            emoji.update(ctx.canvas)
            emoji.draw(ctx)
        })
        requestAnimationFrame(() => updateEmojis(ctx, emojis))
    }

    return (
        <main id='canvasContainer' className='m-2 grid grid-cols-5'>
            <canvas className='border border-black col-span-5' >

            </canvas>
        </main>
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
