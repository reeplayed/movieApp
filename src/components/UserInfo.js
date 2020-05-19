import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Avatar, Paper, CircularProgress } from '@material-ui/core';
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
import { setUser, setSingInUpView, logoutUser } from '../actions/authActions';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    minWidth: 300,
    right: 5,
    top: 64,
    padding: theme.spacing(2),
    background: theme.palette.primary.main,
    border: '1px solid',
    borderColor: theme.palette.secondary.main,
    borderRadius: 9,
    zIndex: 9,
  },
  button: {
    width: '70%',
    color: theme.palette.secondary.main,
    border: '1px solid',
    borderColor: theme.palette.secondary.main,
    textTransform: 'none',
    borderRadius: 50,
    margin: '15px 0 5px 0',
  },
  typography: {
    color: theme.palette.text.main,
  },
}));

const UserInfo = ({ auth, logoutUser }) => {
  const classes = useStyles();

  return (
    <Box boxShadow={8} className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Avatar
            className={classes.avatar}
            alt="Profile image"
            src={auth.image}
          />
        </Grid>
        <Grid item xs={10}>
          <Typography
            className={classes.typography}
            align="left"
            color="secondary"
            variant="body2"
            component="p"
          >
            {auth.username}
          </Typography>
          <Typography
            className={classes.typography}
            align="left"
            color="secondary"
            variant="body2"
            component="p"
          >
            {auth.email}
          </Typography>
        </Grid>
      </Grid>
      <Button
        onClick={logoutUser}
        variant="contained"
        color="primary"
        disableRipple
        className={classes.button}
      >
        Logout
      </Button>
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { logoutUser })(UserInfo);
