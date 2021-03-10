import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../Auth';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Grid,
    Badge
} from '@material-ui/core';
import {
    ExitToApp
} from '@material-ui/icons';

import '../styles/Header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            show: true
        };
    }

    componentDidMount() {
        var counter = 0;
        if (localStorage.getItem("cartProductStore")) {
            counter = JSON.parse(localStorage.getItem("cartProductStore")).length;
        }
        this.setState({ count: counter })
    };

    render() {
        return (
            <div></div>
        );
    }
}

export default withRouter(Header);
