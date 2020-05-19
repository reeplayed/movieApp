import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#303841',
      contrastText: '#eeeeee',
    },
    secondary: {
      main: '#00adb5',
      contrastText: '#ffffff',
    },
    danger: {
      backgroundColor: '#e53935',
      color: '#000000',
    },
    info: {
      main: 'rgba(0, 0, 0, 0.10)',
    },
    text: {
      main: 'rgba(255, 255, 255, 0.8)',
    },
    textSecondary: {
      backgroundColor: '#e53935',
      color: '#ffffff',
      main: '#e53935',
      contrastText: '#ffffff',
    },
    error: {
      main: '#d81b60',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});
