import React, { Component } from 'react'
import axios from 'axios'
import Filters from './Filters'
import Pokemon from './Pokemon'

export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allPokemons: []
        }
    }
    componentDidMount() {
        axios.get('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0')
        .then((response) => {
            console.log(response.data);
            this.setState({allPokemons: response.data.results})
            console.log(this.state)
        })
    }
    render() {
        return (
            <div className="container">
                <Filters />
                <div className="pokecards">
                    <Pokemon />
                    <Pokemon />
                    <Pokemon />
                    <Pokemon />
                    <Pokemon />
                </div>
            </div>
        )
    }
}