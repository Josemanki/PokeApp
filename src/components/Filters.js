import React from 'react'

export default function Filters(props) {
    return (
        <div className="filters-tab">
            <select value={props.region} onChange={props.handleOffsetChange} name="region-select" id="region-select" className="capitalize region-select">
                {props.regions.map((item) => {
                    return <option key={item.name} value={item.name}>{item.name}</option>
                })}
            </select>
            <select value={props.selectedType} onChange={props.handleOffsetChange} name="type-select" id="type-select" className="capitalize type-select">
                {props.types.map((item) => {
                    return <option key={item} value={item}>{item}</option>
                })}
            </select>
            <select name="sort-by" id="sort-by">
                <option value="id">ID</option>
                <option value="name">Name</option>
            </select>
            <input type="text" name="pokemon-search" id="pokemon-search" placeholder="Search here" />
        </div>
    )
}
