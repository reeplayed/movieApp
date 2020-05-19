import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  Box,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  CircularProgress,
} from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube';
import jwtDecode from 'jwt-decode';
import axios, { youtubeAxios } from '../axios';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { connect } from 'react-redux';
import _ from 'lodash';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ViewListIcon from '@material-ui/icons/ViewList';
import {
  setDisplay,
  setMovies,
  addMovie,
  setTotalPage,
} from '../actions/movieActions';
import { mergeArrays } from './MainPage';
import Icons from './DateDisplayIcons';
import {key} from '../apiKeys';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: '10px auto',
    maxWidth: 545,
    padding: '0 10px',
  },
  root: {
    width: '100%',
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.secondary.main,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.main,
        border: '1px solid',
      },
      height: 35,
      margin: '0 6px',
    },
  },
  input: {
    color: theme.palette.secondary.main,
    borderRadius: 50,
  },
  typography: {
    margin: '10px 0',
  },
  button: {
    color: theme.palette.secondary.main,
    border: '1px solid',
    borderColor: theme.palette.secondary.main,
    textTransform: 'none',
    borderRadius: 50,
    cursor: 'pointer',
  },
  dialog: {
    maxWidth: 900,
    padding: theme.spacing(2),
    margin: 'auto',
    background: theme.palette.primary.main,
    border: '1px solid',
    borderColor: theme.palette.secondary.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageContent: {
    border: '1px solid',
    padding: 2,
    borderColor: theme.palette.secondary.main,
    borderRadius: 7,
  },
  imageWrapper: {
    maxWidth: 600,
    border: '1px solid',

    borderColor: theme.palette.secondary.main,
    borderRadius: 7,
  },
  image: {
    width: '100%',
    borderRadius: 7,
    filter: 'brightness(40%)',
  },
  iconMargin: {},
}));

const AddMovieInput = ({
  auth,
  movie: { display, order, current_page, favourite, pagination },
  setDisplay,
  addMovie,
  setTotalPage,
}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [error2, setError2] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [newVideo, setNewVideo] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const getYoutubeMovie = e => {
    e.preventDefault();
    setError('');
    setError2('');

    if (url === '') {
      return setError('This field is empty.');
    }
    const youtubeRegrex1 = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const youtubeRegrex2 = /^[0-9a-zA-Z\-_]+$/;

    const match = url.match(youtubeRegrex1);
    const match2 = url.match(youtubeRegrex2);

    const id =
      match && match[7].length === 11
        ? match[7]
        : match2 && url.length === 11
        ? url
        : false;

    if (!id) {
      return setError('Invalid URL or video ID.');
    }
    setLoading(true);

    youtubeAxios
      .get(
        'https://www.googleapis.com/youtube/v3/videos?id=' +
          id +
          '&key=' +
          key +
          '&fields=items(id,snippet(publishedAt,title,thumbnails/medium/url),statistics(viewCount,likeCount))&part=snippet,statistics'
      )
      .then(({ data }) => {
        setLoading(false);

        if (!_.isEmpty(data.items)) {
          setNewVideo(data.items[0]);
          handleClickOpen();
        } else {
          setError('Not found video with that ID.');
        }
      })
      .catch(err => {
        setLoading(false);
        setError('Connection error.');
        alert(err.response);
      });
  };

  const addHandler = () => {
    const withFill = current_page !== 1 && order === 'latest' ? true : false;

    setLoading2(true);
    axios
      .post('api/add-movie/', {
        movie_id: newVideo.id,
        withFill: withFill,
        pagination: pagination,
        current_page: current_page,
      })
      .then(({ data }) => {
        if (withFill) {
          youtubeAxios
            .get(
              'https://www.googleapis.com/youtube/v3/videos?id=' +
                data.new_movie.movie_id +
                '&key=' +
                key +
                '&fields=items(id,snippet(publishedAt,title,thumbnails/medium/url),statistics(viewCount,likeCount))&part=snippet,statistics'
            )
            .then(res => {
              setLoading2(false);
              setUrl('');
              setOpen(false);
              addMovie(mergeArrays([data.new_movie], res.data.items)[0]);
              setTotalPage(data.total_page);
            })
            .catch(err => {
              setLoading2(false);
              setError('Not found video.');
              alert(err.response);
            });
        } else {
          setLoading2(false);
          setUrl('');
          setOpen(false);
          addMovie(mergeArrays([data.new_movie], [newVideo])[0]);
          setTotalPage(data.total_page);
        }
      })
      .catch(({ response }) => {
        setLoading2(false);
        setError2(response.data.message);
      });
  };

  useEffect(() => {
    setError('');
  }, [display, order, current_page, favourite]);

  return (
    <div className={classes.margin}>
      <form autoComplete="off">
        <Grid container spacing={0} wrap="nowrap">
          <Button
            onClick={getYoutubeMovie}
            size="small"
            variant="contained"
            color="primary"
            disableRipple
            className={classes.button}
          >
            {loading ? <CircularProgress color="secondary" size={19} /> : 'Add'}
          </Button>
          <TextField
            className={classes.root}
            labelWidth={0}
            id="outlined-basic"
            variant="outlined"
            placeholder="Paste YouTube video URL or ID to add movie."
            value={url}
            onChange={e => setUrl(e.target.value)}
            InputProps={{
              className: classes.input,
            }}
          />
        </Grid>
      </form>
      <Typography color="secondary" variant="body2" component="p">
        {error}
      </Typography>

      <Icons />

      {newVideo && (
        <Dialog open={open} onClose={() => setOpen(false)}>
          <div className={classes.dialog}>
            <div className={classes.imageContent}>
              <PlayCircleOutlineIcon color="secondary" />
              <div className={classes.imageWrapper}>
                <img
                  className={classes.image}
                  src={newVideo.snippet.thumbnails.medium.url}
                />
              </div>
            </div>
            <Typography
              className={classes.typography}
              align="center"
              color="secondary"
              variant="subtitle2"
              component="h6"
            >
              {newVideo.snippet.title}
            </Typography>
            <Typography
              className={classes.typography}
              color="secondary"
              variant="body2"
              component="p"
            >
              {error2}
            </Typography>
            <Button
              onClick={addHandler}
              size="small"
              variant="contained"
              color="primary"
              disableRipple
              className={classes.button}
            >
              {loading2 ? (
                <CircularProgress color="secondary" size={19} />
              ) : (
                'Add'
              )}
            </Button>
          </div>
        </Dialog>
      )}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    auth: state.auth,
    movie: state.movie,
  };
};
export default connect(mapStateToProps, {
  setDisplay,
  setMovies,
  addMovie,
  setTotalPage,
})(AddMovieInput);
