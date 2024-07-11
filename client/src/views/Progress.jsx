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
        // create engine
        const engine = Engine.create()
        const world = engine.world
        const render = Render.create({
            element: document.querySelector('#canvas'),
            engine: engine,
            options: {
                width: 800,
                height: 600,
                background: '#FFF',
                wireframes: false
            }
        })
        Render.run(render)

        // create runner
        var runner = Runner.create()
        Runner.run(runner, engine)

        let renderEmojis = []
        for (let emoji of testEmojis) {
            const spriteUrl = `https://emojicdn.elk.sh/${encodeURIComponent(emoji)}`
            const x = Math.random() * 800
            const y = 0
            renderEmojis.push(Bodies.circle(x, y, 20, {render: {sprite: {texture: spriteUrl, xScale: 0.25, yScale: 0.25}}}))
        }

        // walls
        Composite.add(world, [
            Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
            Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
            Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
            Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
        ])

        //emojis
        Composite.add(world, renderEmojis)

        // fit the render viewport to the scene
        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: 800, y: 600 }
        })
    }

    return (
        <main id='canvas' className='m-2 grid grid-cols-5'>
        
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
