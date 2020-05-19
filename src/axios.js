import axios from 'axios';

export const baseURL = 'http://vectrum.herokuapp.com/'

export default axios.create({
  baseURL
});

export const youtubeAxios = axios.create({
  baseURL
});
