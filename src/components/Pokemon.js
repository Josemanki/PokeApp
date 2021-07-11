import React from 'react'
import { colorTypeGradients } from '../utils/utils'

export default function Pokemon(props) {
    let finalColor;

    if (props.types.length == 2) {
        finalColor = colorTypeGradients(props.types[0].type.name, props.types[1].type.name, props.types.length)
    } else {
        finalColor = colorTypeGradients(props.types[0].type.name, props.types[0].type.name, props.types.length)
    }

    return (
            <div className="pokemon__card" style={ { background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})`} }>
                <h3>{`#${props.id}`}</h3>
                <img className="pokemon__sprite" src={props.image} alt={`${props.name}`} />
                <h3 className="capitalize pokemon__name">{props.name}</h3>
                <div className="pokemon__card__elements">
                    <div className="pokemon__types">
                        {props.types.map((item) => {
                        return <img className="pokemon__type" key={item.type.name} src={`./assets/${item.type.name}.png`} alt="" />
                    })}</div>
                    
                </div>
            </div>
    )
}
