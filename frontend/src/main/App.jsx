import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { HashRouter } from 'react-router-dom'

import Routes from './Routes'
import Footer from '../components/templates/Footer'
import Header from '../components/templates/Header'
import Nav from '../components/templates/Nav'

export default props =>
    <HashRouter>
        <div className="app">
            <Header />
            <Nav />
            <Routes />
            <Footer />
        </div>
    </HashRouter>