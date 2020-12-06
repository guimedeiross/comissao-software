import React from 'react'
import { Switch, Route, Redirect } from 'react-router'


import Home from '../components/home/Home'
import Reports from '../components/templates/Reports'

export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/reports' component={Reports} />
        <Redirect from='*' to='/' />
    </Switch>