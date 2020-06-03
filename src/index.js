/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import AdminApp from './AdminApp';
import ProtectedRoute from './ProtectedRoute';

import store from './redux/store';
import LoginPage from "./components/admin/Login";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/admin' component={LoginPage} />
                <ProtectedRoute path='/admin/*'>
                    <AdminApp />
                </ProtectedRoute>
                <Route path='/' >
                    <App />
                </Route>
                <Route extract path='*' component={() => '404 Not Found'} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
