const START_LOADING_DETAILS = 'START_LOADING_DETAILS';
const LOADING_ERROR_DETAILS = 'LOADING_ERROR_DETAILS';
const SET_IMDB_ID = 'SET_IMDB_ID';
const SET_MOVIE_INFO = 'SET_MOVIE_INFO';
const DELETE_MOVIE_INFO = 'DELETE_MOVIE_INFO';

export const startLoadingDetails = () => ({ type: START_LOADING_DETAILS });
export const loadingErrorDetails = (error) => ({ type: LOADING_ERROR_DETAILS, error });
export const setImdbId = imdbId => ({ type: SET_IMDB_ID, imdbId });
export const setMovieInfo = movieInfo => ({ type: SET_MOVIE_INFO, movieInfo });
export const deleteMovieInfo = () => ({ type: DELETE_MOVIE_INFO });

const initialState = {
  imdbId: 0,
  movieInfo: null,
  isLoading: false,
  hasError: '',
  isInitialized: false,
}

export const getIsLoading = state => state.isLoading;
export const getErrorName = state => state.hasError;
export const getImdbId = state => state.imdbId;
export const getMovieInfo = state => state.movieInfo;
export const getMovieInfoInit = state => state.isInitialized;

const detailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING_DETAILS:
      return {
        ...state,
        isLoading: true,
        hasError: '',
        isInitialized: true,
      }
    case LOADING_ERROR_DETAILS:
      return {
        ...state,
        isLoading: false,
        hasError: action.error,
      }
    case SET_IMDB_ID:
      return {
        ...state,
        imdbId: action.imdbId,
      }
    case SET_MOVIE_INFO:
      return {
        ...state,
        movieInfo: action.movieInfo,
        isLoading: false,
        hasError: '',
      }
    case DELETE_MOVIE_INFO:
      return {
        ...state,
        movieInfo: null,
        imdbId: 0,
      }
    default:
      return state;
  }
}

export default detailsReducer;
