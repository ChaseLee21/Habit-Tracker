import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getUser } from '../util/axios'
import { Engine, Render, Runner, Composite, Bodies } from 'matter-js'

function Progress (props) {
    // constants
    const userId = props.user.user.id || ''
    const testEmojis = '🍎🍏🍊🍋🍌🍉🍇🍓🍈🍒🍑🥭🍍🥥🧀🥚🍳🥞🥓🥩🍗🍖🌭🍔🍟🍕🥪🥙🌮🌯🥗🥘🥫🍝🍜🍲🍛🍣🍱🥟🍤🍙🍚🍘🍥🥠🍢🍡🍧🍨🍦🥧🧁🍰🎂🍮🍭🍬🍫🍿🍩🍪🌰🥜🍯🥛🍼🍵🍶🍺🍻🥂🍷🥃🍸🍹🍾🥤🧃🧉🧊🥢🍽🍴🥄🔪🏺🌍🌎🌏🌐🗺🗾🧭'
    
    // useState hooks
    const [user, setUser] = useState({})

    // UseEffect hooks
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
    }, []) // Retrieve user data
    useEffect(() => {
        document.title = 'Progress | Habit Tracker'
    }, []) // Set page title
    useEffect(() => {
        if (user.emojis) {
            initCanvas()
        }
    }, [user.emojis]) // Initialize canvas after user data is retrieved

    function initCanvas () {
        // Setting canvas dimensions
        const canvasWidth = document.getElementById('canvasContainer').offsetWidth
        const canvasHeight = document.getElementById('canvasContainer').offsetHeight
        console.log(canvasWidth, canvasHeight)
        console.log(document.getElementById('canvasContainer'))

        // Creating engine
        const engine = Engine.create()
        const world = engine.world
        const render = Render.create({
            element: document.querySelector('#canvas'),
            engine: engine,
            options: {
                width: canvasWidth,
                height: canvasHeight,
                background: '#FFF',
                wireframes: true
            }
        })
        Render.run(render)
        
        // Creating runner
        var runner = Runner.create()
        Runner.run(runner, engine)
        
        // Creating walls
        const wallThickness = 10
        Composite.add(world, [
            // top
            Bodies.rectangle(canvasWidth/2, 0, canvasWidth, wallThickness, { isStatic: true }),
            // bottom
            Bodies.rectangle(canvasWidth/2, canvasHeight, canvasWidth, wallThickness, { isStatic: true }),
            // left
            Bodies.rectangle(0, canvasHeight/2, wallThickness, canvasHeight, { isStatic: true }),
            // right
            Bodies.rectangle(canvasWidth, canvasHeight/2, wallThickness, canvasHeight, { isStatic: true }),
        ])

        // Creating emojis
        let renderEmojis = []
        for (let emoji of testEmojis) {
            const spriteUrl = `https://emojicdn.elk.sh/${encodeURIComponent(emoji)}`
            const x = Math.random() * canvasWidth
            const y = 0
            renderEmojis.push(Bodies.circle(x, y, 20, {render: {sprite: {texture: spriteUrl, xScale: 0.25, yScale: 0.25}}}))
        }
        Composite.add(world, renderEmojis)

        // Centering the render viewport to the scene
        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: canvasWidth, y: canvasHeight }
        })
    }

    return (
        <div id='canvasContainer' className='h-full w-full'>
            <main id='canvas'>
            
            </main>
        </div>
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
