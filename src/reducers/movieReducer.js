import {
  SET_MOVIES,
  SET_CURRENT_PAGE,
  SET_TOTAL_PAGE,
  SET_DISPLAY,
  ADD_MOVIE,
  SET_ORDER,
  SET_PAGINATION,
  REMOVE_MOVIE,
  ADD_TO_FAVOURITE,
  REMOVE_FROM_FAVOURITE,
  SET_FAVOURITE,
  CLOSE_VIDEO_MODAL,
  OPEN_VIDEO_MODAL
} from '../actions/types';

const initialState = {
  display: 'module',
  pagination: 12,
  movies: [],
  current_page: 1,
  total_page: 0,
  order: 'latest',
  favourite: false,
  loading: true,
  modalOpen: false,
  modalVideo: null
};

const movieReducer = (state = initialState, action) => {
  const {
    display,
    pagination,
    movies,
    current_page,
    total_page,
    order,
    favourite,
    loading,
  } = state;

  switch (action.type) {
    case SET_DISPLAY:
      return {
        ...state,
        display: action.payload,
      };

    case SET_MOVIES: {
      return {
        ...state,
        movies: action.payload,
      };
    }

    case SET_PAGINATION: {
      return {
        ...state,
        pagination: action.payload,
      };
    }

    case SET_TOTAL_PAGE: {
      return {
        ...state,
        total_page: action.payload,
      };
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        current_page: action.payload,
      };
    }

    case CLOSE_VIDEO_MODAL: {
      return {
        ...state,
        modalOpen: false,
      };
    }

    case OPEN_VIDEO_MODAL: {
      return {
        ...state,
        modalOpen: true,
        modalVideo: action.payload
      };
    }

    case ADD_MOVIE: {
      if (!favourite && order === 'latest') {
        if (current_page === 1 && movies.length === pagination) {
          const copy_data = [...state.movies];
          copy_data.pop();
          copy_data.unshift(action.payload);
          console.log(copy_data);
          return {
            ...state,
            movies: copy_data,
          };
        } else if (current_page === total_page && movies.length < pagination) {
          return {
            ...state,
            movies: [action.payload, ...state.movies],
          };
        } else {
          const copy_data = [...state.movies];
          copy_data.pop();
          copy_data.unshift(action.payload);
          return {
            ...state,
            movies: copy_data,
          };
        }
      } else if (
        !favourite &&
        current_page === total_page &&
        movies.length !== pagination
      ) {
        return {
          ...state,
          movies: [...state.movies, action.payload],
        };
      }

      return {
        ...state,
      };
    }

    case SET_ORDER: {
      return {
        ...state,
        order: action.payload,
      };
    }
    case SET_FAVOURITE: {
      return {
        ...state,
        favourite: !state.favourite,
      };
    }

    case REMOVE_MOVIE: {
      const copy_data = [...state.movies].filter(
        movie => movie.movie_id !== action.payload.remove
      );

      if (current_page === total_page) {
        console.log('ddsd32');
        return {
          ...state,
          movies: copy_data,
        };
      } else {
        console.log('aaad32');

        copy_data.push(action.payload.fill);
        return {
          ...state,
          movies: copy_data,
        };
      }
    }
    case ADD_TO_FAVOURITE: {
      const copy_data = [...state.movies];
      copy_data.find(
        movie => movie.movie_id === action.payload
      ).favourite = true;
      return {
        ...state,
        movies: copy_data,
      };
    }

    case REMOVE_FROM_FAVOURITE: {
      const copy_data = [...state.movies];
      copy_data.find(
        movie => movie.movie_id === action.payload
      ).favourite = false;
      return {
        ...state,
        movies: copy_data,
      };
    }

    default:
      return state;
  }
};

export default movieReducer;
