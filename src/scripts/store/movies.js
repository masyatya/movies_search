const START_LOADING_MOVIES = 'START_LOADING_MOVIES';
const LOADING_ERROR_MOVIES = 'LOADING_ERROR_MOVIES';
const ERROR_OFF_MOVIES = 'ERROR_OFF_MOVIES';
const SET_MOVIES = 'SET_MOVIES';
const SET_QUERY = 'SET_QUERY';

export const startLoadingMovies = () => ({ type: START_LOADING_MOVIES });
export const loadingErrorMovies = (error) => ({ type: LOADING_ERROR_MOVIES, error });
export const setErrorOffMovies = () => ({ type: ERROR_OFF_MOVIES })
export const setMovies = movies => ({ type: SET_MOVIES, movies });
export const setQueryStore = query => ({ type: SET_QUERY, query });

const initialState = {
  movies: [],
  query: '',
  isLoading: false,
  hasError: '',
}

export const getMovies = state => state.movies;
export const getQuery = state => state.query;
export const getMoviesLength = state => state.movies.length;
export const getIsLoading = state => state.isLoading;
export const getErrorName = state => state.hasError;

const moviesReducer = (state = initialState, action) => {
  switch(action.type) {
    case START_LOADING_MOVIES:
      return {
        ...state,
        isLoading: true,
        hasError: '',
      }
    case LOADING_ERROR_MOVIES:
      return {
        ...state,
        movies: [],
        isLoading: false,
        hasError: action.error,
      }
    case ERROR_OFF_MOVIES:
      return {
        ...state,
        hasError: '',
      }
    case SET_MOVIES:
      return {
        ...state,
        movies: action.movies,
        isLoading: false,
        hasError: '',
      }
    case SET_QUERY:
      return {
        ...state,
        query: action.query,
      }
    default:
      return state;
  }
}

export default moviesReducer;
