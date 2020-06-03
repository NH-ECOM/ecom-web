import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/MainBody.scss';
import { Paper } from '@material-ui/core';

import HomePage from './components/HomePage';
import DetailsPage from './components/DetailsPage'

import ProtectedRoute from './ProtectedRoute';

export default class Routes extends Component {
  render() {
    return (
      <main className='main-body'>
        <Paper className='main-body-container'>
          <Switch>
            <ProtectedRoute
              component={HomePage}
              exact
              path='/'
            />
            <ProtectedRoute
                component={DetailsPage}
                exact
                path='/details'
            />
            <Route extract path='*' component={() => '404 Not Found'} />
          </Switch>
        </Paper>
      </main>
    );
  }
}
