import { createStore, combineReducers } from 'redux';
import moviesReducer from './movies';
import paginationReducer from './pagination';
import detailsReducer from './details';
import queriesReducer from './queries';
import * as selectorsMovies from './movies';
import * as selectorsPagination from './pagination';
import * as selectorsDetails from './details';
import * as selectorsQueries from './queries';

export const getMovies = state => selectorsMovies.getMovies(state.movies);
export const getQuery = state => selectorsMovies.getQuery(state.movies);
export const getMoviesLength = state => selectorsMovies.getMoviesLength(state.movies);
export const getErrorNameMovies = state => selectorsMovies.getErrorName(state.movies);
export const getIsLoadingMovies = state => selectorsMovies.getIsLoading(state.movies);
export const getCurrentPage = state => selectorsPagination.getCurrentPage(state.pagination);
export const getNumberOfPosts = state => selectorsPagination.getNumberOfPosts(state.pagination);
export const getImdbId = state => selectorsDetails.getImdbId(state.details);
export const getMovieInfo = state => selectorsDetails.getMovieInfo(state.details);
export const getIsLoadingDetails = state => selectorsDetails.getIsLoading(state.details);
export const getErrorNameDetails = state => selectorsDetails.getErrorName(state.details);
export const getMovieInfoInit = state => selectorsDetails.getMovieInfoInit(state.details);

export const getQueries = state => selectorsQueries.getQueries(state.queries);
export const getLastQuery = state => selectorsQueries.getLastQuery(state.queries);

const rootReducer = combineReducers({
  movies: moviesReducer,
  pagination: paginationReducer,
  details: detailsReducer,
  queries: queriesReducer,
})

const persistedState = localStorage
  .getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

const store = createStore(
  rootReducer,
  persistedState,
)

store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

// const store = createStore(rootReducer);

export default store;
