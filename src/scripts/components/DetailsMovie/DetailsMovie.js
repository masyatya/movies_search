import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoMovie } from '../../api';
import * as selectors from '../../store';
import {
  setMovieInfo,
  startLoadingDetails,
  loadingErrorDetails,
  deleteMovieInfo,
} from '../../store/details';

export const DetailsMovie = () => {
  const dispatch = useDispatch();
  const imdbId = useSelector(selectors.getImdbId);
  const movieInfo = useSelector(selectors.getMovieInfo);
  const isLoading = useSelector(selectors.getIsLoadingDetails);
  const errorName = useSelector(selectors.getErrorNameDetails)

  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [isShortDescription, setIsShortDescription] = useState(true);

  useEffect(() => {
    if (!imdbId) {
      return;
    }

    dispatch(startLoadingDetails())
    getInfoMovie(imdbId)
      .then(res => {
        if(res.Response === 'False') {
          dispatch(loadingErrorDetails(res.Error));
          return;
        }

        dispatch(setMovieInfo(res));
        setDescription(res.Plot);
        setShortDescription(() => {
          if(res.Plot === res.Plot.split('.').slice(0, 2).join('.')) {
            return res.Plot;
          } else {
            return res.Plot.split('.').slice(0, 2).join('.').concat('.');
          }
        });
        setIsShortDescription(true)
      });
  }, [imdbId]);

  if(isLoading) {
    return (
      <>
        <h2 className="details__heading">Details</h2>
        <div className="spinner">
          <div className="dot1"></div>
          <div className="dot2"></div>
        </div>
      </>
    )
  }

  if(errorName !== '') {
    return (
      <>
        <h2 className="details__heading">Details</h2>
        <p className="error__message">Oops... {errorName} Please, try again.</p>
      </>
    )
  }

  return (
    <>
      <div className="details__header">
        <h2 className="details__heading">Details</h2>
        <button
          className={`details__button ${movieInfo ? '' : 'hidden'}`}
          onClick={() => dispatch(deleteMovieInfo())}
        >
          &#10060;
        </button>
      </div>
      {movieInfo && (
        <div className="details__card">
          <div className="details__image">
            <img src={movieInfo.Poster !== 'N/A'
                ? movieInfo.Poster
                : 'https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available-737x1024.jpg'
              }
              alt="Film logo"
            />
          </div>
          <div className="details__content">
            <h2 className="details__title">{movieInfo.Title} ({movieInfo.Year})</h2>
            {movieInfo.imdbRating !== 'N/A' && (
              <div className="details__rating">
                <p className="details__rating-num">{movieInfo.imdbRating}/10</p>
              </div>
            )}
            {isShortDescription && description !== 'N/A' ? (
              <div className="details__description">
                <p>
                  {shortDescription}
                </p>
                {shortDescription !== description && (
                  <a
                    className="details__show-more"
                    onClick={() => setIsShortDescription(false)}
                  >
                    Show more
                  </a>
                )}

              </div>
            ) : description !== 'N/A'&& (
              <div className="details__description">
                <p>
                  {description}
                </p>
                {shortDescription !== description && (
                  <a
                    className="details__show-more"
                    onClick={() => setIsShortDescription(true)}
                  >
                    Show less
                  </a>
                )}
              </div>
            )}
            {movieInfo.Director !== 'N/A' && (
              <p className="details__creators">
                <span className="details__important">{'Director: '}</span>
                {movieInfo.Director}
              </p>
            )}
            {movieInfo.Writer !== 'N/A' && (
              <p className="details__creators">
                <span className="details__important">{'Writers: '}</span>
                {movieInfo.Writer}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
