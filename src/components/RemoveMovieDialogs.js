import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Typography from '@material-ui/core/Typography';
import { Button, CircularProgress, Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios, { youtubeAxios } from '../axios';
import { connect } from 'react-redux';
import { mergeArrays } from './MainPage';
import {
  setTotalPage,
  setCurrentPage,
  removeMovie,
} from '../actions/movieActions';
import {key} from '../apiKeys';

const useStyles = makeStyles(theme => ({
  content: {
    padding: theme.spacing(4),

    background: theme.palette.primary.main,
    border: '1px solid',
    borderColor: theme.palette.secondary.main,
  },
  button: {
    width: '70%',
    color: theme.palette.secondary.main,
    border: '1px solid',
    borderColor: theme.palette.secondary.main,
    textTransform: 'none',
    borderRadius: 50,
    margin: '15px 10px 5px 0',
  },
  typography: {
    color: theme.palette.text.main,
  },
}));

const VideoRemoveDialog = ({
  children,
  movie_id,
  movie: { current_page, total_page, order, pagination },
  setTotalPage,
  setCurrentPage,
  removeMovie,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = () => {
    setOpen(true);
  };

  const removeMovieHandler = () => {
    const withFill = current_page !== total_page ? true : false;
    console.log(current_page, total_page, 'mamamama');

    setLoading(true);
    axios
      .post('api/remove-movie/', {
        movie_id: movie_id,
        current_page: current_page,
        total_page: total_page,
        withFill: withFill,
        order: order,
        pagination: pagination,
      })
      .then(res => {
        console.log(res, 'elo');
        if (withFill) {
          console.log(withFill, movie_id, 'fill');
          youtubeAxios
            .get(
              'https://www.googleapis.com/youtube/v3/videos?id=' +
                res.data.fill_movie.movie_id +
                '&key=' +
                key +
                '&fields=items(id,snippet(publishedAt,title,thumbnails/medium/url),statistics(viewCount,likeCount))&part=snippet,statistics'
            )
            .then(({ data }) => {
              console.log(movie_id, data, 'ineener');
              setLoading(false);

              setOpen(false);
              removeMovie(
                movie_id,
                mergeArrays([res.data.fill_movie], data.items)[0]
              );
              setTotalPage(res.data.total_page);
            })
            .catch(err => {
              if(err.status===403){
                alert('Query limit exceeded.')
              }
              setLoading(false);
              setError('Not found video.');
            });
        } else {
          setOpen(false);
          removeMovie(movie_id);
          setLoading(false);
          setCurrentPage(res.data.total_page);
          setTotalPage(res.data.total_page);

          console.log(movie_id, 'dfdddd');
        }
      })
      .catch(({ response }) => {
        setLoading(false);
        setError(response.data.message);
      });
  };

  return (
    <div>
      {React.cloneElement(children, { onClick: handleClick })}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className={classes.content}>
          <Typography
            className={classes.typography}
            variant="subtitle2"
            component="h5"
          >
            Do you want to remove video ?
          </Typography>
          <Typography color="secondary" variant="body2" component="p">
            {error}
          </Typography>
          <Grid container wrap="nowrap">
            <Button
              size="small"
              variant="contained"
              color="primary"
              disableRipple
              className={classes.button}
              onClick={removeMovieHandler}
            >
              {loading ? (
                <CircularProgress color="secondary" size={22} />
              ) : (
                'Yes'
              )}
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              disableRipple
              className={classes.button}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Grid>
        </div>
      </Dialog>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    movie: state.movie,
  };
};

export default connect(mapStateToProps, {
  setCurrentPage,
  setTotalPage,
  removeMovie,
})(VideoRemoveDialog);
