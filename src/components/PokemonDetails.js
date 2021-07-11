import React from 'react'

export default function PokemonDetails(props) {
    return (
        <div>
            <p>This is the page for {props.location.state.name}!</p>
        </div>
    )
}

