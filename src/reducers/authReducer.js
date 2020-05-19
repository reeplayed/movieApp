import {
  SET_USER,
  LOGOUT_USER,
  SET_SINGIN_OR_SINGUP_VIEW,
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  username: '',
  email: '',
  image: '',
  view: 'login',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      const userInfo = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        username: userInfo.username,
        email: userInfo.email,
        image: userInfo.profile_image,
      };

    case LOGOUT_USER:
      return {
        isAuthenticated: false,
        username: '',
        email: '',
        image: '',
        view: 'login',
      };

    case SET_SINGIN_OR_SINGUP_VIEW:
      return {
        ...state,
        view: action.payload,
      };

    default:
      return state;
  }
};
