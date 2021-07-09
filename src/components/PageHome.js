import React, { Component } from 'react'
import axios from 'axios'
import "core-js/stable";
import "regenerator-runtime/runtime";
import Filters from './Filters'
import Pokemon from './Pokemon'

export default class PageHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allPokemons: [],
            pokemonData: [],
            pokeName: '',
            pokeNumber: ''
        }
    }
    componentDidMount() {
        this.getPokemons()
    }
    getPokemons = async () => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0`)
        this.getCardData(response.data.results)
    }
    getCardData = async (result) => {
        const unsortedArray = []

        await Promise.all(
        result.map((pokemonItem) => {
            return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonItem.name}`)
            .then((result) => {
                unsortedArray.push(result.data)
            })
        })
        );
        const sortedArray = unsortedArray.sort((a,b) => a.id > b.id ? 1 : -1)
        console.log(sortedArray);
        this.setState({pokemonData: sortedArray})
    }

    render() {
        return (
            <div className="container">
                <Filters />
                <div className="pokecards">
                    {Object.keys(this.state.pokemonData).map((index) => {
                        return (
                            <Pokemon 
                                name={this.state.pokemonData[index].name}
                                key={this.state.pokemonData[index].name} 
                                image={this.state.pokemonData[index].sprites.other["official-artwork"].front_default}
                                id = {this.state.pokemonData[index].id}
                                />)
                    })}
                </div>
            </div>
        )
    }
}