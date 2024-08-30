import axios from "axios";

const TMDB_API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

const options = {
  headers: {
    Authorization: `Bearer ${TMDB_API_TOKEN}`,
  },
};

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

export const getMoviesByQuery = async (query) => {
  const defaultOptions = { include_adult: false, page: 1 };
  const response = await axios.get("search/movie", {
    ...options,
    params: { ...defaultOptions, query },
  });
  return response.data.results;
};

export const getTrendingMovies = async () => {
  const response = await axios.get("trending/movie/day", options);
  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`movie/${movieId}`, options);
  return response.data;
};

export const getMovieCast = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/credits`, options);
  return response.data.cast;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/reviews`, options);
  return response.data.results;
};
