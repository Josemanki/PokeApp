import React, { Component } from 'react'
import axios from 'axios'
import "core-js/stable";
import "regenerator-runtime/runtime";
import Filters from './Filters'
import Pokemon from './Pokemon'
import LazyLoad from 'react-lazyload';
import { Link } from "react-router-dom";

export default class PageHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allPokemons: [],
            pokemonData: [
                {
                    species: ''
                }
            ],
            pokeName: '',
            pokeNumber: '',
            isLoading: true,
            region: 'kanto',
            limit: 151,
            offset: 0,
            sortBy: 'sortid',
            searchText: '',
            regions: [
                {
                    name: "kanto",
                    limit: 151,
                    offset: 0,
                },
                {
                    name: "johto",
                    limit: 100,
                    offset: 151,
                },
                {
                    name: "hoenn",
                    limit: 135,
                    offset: 251,
                },
                {
                    name: "sinnoh",
                    limit: 108,
                    offset: 386,
                },
                {
                    name: "unova",
                    limit: 155,
                    offset: 494,
                },
                {
                    name: "kalos",
                    limit: 72,
                    offset: 649,
                },
                {
                    name: "alola",
                    limit: 88,
                    offset: 721,
                },
                {
                    name: "galar",
                    limit: 89,
                    offset: 809,
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
            case 'sinnoh':
                this.setState(() => ({ limit: this.state.regions[2].limit, offset: this.state.regions[3].offset, isLoading: true, region: 'sinnoh', selectedType: 'all types', sortBy: 'sortid' }), () => { this.getPokemons(this.state.limit, this.state.offset, this.state.selectedType) })
                break;
            case 'unova':
                this.setState(() => ({ limit: this.state.regions[2].limit, offset: this.state.regions[4].offset, isLoading: true, region: 'unova', selectedType: 'all types', sortBy: 'sortid' }), () => { this.getPokemons(this.state.limit, this.state.offset, this.state.selectedType) })
                break;
            case 'kalos':
                this.setState(() => ({ limit: this.state.regions[2].limit, offset: this.state.regions[5].offset, isLoading: true, region: 'kalos', selectedType: 'all types', sortBy: 'sortid' }), () => { this.getPokemons(this.state.limit, this.state.offset, this.state.selectedType) })
                break;
            case 'alola':
                this.setState(() => ({ limit: this.state.regions[2].limit, offset: this.state.regions[6].offset, isLoading: true, region: 'alola', selectedType: 'all types', sortBy: 'sortid' }), () => { this.getPokemons(this.state.limit, this.state.offset, this.state.selectedType) })
                break;
            case 'galar':
                this.setState(() => ({ limit: this.state.regions[2].limit, offset: this.state.regions[7].offset, isLoading: true, region: 'galar', selectedType: 'all types', sortBy: 'sortid' }), () => { this.getPokemons(this.state.limit, this.state.offset, this.state.selectedType) })
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
            this.state.isLoading === true ? 
            <div className="loading__screen">
                <img className="loading__screen__gif" src="./assets/pikachu.gif" alt="" />
                <img src="./assets/loading.png" alt="" />
            </div> 
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
                        {this.state.pokemonData.length == 0 ? 
                        <div className="not__found">
                                <p>No such Pokemon :(</p>
                        </div>
                         : 
                         Object.keys(this.state.pokemonData).map((index) => {
                            return (
                                <div className="pokemon__card__wrapper" key={this.state.pokemonData[index].name}>
                                    <Link className="pokemon__link" key={this.state.pokemonData[index].name} to={{ pathname: `/${this.state.pokemonData[index].name}`, pokeurl: { url: this.state.pokemonData[index].species.url }}}>
                                        <LazyLoad height={350}>
                                        <Pokemon
                                            name={this.state.pokemonData[index].name}
                                            key={this.state.pokemonData[index].name}
                                            image={this.state.pokemonData[index].sprites.other["official-artwork"].front_default}
                                            id={this.state.pokemonData[index].id}
                                            types={this.state.pokemonData[index].types}
                                        />
                                        </LazyLoad>
                                    </Link>
                                </div>
                            )
                        })}
                </div>
            </div>
        )
    }
}