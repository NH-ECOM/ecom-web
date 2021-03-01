import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/MainBody.scss';
import { Paper } from '@material-ui/core';

import ProductPage from './components/admin/ManageProducts';
import OrdersPage from './components/admin/ManageOrders';

import ProtectedRoute from './ProtectedRoute';

export default class Routes extends Component {
  render() {
    return (
      <main className='main-body'>
        <Paper>
          <Switch>
            <ProtectedRoute
              component={ProductPage}
              exact
              path='/admin/panel/product'
            />
            <ProtectedRoute
              component={OrdersPage}
              exact
              path='/admin/panel/orders'
            />
            <Route extract path='*' component={() => '404 Not Found'} />
          </Switch>
        </Paper>
      </main>
    );
  }
}
