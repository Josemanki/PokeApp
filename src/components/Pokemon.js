import React from 'react'

export default function Pokemon(props) {
    return (
        <div className="pokemon__card__wrapper">
            <div className="pokemon__card">
                <h3>{`#${props.id}`}</h3>
                <img className="pokemon__sprite" src={props.image} alt="Chansey" />
                <h3 className="capitalize pokemon__name">{props.name}</h3>
                <div className="pokemon__card__elements">
                    <div>{props.types.map((item) => {
                        return <p key={item.type.name}>{item.type.name}</p>
                    })}</div>
                </div>
            </div>
        </div>
    )
}
