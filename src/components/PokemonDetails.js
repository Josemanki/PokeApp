import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { colorTypeGradients } from '../utils/utils'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import { lazyload } from 'react-lazyload';

@lazyload({
    height: 200,
    once: true,
    offset: 100
})

export default class PokemonDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemonGenus: '',
            currentPokemon: {
                id: '',
                types:[],
                sprites: {
                    other: {
                        "official-artwork": {
                            front_default: ''
                        }
                    }
                },
                abilities: [],
                stats: [],
                types: [{
                    type: {
                        name: 'normal'
                    },
                    type: {
                        name: 'normal'
                    }
                }],
                species: {
                    url: ''
                }
            },
            genderRate: 0,
            flavorText: '',
            evoChain: '',
            detailsEvoChain: [{
                name: '',
                url: '',
                image: ''
            }]
        }
    }
    componentDidMount = async () => {
        this.fetchCardDetails(`https://pokeapi.co/api/v2/pokemon-species${this.props.match.url}`)
    }
    componentDidUpdate = (prevProps) => {
        if(this.props.match.url != prevProps.match.url) {
            this.fetchCardDetails(`https://pokeapi.co/api/v2/pokemon-species${this.props.match.url}`)
        }
    }
    fetchCardDetails = async (url) => {
        await axios.get(url)
            .then(({data}) => {
                let flavorText = data.flavor_text_entries.filter((item) => item.language.name === 'en')
                this.setState(
                {   
                    pokemonGenus: data.genera.filter((item) => item.language.name === 'en')[0].genus,
                    genderRate: data.gender_rate,
                    evoChain: data.evolution_chain.url,
                    flavorText: flavorText[Math.floor(Math.random() * (flavorText.length - 1) + 1)].flavor_text
                    }, () => { this.fetchEvoChain(this.state.evoChain)})
            })
    }
    fetchEvoChain = async (url) => {
        await axios.get(url)
        .then((response) => {
            let evoData = response.data.chain
            let evoArray = [];
            evoArray.push(evoData.species)
            if(evoData.evolves_to[0].species != undefined) {
                evoArray.push(evoData.evolves_to[0].species)
                if (evoData.evolves_to[0].evolves_to[0] != undefined) {
                    evoArray.push(evoData.evolves_to[0].evolves_to[0].species)
                }
            }
            this.fetchEvoImages(evoArray)
        })
    }
    fetchEvoImages = async (evoArray) => {
        let detailsEvoChain = []
        let currentData = []
        
        const requestArr = evoArray.map(async (item) => {
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${item.name}`).then((res) => {
                currentData.push(res.data)
                detailsEvoChain.push({ ...item, image: res.data.sprites.other["official-artwork"].front_default})
            })
        })
        
        Promise.all(requestArr).then((data) => {
            this.setState({ currentPokemon: currentData.filter((item) => item.name === location.pathname.split('/')[1])[0], detailsEvoChain: detailsEvoChain.sort((a, b) => a.url > b.url ? 1 : -1 )})
        })
    }
    fetchGenderRate = (genderRate) => {

        switch (genderRate) {
            case 0:
                return <div className="details__secondary__description"><span >100% <span style = {{color: 'lightblue'}}>M</span></span><span> 0% <span style={{color: 'pink'}}>F</span></span></div>;
            case 1:
                return <div className="details__secondary__description"><span>87.5% <span style = {{color: 'lightblue'}}>M</span></span> /<span>  12.5% <span style={{color: 'pink'}}>F</span></span></div>;
            case 2:
                return <div className="details__secondary__description"><span>75% <span style = {{color: 'lightblue'}}>M</span></span><span>  25% <span style={{color: 'pink'}}>F</span></span></div>;
            case 3:
                return <div className="details__secondary__description"><span>62.5% <span style = {{color: 'lightblue'}}>M</span></span><span>  37.5% <span style={{color: 'pink'}}>F</span></span></div>;
            case 4:
                return <div className="details__secondary__description"><span>50% <span style = {{color: 'lightblue'}}>M</span></span><span>  50% <span style={{color: 'pink'}}>F</span></span></div>;
            case 5:
                return <div className="details__secondary__description"><span>37.5% <span style = {{color: 'lightblue'}}>M</span></span><span>  62.5% <span style={{color: 'pink'}}>F</span></span></div>;
            case 6:
                return <div className="details__secondary__description"><span>25% <span style = {{color: 'lightblue'}}>M</span></span><span>  75% <span style={{color: 'pink'}}>F</span></span></div>;
            case 7:
                return <div className="details__secondary__description"><span>12.5% <span style = {{color: 'lightblue'}}>M</span></span><span>  87.5% <span style={{color: 'pink'}}>F</span></span></div>;
            case 8:
                return <div className="details__secondary__description"><span>0% <span style = {{color: 'lightblue'}}>M</span></span><span>  100% <span style={{color: 'pink'}}>F</span></span></div>;
            default:
                return <span>Loading...</span>
        }
    }
    
    render() {
        
        let finalColor;

        if (this.state.currentPokemon.types.length == 2) {
            finalColor = colorTypeGradients(this.state.currentPokemon.types[0].type.name, this.state.currentPokemon.types[1].type.name, this.state.currentPokemon.types.length)
        } else {
            finalColor = colorTypeGradients(this.state.currentPokemon.types[0].type.name, this.state.currentPokemon.types[0].type.name, this.state.currentPokemon.types.length)
        }
        return (
        <div>
            {
            <div className="details__wrapper">
                <div className="details__card" style={{ 'background': `linear-gradient(${finalColor[0]}, ${finalColor[1]})`}}>
                    <div className="details__photo__tab">
                        <span className="details__pokenum">#{String(this.state.currentPokemon.id).padStart(3, '0')}</span>
                        <h3 className="capitalize details__pokemon-name">{this.state.currentPokemon.name}</h3>
                        <span style={{'background': finalColor[0]}} className="details__pokemon__genus">{this.state.pokemonGenus}</span>
                        <img className="pokemon__sprite" src={this.state.currentPokemon.sprites.other["official-artwork"].front_default} alt="" />
                        <div className="pokemon__types">
                            {this.state.currentPokemon.types.map((item) => {
                                return <img className="pokemon__type" key={item.type.name} src={`./assets/${item.type.name}.png`} alt="" />
                            })}
                        </div>
                        <div className="details__secondary__descriptions">
                            <span className="details__secondary__description">Weight: {this.state.currentPokemon.height / 10} m</span>
                            <span className="details__secondary__description">Height: {this.state.currentPokemon.weight / 10} Kg</span>
                            {this.fetchGenderRate(this.state.genderRate)}
                        </div>
                    </div>
                    <div className="details__info">
                        <div>
                            <h3 className="details__category__name">About</h3>
                            <div className="container__description">
                                <span className="description__text">{this.state.flavorText}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="details__category__name">Abilities</h3>
                                    <div className="container__description--alt">
                                <ul>
                                {this.state.currentPokemon.abilities.map(({ability}) => {
                                    return (
                                        <li key={ability.name} className="capitalize description__text">{ability.name}</li>
                                )
                                })}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h3 className="details__category__name">Stats</h3>
                            <div className="container__description stats__container">
                                    {this.state.currentPokemon.stats.map((stat) => {
                                        return (
                                            <div key={stat.stat.name} className="details__stat__columns">
                                                <div className="details__stat__columns__name">
                                                    <span key={stat.stat.name} className="capitalize details__stat__type">{stat.stat.name}</span>
                                                </div>
                                                <div key={stat.stat.name} className="details__stat__columns__value">
                                                    <span className="description__text">{stat.base_stat}</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                        <div>
                            <h3 className="details__category__name">Evolutions</h3>
                            <div className="container__description evo__container">
                            {this.state.detailsEvoChain.map((item, index, elements) => (
                                <React.Fragment key={item.name}>
                                    <div>
                                        <Link className="pokemon__link" key={item.name} to={`/${item.name}`}>
                                            <div key={item.name} className="evo__token" >
                                                <div className="details__evo__name">
                                                    <span className="capitalize">{item.name}</span>
                                                </div>
                                                <div className="details__evo__image__field" style={{ 'background': `linear-gradient(${finalColor[0]}, ${finalColor[1]})` }}>
                                                    <img src={item.image} className="details__evo__image" />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div key={item} className="evo__arrow">{elements[index + 1] && '>'}</div>
                                </React.Fragment>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
}
        </div>
        )}
}

