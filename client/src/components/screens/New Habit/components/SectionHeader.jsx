import React from 'react'
import PropTypes from 'prop-types'

function SectionHeader ({ title, subtext }) {
    return (
        <header>
            <h2 className='text-xl'>{ title }</h2>
            <p> { subtext }</p>
        </header>
    )
}

SectionHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtext: PropTypes.string
}

export default SectionHeader
