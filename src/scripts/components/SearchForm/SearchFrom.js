import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../../store';
import { setQueryStore, setErrorOffMovies } from '../../store/movies';
import { setCurrentPage } from '../../store/pagination';
import { addQuery, deleteQueries } from '../../store/queries';

export const SearchForm = () => {
  const dispatch = useDispatch();
  const queries = useSelector(selectors.getQueries);
  const error = useSelector(selectors.getErrorNameMovies);
  const lastQuery = useSelector(selectors.getLastQuery);

  const [query, setQuery] = useState(lastQuery);
  const [isShowHistory, setIsShowHistory] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(setCurrentPage(1));
    dispatch(setQueryStore(query.trim()));
    dispatch(addQuery(query.trim()));
    setIsShowHistory(false);
  }

  return (
    <>
      <form className="form" onSubmit={(event) => handleSearch(event)}>
        <div className="form__field">
          <input
              type="text"
              placeholder="Enter the title of the movie"
              className={`form__input ${error !== '' && 'form__input--error'}`}
              value={query}
              onChange={event => {
                setQuery(event.target.value);
                dispatch(setErrorOffMovies());
              }}
          />
          <button
            type="submit"
            className="button form__button form__button--full"
          >
            Search
          </button>
          <button
            type="submit"
            className="button form__button form__button--short"
          >
            &#x1F50D;
          </button>
        </div>
      </form>
      <div className="search-history">
        {queries.length > 1 && (
          <>
            <a
              className="search-history__title"
              onClick={() => setIsShowHistory(!isShowHistory)}
            >
              {isShowHistory ? 'Hide search history' : 'Show search history'}
            </a>
            <a
              className="search-history__title"
              onClick={() => dispatch(deleteQueries())}
            >
              Clear history :)
            </a>
            {isShowHistory && (
            <ul className="search-history__list">
              {queries.map((query, i) => {
                return (
                  <li key={i} className="search-history__item">
                    <a
                      className="search-history__link"
                      onClick={() => {
                        dispatch(addQuery(query));
                        dispatch(setQueryStore(query));
                        dispatch(setCurrentPage(1));
                        setQuery(query);
                        setIsShowHistory(false)
                      }}
                    >
                      {query}
                    </a>
                  </li>
                )
              })}
            </ul>
          )}
          </>
        )}
      </div>
    </>
  );
};
