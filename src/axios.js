import axios from 'axios';

export const baseURL = 'https://vectrum.herokuapp.com/'

export default axios.create({
  baseURL
});

export const youtubeAxios = axios.create({
  baseURL
});
