import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Avatar, CircularProgress } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import GoogleLogin from 'react-google-login';
import axios from '../axios';
import { connect } from 'react-redux';
import { setUser, setSingInUpView } from '../actions/authActions';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

export const useStyles = theme => ({
  root: {
    position: 'fixed',
    width: 280,
    right: 5,
    top: 64,
    padding: theme.spacing(2),
    background: theme.palette.primary.main,
    border: '1px solid',
    borderColor: theme.palette.secondary.main,
    borderRadius: 9,
    zIndex: 2,
  },
  content: {
    marginTop: 5,
  },
  imageWrapper: {
    padding: 15,
  },
  image: {
    height: 70,
    width: 70,
    border: '1px solid',
    borderColor: theme.palette.secondary.main,
  },
  typography: {
    marginBottom: 0,
  },
  inputRoot: {
    width: '100%',
    '& label.Mui-focused': {
      backgroundColor: theme.palette.primary.main,
      height: 30,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.secondary.main,
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.main,
        border: '1px solid',
      },
      marginTop: 10,
    },
  },
  input: {
    color: theme.palette.secondary.main,
    borderRadius: 50,
    height: 30,
  },
  button: {
    width: '70%',
    color: theme.palette.secondary.main,
    border: '1px solid',
    borderColor: theme.palette.secondary.main,
    textTransform: 'none',
    borderRadius: 50,
    margin: '5px 0',
  },
  margin: {
    height: 15,
  },
  flexColumnContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

class SingIn extends React.Component {
  state = {
    username: '',
    password: '',
    errors: {},
    loading: false,
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const { username, password } = this.state;
    if (username === '' && password === '') {
      return this.setState({
        errors: {
          username: 'This field is empty.',
          password: 'This field is empty.',
        },
      });
    }
    if (this.state.username === '') {
      return this.setState({ errors: { username: 'This field is empty.' } });
    }
    if (this.state.password === '') {
      return this.setState({ errors: { password: 'This field is empty.' } });
    }

    axios
      .post('api/token/', {
        username,
        password,
      })
      .then(({ data }) => {
        localStorage.setItem('jwtToken', data.access);
        this.setState({ ...this.state, loading: false });
        this.props.setUser(data.access);
      })
      .catch(({ response: { data } }) => {
        this.setState({ ...this.state, loading: false });
        this.setState({
          errors: {
            username: data.detail,
            password: data.detail,
          },
        });
      });
    this.setState({ loading: true });
  };

  responseGoogle = response => {
    console.log(response);
    axios
      .post('api/google-login/', { tokenId: response.tokenId })

      .then(({ data }) => {
        localStorage.setItem('jwtToken', data.ownAccessToken);

        this.props.setUser(data.ownAccessToken, response.accessToken);
      })
      .catch(err => alert(err));
  };

  onChangeHandler = e => this.setState({ [e.target.id]: e.target.value });

  render() {
    const { classes } = this.props;

    const StyledButton = ({ clickHandler, children }) => (
      <Button
        onClick={clickHandler}
        variant="contained"
        color="primary"
        disableRipple
        className={classes.button}
      >
        {children}
      </Button>
    );

    return (
      <Box boxShadow={8} className={classes.root}>
        <div>
          <Typography
            className={classes.typography}
            align="center"
            color="secondary"
            variant="h4"
            component="h4"
          >
            Sing in
          </Typography>
          <form autoComplete="off" className={classes.flexColumnContent}>
            <TextField
              className={classes.inputRoot}
              labelWidth={0}
              type="text"
              id="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.onChangeHandler}
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
              {this.state.errors.username}
            </Typography>

            <TextField
              className={classes.inputRoot}
              labelWidth={0}
              variant="outlined"
              type="password"
              id="password"
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
                'Sing in'
              )}
            </Button>

            <Button
              onClick={() => this.props.setSingInUpView('registration')}
              variant="contained"
              color="primary"
              disableRipple
              className={classes.button}
            >
              Sing up
            </Button>
            <Typography
              className={classes.typography}
              align="center"
              color="secondary"
              variant="body2"
              component="h6"
            >
              OR
            </Typography>
            <GoogleLogin
              clientId="877070764919-5arp1brusgtjvbfbahas9s145t3i4i2l.apps.googleusercontent.com" 
              render={renderProps => (
                <StyledButton clickHandler={renderProps.onClick}>
                  Login with Google
                </StyledButton>
              )}
              onSuccess={this.responseGoogle}
              onFailure={(err) => console.log(err)}
              cookiePolicy={'single_host_origin'}
            />
          </form>
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
  withStyles(useStyles)(SingIn)
);
