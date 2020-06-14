import {
  SET_DISPLAY,
  SET_MOVIES,
  SET_TOTAL_PAGE,
  SET_CURRENT_PAGE,
  ADD_MOVIE,
  SET_ORDER,
  SET_PAGINATION,
  REMOVE_MOVIE,
  ADD_TO_FAVOURITE,
  REMOVE_FROM_FAVOURITE,
  SET_FAVOURITE,
  CLOSE_VIDEO_MODAL,
  OPEN_VIDEO_MODAL,
} from './types';

import store from '../store';
import axios, { youtubeAxios } from '../axios';
import _ from 'lodash';
import { mergeArrays } from '../components/MainPage';

const storageMovies = JSON.parse(localStorage.movies_id || '[]');

export const setDisplay = type => {
  localStorage.setItem('display', type);

  return {
    type: SET_DISPLAY,
    payload: type,
  };
};

export const setMovies = movies => {
  return {
    type: SET_MOVIES,
    payload: movies,
  };
};

export const setTotalPage = total => {
  return {
    type: SET_TOTAL_PAGE,
    payload: total,
  };
};

export const setCurrentPage = page => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
};

export const setOrder = order => {
  return {
    type: SET_ORDER,
    payload: order,
  };
};

export const setPagination = quantity => {
  return {
    type: SET_PAGINATION,
    payload: quantity,
  };
};

export const setFavourite = () => {
  return {
    type: SET_FAVOURITE,
  };
};

export const setModalClose = () => {
  document.body.style.overflow = 'initial';
  return {
    type: CLOSE_VIDEO_MODAL,
  };
};

export const setModalOpen = video => {
  document.body.style.overflow = 'hidden';
  return {
    type: OPEN_VIDEO_MODAL,
    payload: video,
  };
};

export const addMovie = movie => {
  return {
    type: ADD_MOVIE,
    payload: movie,
  };
};

export const removeMovie = (remove, fill) => {
  return {
    type: REMOVE_MOVIE,
    payload: {
      remove: remove,
      fill: fill,
    },
  };
};

export const addToFavourite = movie_id => {
  return {
    type: ADD_TO_FAVOURITE,
    payload: movie_id,
  };
};

export const removeFromFavourite = movie_id => {
  return {
    type: REMOVE_FROM_FAVOURITE,
    payload: movie_id,
  };
};
