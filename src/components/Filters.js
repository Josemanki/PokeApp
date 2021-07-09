import React from 'react'

export default function Filters() {
    return (
        <div className="filters-tab">
            <select name="region-select" id="region-select">
                <option value="kanto">Kanto</option>
                <option value="johto">Johto</option>
                <option value="hoenn">Hoenn</option>
            </select>
            <select name="type-sort" id="type-sort">
                <option value="ghost">Ghost</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="gras">Grass</option>
            </select>
            <select name="sort-by" id="sort-by">
                <option value="id">ID</option>
                <option value="name">Name</option>
            </select>
            <input type="text" name="pokemon-search" id="pokemon-search" placeholder="Search here" />
        </div>
    )
}
