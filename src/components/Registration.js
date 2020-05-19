import React, { Component } from 'react';
import _ from 'lodash';
import { useStyles } from './Login';
import axios from '../axios';
import { connect } from 'react-redux';
import { setUser, setSingInUpView } from '../actions/authActions';
import { withStyles } from '@material-ui/styles';
import { Box, CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GoogleLogin from 'react-google-login';

const emailValidation = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/;

class Registration extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    errors: {},
    loading: false,
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const { username, email, password, confirm_password } = this.state;

    let errors = {};
    if (username === '') {
      errors.username = 'To pole jest puste.';
    } else if (username.length < 8 || username.length > 16) {
      errors.username = 'Nazwa uzytkownika powinna zawierać od 8 do 16 znaków';
    } else if (/\W/.test(username)) {
      errors.username =
        'Nazwa użytkownika powinna zawierać tylko liery oraz cyfry';
    }
    if (email === '') {
      errors.email = 'To pole jest puste.';
    } else if (!emailValidation.test(email)) {
      errors.email = 'Podany adres email jest nieprawidłowy';
    }
    if (password === '') {
      errors.password = 'To pole jest puste.';
    } else if (password.length < 8 || password.length > 32) {
      errors.password = 'Hasło powinno zawierać od 8 do 16 znaków';
    } else if (password !== confirm_password) {
      errors.password = 'Password and confirm password does not match.';
      errors.confirm_password = 'Password and confirm password does not match.';
    }

    if (confirm_password === '') {
      errors.confirm_password = 'To pole jest puste.';
    }

    if (!_.isEmpty(errors)) {
      return this.setState({ errors });
    }
    this.setState({ ...this.state, loading: true });

    axios
      .post('api/singup/', { username, password, email })
      .then(() => {
        this.setState({ ...this.state, loading: false });
        this.props.setSingInUpView('login')
        alert('You create new account.')
      })
      .catch(({ response }) => {
        this.setState({ ...this.state, loading: false });
        this.setState({ ...this.state, errors: response.data.errors });
      });
  };

  onChangeHandler = e => this.setState({ [e.target.id]: e.target.value });

  render() {
    const { classes } = this.props;

    return (
      <Box boxShadow={8} className={classes.root}>
        <div>
          <div className={classes.flexColumnContent}>
            <Typography
              className={classes.typography}
              align="center"
              color="secondary"
              variant="h4"
              component="h4"
            >
              Sing up
            </Typography>
            <form autoComplete="off" className={classes.flexColumnContent}>
              <TextField
                className={classes.inputRoot}
                labelWidth={0}
                variant="outlined"
                type="text"
                id="username"
                placeholder="Username"
                value={this.state.username}
                onChange={e => this.onChangeHandler(e)}
                InputProps={{
                  className: classes.input,
                }}
              />
              <Typography
                className={classes.typography}
                color="secondary"
                variant="body2"
                component="p"
              >
                {this.state.errors.username}
              </Typography>

              <TextField
                className={classes.inputRoot}
                labelWidth={0}
                type="text"
                id="email"
                placeholder="E-mail"
                value={this.state.email}
                onChange={e => this.onChangeHandler(e)}
                variant="outlined"
                InputProps={{
                  className: classes.input,
                }}
              />
              <Typography
                className={classes.typography}
                color="secondary"
                variant="body2"
                component="p"
              >
                {this.state.errors.email}
              </Typography>

              <TextField
                className={classes.inputRoot}
                labelWidth={0}
                type="password"
                id="password"
                variant="outlined"
                placeholder="Password"
                value={this.state.password}
                onChange={e => this.onChangeHandler(e)}
                InputProps={{
                  className: classes.input,
                }}
              />
              <Typography
                className={classes.typography}
                color="secondary"
                variant="body2"
                component="p"
              >
                {this.state.errors.password}
              </Typography>

              <TextField
                className={classes.inputRoot}
                labelWidth={0}
                type="password"
                id="confirm_password"
                placeholder="Confirm Password"
                variant="outlined"
                value={this.state.confirm_password}
                onChange={e => this.onChangeHandler(e)}
                InputProps={{
                  className: classes.input,
                }}
              />

              <Typography
                className={classes.typography}
                color="secondary"
                variant="body2"
                component="p"
              >
                {this.state.errors.confirm_password}
              </Typography>

              <div className={classes.margin} />

              <Button
                variant="contained"
                color="primary"
                disableRipple
                className={classes.button}
                onClick={this.onSubmitHandler}
              >
                {this.state.loading ? (
                  <CircularProgress color="secondary" size={25} />
                ) : (
                  'Sing up'
                )}
              </Button>
              <Button
                onClick={() => this.props.setSingInUpView('login')}
                variant="contained"
                color="primary"
                disableRipple
                className={classes.button}
              >
                Sing in
              </Button>
            </form>
          </div>
        </div>
      </Box>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { setUser, setSingInUpView })(
  withStyles(useStyles)(Registration)
);
