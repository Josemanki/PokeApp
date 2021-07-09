import React from 'react'

export default function Pokemon(props) {
    return (
        <div className="pokemon__card__wrapper">
            <div className="pokemon__card">
                <h3>{`#${props.id}`}</h3>
                <img className="pokemon__sprite" src={props.image} alt="Chansey" />
                <h3>{props.name}</h3>
                <div className="pokemon__card__elements">
                    <img src="https://via.placeholder.com/30" alt="Normal" />
                    <img src="https://via.placeholder.com/30" alt="Normal" />
                </div>
            </div>
        </div>
    )
}
