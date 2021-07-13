import React from 'react'
import { colorTypeGradients } from '../utils/utils'
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Pokemon(props) {
    let finalColor;

    if (props.types.length == 2) {
        finalColor = colorTypeGradients(props.types[0].type.name, props.types[1].type.name, props.types.length)
    } else {
        finalColor = colorTypeGradients(props.types[0].type.name, props.types[0].type.name, props.types.length)
    }

    return (
            <div className="pokemon__card grow" style={ { background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})`} }>
            <h3 className="pokemon__number">{`#${String(props.id).padStart(3, '0')}`}</h3>
            <LazyLoadImage
                alt={props.name}
                height={'100px'}
                src={props.image}
                width={'100px'} />
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
