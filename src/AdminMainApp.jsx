import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import AdminRoutes from './AdminRoutes';
import Header from './layout/header';

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
            <Header
                open={open}
                onOpen={handleDrawerOpen}
                onClose={handleDrawerClose}
            />
            <AdminRoutes />
        </div>
    );
}
