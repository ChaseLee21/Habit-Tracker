import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getUser } from '../util/axios'
import { Engine, Render, Runner, Composites, MouseConstraint, Mouse, Composite, Bodies } from 'matter-js'

function Progress (props) {
    const userId = props.user.user.id || ''
    const [user, setUser] = useState({})
    const testEmojis = '🍎🍏🍊🍋🍌🍉🍇🍓🍈🍒🍑🥭🍍🥥🧀🥚🍳🥞🥓🥩🍗🍖🌭🍔🍟🍕🥪🥙🌮🌯🥗🥘🥫🍝🍜🍲🍛🍣🍱🥟🍤🍙🍚🍘🍥🥠🍢🍡🍧🍨🍦🥧🧁🍰🎂🍮🍭🍬🍫🍿🍩🍪🌰🥜🍯🥛🍼🍵🍶🍺🍻🥂🍷🥃🍸🍹🍾🥤🧃🧉🧊🥢🍽🍴🥄🔪🏺🌍🌎🌏🌐🗺🗾🧭'

    // Retrieve user data
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

    // Set page title
    useEffect(() => {
        document.title = 'Progress | Habit Tracker'
    }, [])
    
    // Initialize canvas after user data is retrieved
    useEffect(() => {
        if (user.emojis) {
            initCanvas()
        }
    }, [user.emojis])


    function initCanvas () {
        const canvasWidth = 1200
        const canvasHeight = 600
        const wallThickness = 10
        // create engine
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

        // create runner
        var runner = Runner.create()
        Runner.run(runner, engine)

        let renderEmojis = []
        for (let emoji of testEmojis) {
            const spriteUrl = `https://emojicdn.elk.sh/${encodeURIComponent(emoji)}`
            const x = Math.random() * canvasWidth
            const y = 0
            renderEmojis.push(Bodies.circle(x, y, 20, {render: {sprite: {texture: spriteUrl, xScale: 0.25, yScale: 0.25}}}))
        }

        // walls
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

        //emojis
        Composite.add(world, renderEmojis)

        // fit the render viewport to the scene
        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: canvasWidth, y: canvasHeight }
        })
    }

    return (
        <main id='canvas'>
        
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
