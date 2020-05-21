import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import theme from '../theme';
import { connect } from 'react-redux';
import { setUser } from '../actions/authActions';
import { ClickAwayListener } from '@material-ui/core';
import Login from './Login';
import Registration from './Registration';
import { withStyles } from '@material-ui/styles';
import { setFavourite } from '../actions/movieActions';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    flexGrow: 1,
    width: 500,
    zIndex: 999993,
    marginTop: 50,
    position: 'relative',
  },
  appBar: {
    height: 60,
  },
  menuButton: {
    marginRight: spacing(2),
    color: palette.info.main,
  },
  title: {
    flexGrow: 1,
    color: 'white',
    fontFamily: 'Lobster, cursive',
  },
  popoverRoot: {
    '& .MuiPopover-root': {
      border: '1px solid',
      borderColor: palette.secondary.main,
      borderRadius: 18,
    },
  },
  button: {
    color: palette.secondary.main,
    border: '1px solid',
    borderColor: palette.secondary.main,
    textTransform: 'none',
    borderRadius: 50,
  },
  authInfo: {
    height: 200,
    width: 300,
    background: theme.palette.primary.main,
    border: '1px solid',
    borderColor: palette.secondary.main,
    borderRadius: 18,
  },
}));

function NavBar({ auth, movie, setFavourite }) {
  const classes = useStyles();
  
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {/*<UserInfoPanel/>*/}
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar color="primary">
          <IconButton edge="start" color="secondary" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Vectrum
          </Typography>
          <IconButton edge="start" color="secondary" aria-label="menu">
            {movie.favourite ? (
              <FavoriteIcon
                onClick={setFavourite}
                className="icon-favourite-anime"
                color="secondary"
                fontSize="medium"
              />
            ) : (
              <FavoriteBorderIcon
                onClick={setFavourite}
                className="icon-anime"
                color="secondary"
                fontSize="medium"
              />
            )}
          </IconButton>
          <ClickAwayListener onClickAway={handleClickAway}>
            <div>
              <IconButton
                onClick={handleClick}
                edge="start"
                color="secondary"
                aria-label="menu"
              >
                <AccountCircleIcon fontSize="medium" color="secondary" />
              </IconButton>
              {open ? (
                auth.isAuthenticated ? (
                  <UserInfo />
                ) : auth.view === 'login' ? (
                  <Login />
                ) : auth.view === 'registration' ? (
                  <Registration />
                ) : null
              ) : null}
            </div>
          </ClickAwayListener>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    movie: state.movie,
  };
};

export default connect(mapStateToProps, { setUser, setFavourite })(NavBar);
