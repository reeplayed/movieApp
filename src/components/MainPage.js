import React, { useEffect, useState } from 'react';
import axios, { youtubeAxios } from '../axios';
import VideoModal from './VideoModal';

import 'react-router-modal/css/react-router-modal.css';
import NavBar from './NavBar';
import ImgMediaCard from './Card';
import AddMovieInput from './AddMovieInput';
import Pagination from '@material-ui/lab/Pagination';
import { connect } from 'react-redux';
import { setUser } from '../actions/authActions';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import {
  setDisplay,
  setMovies,
  setTotalPage,
  setCurrentPage,
} from '../actions/movieActions';
import { key } from '../apiKeys';

const useStyles = makeStyles(theme => ({
  container: {
    width: 500,
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'red',
  },
  item: {
    width: 50,
    height: 50,
    border: '1px solid black',
    backgroundColor: 'white',
  },
  shot: {
    width: 50,
    height: 50,
    border: '1px solid black',
    backgroundColor: 'red',
  },
  border: {
    width: 50,
    height: 50,
    border: '1px solid black',
    backgroundColor: 'grey',
  },
}));

export const mergeArrays = (array1, array2) => {
  return _.zipWith(array1, array2, (a1, a2) => {
    return {
      movie_id: a1.movie_id,
      title: a2.snippet.title,
      image: a2.snippet.thumbnails.medium.url,
      views: a2.statistics.viewCount,
      likes: a2.statistics.likeCount,
      favourite: a1.favourite,
      date_add: a1.date_add.slice(0, 10),
    };
  });
};

const MainPage = ({
  auth,
  movie: {
    movies,
    order,
    total_page,
    current_page,
    pagination,
    favourite,
    modalOpen,
  },
  setMovies,
  setTotalPage,
  setCurrentPage,
}) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);

  const testUserId = Math.floor(Math.random() * 10);

  const loadingHandler = () => {
    if (auth.isAuthenticated) {
      setLoading(true);
      axios
        .get('api/movies-list/', {
          params: {
            page: current_page,
            favourite: favourite,
            order: order,
            pagination: pagination,
          },
        })
        .then(({ data }) => {
          if (!data.movies_id.length) {
            setLoading(false);
            setMovies([]);
            return;
          }

          youtubeAxios
            .get(
              'https://www.googleapis.com/youtube/v3/videos?id=' +
                data.movies_id.join() +
                '&key=' +
                key +
                '&fields=items(id,snippet(publishedAt,title,thumbnails/medium/url),statistics(viewCount,likeCount))&part=snippet,statistics'
            )
            .then(({ data: { items } }) => {
              let merge = mergeArrays(data.movies_list, items);
              setMovies(merge);
              if (current_page > data.total_page) {
                setCurrentPage(data.total_page);
              }
              setTotalPage(data.total_page);
              setLoading(false);
            })
            .catch(err => {
              if (err.response.status === 403) {
                alert('Sorry, YouTube api query limit exceeded..');
              } else {
                alert(err.response.message);
              }
            });
        })
        .catch(({ response }) => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    setLoading(true);
    loadingHandler();
  }, [current_page, order, favourite, auth.isAuthenticated]);

  const onPageChangeHandler = (e, page) => {
    setCurrentPage(page);
  };

  const MoviesList = movies.map(movie => (
    <ImgMediaCard
      key={movie.movie_id}
      movie_id={movie.movie_id}
      favouriteBool={movie.favourite}
      title={movie.title}
      image={movie.image}
      views={movie.views}
      likes={movie.likes}
      date_add={movie.date_add}
    />
  ));

  const ListComponent = () => (
    <React.Fragment>
      <AddMovieInput />

      {!loading && movies.length ? (
        <div className="card-container-grid">{MoviesList}</div>
      ) : !loading && !movies.length ? (
        <Typography
          className={classes.margin}
          align="center"
          color="secondary"
          variant="h6"
          component="h6"
        >
          This folder is empty ...
        </Typography>
      ) : null}

      <Grid container alignItems="center" direction="column">
        {loading ? (
          <CircularProgress
            className={classes.margin}
            color="secondary"
            size={240}
          />
        ) : movies.length ? (
          <Pagination
            page={current_page}
            count={total_page}
            onChange={onPageChangeHandler}
            color="secondary"
          />
        ) : null}
      </Grid>
    </React.Fragment>
  );
  const UnauthorizedComponent = () => (
    <React.Fragment>
      <Typography
        className={classes.margin}
        align="center"
        color="secondary"
        variant="h6"
        component="h6"
      >
        You must sign in to use the application...
      </Typography>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <NavBar />
      {modalOpen && <VideoModal />}
      {auth.isAuthenticated ? <ListComponent /> : <UnauthorizedComponent />}
    </React.Fragment>
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
  setTotalPage,
  setCurrentPage,
})(MainPage);
