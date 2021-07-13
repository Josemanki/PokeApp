import React from 'react'

export default function Filters(props) {
    return (
        <div className="filters-tab">
            <div className="filter__option">
                <label htmlFor="region-select">Region</label>
                <select value={props.region} onChange={props.handleSorting} name="region-select" id="region-select" className="capitalize filter__input region-select">
                    {props.regions.map((item) => {
                        return <option key={item.name} value={item.name}>{item.name}</option>
                    })}
                </select>
            </div>
            <div className="filter__option">
                <label htmlFor="type-select">Type</label>
                <select value={props.selectedType} onChange={props.handleSorting} name="type-select" id="type-select" className="capitalize filter__input type-select">
                    {props.types.map((item) => {
                        return <option key={item} value={item}>{item}</option>
                    })}
                </select>
            </div>
            <div className="filter__option">
                <label htmlFor="sort-by">Sort by</label>
                <select onChange={props.handleSorting} name="sort-by" id="sort-by" className="filter__input">
                    <option value="sortid">ID</option>
                    <option value="sortname">Name</option>
                </select>
            </div>
            <div className="filter__option">
                <label htmlFor="pokemon-search">Search</label>
                <input autoComplete="off" onChange={props.handleSearch} type="text" name="pokemon-search" id="pokemon-search" placeholder="Search here" className="filter__input" />
            </div>
        </div>
    )
}
