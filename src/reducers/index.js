import { combineReducers } from 'redux';
import movieReducer from './movieReducer';
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer,
  movie: movieReducer,
});
