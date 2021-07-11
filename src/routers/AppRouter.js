import React from 'react'
import Header from '../components/Header.js'
import PageHome from '../components/PageHome.js'
import Footer from '../components/Footer'
import PokemonDetails from '../components/PokemonDetails.js'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from 'react-router-dom'

const AppRouter = () => {

    return (
    <Router>
        <div className="container">
            <Header />
            <Switch>
                <Route path={'/'} exact={true} component={PageHome} />
                <Route path={`/:pokemon?`} component={PokemonDetails}/>
            </Switch>
            <Footer />
        </div>
    </Router>

    
)}

export default AppRouter