import React from 'react'
import Header from '../components/Header.js'
import PageHome from '../components/PageHome.js'
import Footer from '../components/Footer'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const AppRouter = () => (
    <Router>
        <div className="container">
            <Header />
            <PageHome />
            <Footer />
        </div>
    </Router>
)

export default AppRouter