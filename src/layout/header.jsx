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
    ExitToApp,
    KeyboardBackspaceRounded,
    MenuRounded
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
        const counter = JSON.parse(localStorage.getItem("cartProductStore")).length;
        this.setState({ count: counter })
    };

    // componentDidUpdate() {
    //     var counter1 = JSON.parse(localStorage.getItem("products"))
    //     if (counter1 !== this.state.count) {
    //         this.setState({ count: counter1 })
    //     }
    // }

    render() {
        const { open, onOpen, onClose } = this.props;
        return (
            <div className='site-header-container'>
                <AppBar position='fixed'>
                    <Toolbar className='toolbar' variant='dense'>
                        <Grid
                            container
                            direction='row'
                            justify='space-around'
                            alignItems='center'
                        >
                            <Grid item>
                                {open ? (
                                    <IconButton
                                        className='menu-button'
                                        color='inherit'
                                        edge='start'
                                        onClick={onClose}
                                    >
                                        <KeyboardBackspaceRounded />
                                    </IconButton>
                                ) : (
                                    <IconButton
                                        className='menu-button'
                                        color='inherit'
                                        edge='start'
                                        onClick={onOpen}
                                    >
                                        <MenuRounded />
                                    </IconButton>
                                )}
                            </Grid>

                            <Grid item md={7} xs={3}>
                                <Typography className='title' variant='h5'>
                                    <Link to='/'>eCom</Link>
                                </Typography>
                                <Typography className='titleSmall' variant='h5'>
                                    <Link to='/'>eCom</Link>
                                </Typography>
                            </Grid>
                            
                            <Grid
                                item
                                md={1}
                                xs={3}
                                className='account-notification-container'
                            >
    
                                <Grid
                                    container
                                    direction='row'
                                    justify='space-evenly'
                                    alignItems='center'
                                >
                                    <Grid item>
                                        <IconButton
                                            aria-label='cart'
                                            color='inherit'
                                            tooltip={'Cart'}
                                            onClick={() => {
                                                    this.props.history.push('/cart');
                                                }
                                            }>
                                    <Badge badgeContent={this.state.count} color="secondary" showZero>
                                    
                                            <ShoppingCartIcon/>
                                            </Badge>
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton
                                            aria-label='Sign Out'
                                            onClick={() => {
                                                Auth.logout(() => {
                                                    this.props.history.push('/');
                                                });
                                            }}
                                            color='inherit'
                                            tooltip={'Sign Out'}
                                        >
                                            <ExitToApp />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withRouter(Header);
