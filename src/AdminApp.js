import React, { PureComponent } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import './styles/App.css';
import AdminMainApp from './AdminMainApp';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Nunito',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(',')
  },
  palette: {
    primary: {
      light: '#2196f3',
      main: '#1565c0',
      dark: '#0d47a1',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ec407a',
      main: '#d81b60',
      dark: '#880e4f',
      contrastText: '#ffffff'
    }
  }
});

class App extends PureComponent {
  render() {
    return (
        <ThemeProvider theme={theme}>
          <div className='App'>
            <AdminMainApp />
          </div>
        </ThemeProvider>
    );
  }
}

export default App;
