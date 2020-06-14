import React from 'react';
import MainPage from './components/MainPage';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import jwtDecode from 'jwt-decode';
import store from './store';
import { setUser, logoutUser } from './actions/authActions';

class App extends React.Component {
  constructor(props) {
    super(props);
    if (localStorage.jwtToken) {
      const decodedData = jwtDecode(localStorage.jwtToken);
      if (decodedData.exp < Date.now() / 1000) {
        store.dispatch(logoutUser());
      } else {
        store.dispatch(setUser(localStorage.jwtToken));
      }
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <MainPage />
      </ThemeProvider>
    );
  }
}

export default App;
