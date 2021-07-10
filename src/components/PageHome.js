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
            pokeNumber: '',
            isLoading: true,
            region: 'kanto',
            limit: 20,
            offset: 0,
            regions: [
                {
                    name: 'kanto',
                    limit: 20,
                    offset: 0
                }, 
                {
                    name: 'johto',
                    limit: 20,
                    offset: 20
                },
                {
                    name: 'hoenn',
                    limit: 20,
                    offset: 40
                }
            ],
            types: [
                "all types", "grass", "bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost", "ground", "ice", "normal", "poison", "psychic", "rock", "steel", "water"
            ],
            selectedType: "water",
            filters: {
                region: 'kanto',
                type: 'all types',
            }
        }
    }
    componentDidMount() {
        this.getPokemons(this.state.limit, this.state.offset, this.state.selectedType)
    }
    getPokemons = async (limit, offset, typeFilter) => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
        this.getCardData(response.data.results, typeFilter)
    }
    getCardData = async (result, typeFilter, sortBy) => {
        const unsortedArray = []
        let finalArray = []
        await Promise.all(
        result.map((pokemonItem) => {
            return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonItem.name}`)
            .then((result) => {
                unsortedArray.push(result.data)
            })
        })
        );
        const sortedArray = unsortedArray.sort((a,b) => a.id > b.id ? 1 : -1)
        sortedArray.forEach((pokemon, index) => {
            pokemon.types.forEach((type, index) => {
                if(type.type.name === typeFilter) {
                    finalArray.push(pokemon);
                }
            });
        })
        this.setState({pokemonData: finalArray, isLoading: false})
    }
    handleOffsetChange = async (e) => {
        console.log(e.target.value);
        switch(e.target.value) {
            case 'kanto': 
                this.setState(() => ({ limit: this.state.regions[0].limit, offset: this.state.regions[0].offset, isLoading: true, region: 'kanto' }), () => { this.getPokemons(this.state.limit, this.state.offset, this.state.selectedType) })
                break;
            case 'johto':
                this.setState(() => ({ limit: this.state.regions[1].limit, offset: this.state.regions[1].offset, isLoading: true, region: 'johto' }), () => { this.getPokemons(this.state.limit, this.state.offset, this.state.selectedType) })
                break;
            case 'hoenn':
                this.setState(() => ({ limit: this.state.regions[2].limit, offset: this.state.regions[2].offset, isLoading: true, region: 'hoenn' }), () => { this.getPokemons(this.state.limit, this.state.offset, this.state.selectedType) })
                break;
            default: 
                this.setState(() => ({ selectedType: e.target.value }), () => { this.getPokemons(this.state.limit, this.state.offset, this.state.selectedType) })
        }
        
    }
    filterPokemon = () => {

    }
    render() {
        return (
            this.state.isLoading === true ? <p>COMPONENT LOADING</p> 
            : 
            <div className="container">
                    <Filters 
                        regions={this.state.regions} 
                        region={this.state.region} 
                        handleOffsetChange={this.handleOffsetChange}
                        types={this.state.types}
                        selectedType={this.state.selectedType}
                        />
                <div className="pokecards">
                    {Object.keys(this.state.pokemonData).map((index) => {
                        return (
                            <Pokemon
                                name={this.state.pokemonData[index].name}
                                key={this.state.pokemonData[index].name}
                                image={this.state.pokemonData[index].sprites.other["official-artwork"].front_default}
                                id={this.state.pokemonData[index].id}
                            />)
                    })}
                </div>
            </div>
        )
    }
}