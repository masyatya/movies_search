import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from 'react-js-pagination';
import { getMovies } from '../../api';
import * as selectors from '../../store';
import {
  setMovies,
  startLoadingMovies,
  loadingErrorMovies,
} from '../../store/movies';
import { setCurrentPage, setNumberOfPosts } from '../../store/pagination';
import { setImdbId } from '../../store/details';

export const MoviesList = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectors.getMovies);
  const query = useSelector(selectors.getQuery);
  const currentPage = useSelector(selectors.getCurrentPage);
  const numberOfPosts = useSelector(selectors.getNumberOfPosts);

  const isLoading = useSelector(selectors.getIsLoadingMovies);
  const errorName = useSelector(selectors.getErrorNameMovies);

  useEffect(() => {
    if (!currentPage) {
      return;
    }

    dispatch(startLoadingMovies());
    getMovies(query, currentPage)
      .then((res) => {

        if(res.Response === 'False') {
          dispatch(loadingErrorMovies(res.Error));
          return;
        }
        dispatch(setMovies(res.Search));
        dispatch(setNumberOfPosts(+res.totalResults));
      })
  }, [query, currentPage]);

  const setCurrentPageWithScroll = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
    window.scrollTo(0, 0);
  }

  const setImdbIdWithScroll = (imdbId) => {
    dispatch(setImdbId(imdbId));
    window.scrollTo(0, 0);
  }


  if(isLoading) {
    return (
      <div className="spinner">
        <div className="dot1"></div>
        <div className="dot2"></div>
      </div>
    )
  }

  if(errorName !== '') {
    return (
      <p className="error__message">Oops... {errorName} Please, try again.</p>
    )
  }

  return (
    <>
      <div className="cards">
        {movies.map(movie => (
          <div
            className="card"
            key={movie.imdbID}
            onClick={() => setImdbIdWithScroll(movie.imdbID)}
          >
            <div className="card__image">
              <img
                src={movie.Poster !== 'N/A'
                  ? movie.Poster
                  : 'https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available-737x1024.jpg'
                }
                alt="Film logo"
              />
            </div>
            <div className="card__content">
              <h2 className="card__title">{movie.Title} ({movie.Year})</h2>
            </div>
            <button className="button card__button">
                More details
              </button>
          </div>
        ))}

      </div>
      {movies.length !== 0 && (
        <Pagination
          activePage={currentPage}
          totalItemsCount={numberOfPosts}
          itemsCountPerPage={10}
          onChange={(pageNumber) => setCurrentPageWithScroll(pageNumber)}
          innerClass="pages"
          linkClass="pages__link"
          activeLinkClass="pages__link--active"
        />
      )}
    </>
  );
};
