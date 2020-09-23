const BASE_URL = 'https://www.omdbapi.com/?apikey=c364c392';

export const getMovies = (title, page) => {
  return fetch(`${BASE_URL}&s=${title}&page=${page}`)
    .then(response => response.json());
};

export const getInfoMovie = (imdbId) => {
  return fetch(`${BASE_URL}&i=${imdbId}&plot=full`)
    .then(response => response.json());
};
