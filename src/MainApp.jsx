import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import Routes from './Routes';
import Header from './layout/header';
import './styles/main.scss';

export default function MainApp() {
    const [open, setOpen] = React.useState(false);

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    return (
        <div className='main-app-container'>
            <CssBaseline />
            <div className="main-header-container">
                <Header
                    open={open}
                    onOpen={handleDrawerOpen}
                    onClose={handleDrawerClose}
                />
            </div>
            <div className="main-body-container">
                <Routes />
            </div>
            
        </div>
    );
}
