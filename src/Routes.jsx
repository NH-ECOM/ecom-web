import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/MainBody.scss';
import { Paper } from '@material-ui/core';
import OrderPlaced from './components/OrderPlaced';
import HomePage from './components/HomePage';
import DetailsPage from './components/DetailsPage';
import Cart from './components/Cart';

import ProtectedRoute from './ProtectedRoute';

export default class Routes extends Component {
  render() {
    return (
      <main>
        <Paper>
          <Switch>
            <ProtectedRoute component={HomePage} exact path='/' />
            <ProtectedRoute component={DetailsPage} exact path='/details' />
            <ProtectedRoute
              component={OrderPlaced}
              exact
              path='/orderplaced'
            />
            <ProtectedRoute
              component={Cart}
              exact
              path='/cart'
            />
            <Route extract path='*' component={() => '404 Not Found'} />
          </Switch>
        </Paper>
      </main>
    );
  }
}
