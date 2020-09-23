import React from 'react';
import { useSelector} from 'react-redux';
import { MoviesList } from './components/MoviesList';
import { DetailsMovie } from './components/DetailsMovie';
import { SearchForm } from './components/SearchForm';
import * as selectors from './store';

export const App = () => {
  const isInitMovieInfo = useSelector(selectors.getMovieInfoInit);

  return (
    <div className="page">
      <div className="page-content">
        <SearchForm />
        <MoviesList />
      </div>
      <div className={`details ${isInitMovieInfo ? '' : 'hidden'}`}>
        <DetailsMovie />
      </div>
    </div>
  );
};
