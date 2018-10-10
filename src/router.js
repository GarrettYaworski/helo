import {Route, Switch} from 'react-router-dom'
import React from 'react'
import Home from './Home'
import User from './User'
import Sesh from './Sesh'

export default(
  <Switch>
    <Route component={ Home } exact path='/'></Route>
    <Route component={ User } path='/user/:id'></Route>
    <Route component={ Sesh } path='/testsesh'></Route>
  </Switch>
)