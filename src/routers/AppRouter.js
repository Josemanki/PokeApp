import React from 'react'
import Header from '../components/Header.js'
import HomePage from '../components/HomePage.js'
import Footer from '../components/Footer'
import PokemonDetails from '../components/PokemonDetails.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const AppRouter = () => {
    return (
    <Router>
        <div className="container">
            <Header />
            <Switch>
                <Route path={'/'} exact={true} component={HomePage} />
                <Route path={`/:id?`} component={PokemonDetails}>
                </Route>
            </Switch>
            <Footer />
        </div>
    </Router>

    
)}

export default AppRouter