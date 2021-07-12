import React, { Component } from 'react'
import axios from 'axios'
import "core-js/stable";
import "regenerator-runtime/runtime";
import Filters from './Filters'
import Pokemon from './Pokemon'
import PokemonDetails from './PokemonDetails'
import { Link } from "react-router-dom";

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
            limit: 24,
            offset: 0,
            sortBy: 'sortid',
            searchText: '',
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
            selectedType: "all types",
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
        let sortedArray = unsortedArray.sort((a, b) => this.state.sortBy === 'sortid' ? a.id > b.id ? 1 : -1 : a.name > b.name ? 1 : -1)
        sortedArray = this.state.searchText.length == 0 ? sortedArray : sortedArray.filter(item => item.name.includes(this.state.searchText.toLowerCase()))
        this.state.selectedType === "all types" ? finalArray = sortedArray 
        :
            sortedArray.forEach((pokemon, index) => {
                pokemon.types.forEach((type, index) => {
                    if (type.type.name === typeFilter) {
                        finalArray.push(pokemon);
                    }
                });
            })
        this.setState({pokemonData: finalArray, isLoading: false})
    }
    handleSorting = (e) => {
        switch(e.target.value) {
            case 'kanto': 
                this.setState(() => ({ limit: this.state.regions[0].limit, offset: this.state.regions[0].offset, isLoading: true, region: 'kanto', selectedType: 'all types', sortBy: 'sortid' }), () => { this.getPokemons(this.state.limit, this.state.offset, this.state.selectedType) })
                break;
            case 'johto':
                this.setState(() => ({ limit: this.state.regions[1].limit, offset: this.state.regions[1].offset, isLoading: true, region: 'johto', selectedType: 'all types', sortBy: 'sortid' }), () => { this.getPokemons(this.state.limit, this.state.offset, this.state.selectedType) })
                break;
            case 'hoenn':
                this.setState(() => ({ limit: this.state.regions[2].limit, offset: this.state.regions[2].offset, isLoading: true, region: 'hoenn', selectedType: 'all types', sortBy: 'sortid' }), () => { this.getPokemons(this.state.limit, this.state.offset, this.state.selectedType) })
                break;
            case 'sortid':
                this.setState(() => ({ sortBy: e.target.value }), () => { this.getPokemons(this.state.limit, this.state.offset, this.state.selectedType, this.state.sortBy) })
                break;
            case 'sortname':
                this.setState(() => ({ sortBy: e.target.value }), () => { this.getPokemons(this.state.limit, this.state.offset, this.state.selectedType, this.state.sortBy) })
                break;
            default: 
                this.setState(() => ({ selectedType: e.target.value }), () => { this.getPokemons(this.state.limit, this.state.offset, this.state.selectedType, this.state.sortBy) })
        } 
    }
    handleSearch = (e) => {
        this.setState({ searchText: e.target.value }, () => { this.getPokemons(this.state.limit, this.state.offset, this.state.selectedType, this.state.sortBy) })
    }
    render() {
        return (
            this.state.isLoading === true ? <p>COMPONENT LOADING</p> 
            : 
            <div className="container">
                    <Filters 
                        regions={this.state.regions} 
                        region={this.state.region} 
                        handleSorting={this.handleSorting}
                        handleSearch={this.handleSearch}
                        types={this.state.types}
                        selectedType={this.state.selectedType}
                        />
                <div className="pokecards">
                        {this.state.pokemonData.length == 0 ? <p>No such Pokemon 
                        :
                        (</p> : Object.keys(this.state.pokemonData).map((index) => {
                            return (
                                <div className="pokemon__card__wrapper" key={this.state.pokemonData[index].name}>
                                    <Link className="pokemon__link" key={this.state.pokemonData[index].name} to={{ pathname: `/${this.state.pokemonData[index].name}`, state: { ...this.state.pokemonData[index]}}}>
                                        <Pokemon
                                            name={this.state.pokemonData[index].name}
                                            key={this.state.pokemonData[index].name}
                                            image={this.state.pokemonData[index].sprites.other["official-artwork"].front_default}
                                            id={this.state.pokemonData[index].id}
                                            types={this.state.pokemonData[index].types}
                                        />
                                    </Link>
                                </div>
                            )
                        })}
                </div>
            </div>
        )
    }
}