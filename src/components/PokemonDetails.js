import React, { Component } from 'react'
import axios from 'axios'
import { colorTypeGradients } from '../utils/utils'
import { Redirect } from 'react-router-dom'

export default class PokemonDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemonGenus: '',
            sprites: {
                other: {
                    "official-artwork": {
                        front_default: ''
                    }
                }
            },
            types: [{
                type: {
                    name: 'normal'
                },
                type: {
                    name: 'normal'
                }
            }],
            genderRate: 0,
            flavorText: '',
            abilities: [],
            stats: [],
            evoChain: '',
            detailsEvoChain: [{
                name: '',
                url: '',
                image: ''
            }]
        }
    }
    componentDidMount = async () => {
        this.fetchCardDetails(this.props.location.state, this.props.location.state.species.url)
    }
    fetchCardDetails = async (state, url) => {
        await axios.get(url)
            .then(({data}) => {
                let flavorText = data.flavor_text_entries.filter((item) => item.language.name === 'en')
                this.setState(
                {   
                    ...state,
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

        const requestArr = evoArray.map(async (item) => {
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${item.name}`).then((res) => {
                detailsEvoChain.push({ ...item, image: res.data.sprites.other["official-artwork"].front_default})
            })
        })

        Promise.all(requestArr).then((data) => {
            this.setState({detailsEvoChain: detailsEvoChain.sort((a, b) => a.url > b.url ? 1 : -1 )})
        })
    }
    fetchGenderRate = (genderRate) => {

        switch (genderRate) {
            case 0:
                return <div><span>100% <span style = {{color: 'lightblue'}}>M</span></span><span> 0% <span style={{color: 'pink'}}>F</span></span></div>;
            case 1:
                return <div><span>87.5% <span style = {{color: 'lightblue'}}>M</span></span> /<span>  12.5% <span style={{color: 'pink'}}>F</span></span></div>;
            case 2:
                return <div><span>75% <span style = {{color: 'lightblue'}}>M</span></span><span>  25% <span style={{color: 'pink'}}>F</span></span></div>;
            case 3:
                return <div><span>62.5% <span style = {{color: 'lightblue'}}>M</span></span><span>  37.5% <span style={{color: 'pink'}}>F</span></span></div>;
            case 4:
                return <div><span>50% <span style = {{color: 'lightblue'}}>M</span></span><span>  50% <span style={{color: 'pink'}}>F</span></span></div>;
            case 5:
                return <div><span>37.5% <span style = {{color: 'lightblue'}}>M</span></span><span>  62.5% <span style={{color: 'pink'}}>F</span></span></div>;
            case 6:
                return <div><span>25% <span style = {{color: 'lightblue'}}>M</span></span><span>  75% <span style={{color: 'pink'}}>F</span></span></div>;
            case 7:
                return <div><span>12.5% <span style = {{color: 'lightblue'}}>M</span></span><span>  87.5% <span style={{color: 'pink'}}>F</span></span></div>;
            case 8:
                return <div><span>0% <span style = {{color: 'lightblue'}}>M</span></span><span>  100% <span style={{color: 'pink'}}>F</span></span></div>;
            default:
                return <span>Loading...</span>
        }
    }
    
    render() {
        
        let finalColor;

        if (this.state.types.length == 2) {
            finalColor = colorTypeGradients(this.state.types[0].type.name, this.state.types[1].type.name, this.state.types.length)
        } else {
            finalColor = colorTypeGradients(this.state.types[0].type.name, this.state.types[0].type.name, this.state.types.length)
        }
        let data = this.props.location.state
        return (
        <div>
            {this.props.location.state ?
            <div className="details__wrapper">
                <div className="details__card" style={{ 'background': `linear-gradient(${finalColor[0]}, ${finalColor[1]})`}}>
                    <div className="details__photo">
                        <span className="details__pokenum">#{data.id}</span>
                        <h3 className="capitalize details__pokemon-name">{data.name}</h3>
                        <span>{this.state.pokemonGenus}</span>
                        <img className="pokemon__sprite" src={this.state.sprites.other["official-artwork"].front_default} alt="" />
                        <div className="pokemon__types">
                            {this.state.types.map((item) => {
                                return <img className="pokemon__type" key={item.type.name} src={`./assets/${item.type.name}.png`} alt="" />
                            })}
                        </div>
                        <span>{this.state.height/10} m</span>
                        <span>{this.state.weight/10} Kg</span>
                        {this.fetchGenderRate(this.state.genderRate)}
                    </div>
                    <div className="details__info">
                        <div>
                            <h3 className="details__category__name">About</h3>
                            <div className="container__description">
                                <span>{this.state.flavorText}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="details__category__name">Abilities</h3>
                                    <div className="container__description--alt">
                                <ul>
                                {this.state.abilities.map(({ability}) => {
                                    return (
                                        <li key={ability.name} className="capitalize">{ability.name}</li>
                                )
                                })}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h3 className="details__category__name">Stats</h3>
                            <div className="container__description">
                                    {this.state.stats.map((stat, index) => {
                                        return (
                                            <div key={stat.stat.name} className="details__stat__columns">
                                                <div className="details__stat__columns__name">
                                                    <span key={stat.stat.name} className="capitalize">{stat.stat.name}</span>
                                                </div>
                                                <div key={stat.stat.name} className="details__stat__columns__value">
                                                    <span>{stat.base_stat}</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                        <div>
                            <h3 className="details__category__name">Evolutions</h3>
                            <div className="container__description">
                            {this.state.detailsEvoChain.map((item) => (
                                <div className="">
                                    <div className="details__evo__name">
                                        <span className="capitalize">{item.name}</span>
                                    </div>
                                    <div className="details__evo__image__field">
                                        <img src={item.image} className="details__evo__image" />
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            : 
            <Redirect to="/" />}
        </div>
        )}
}

