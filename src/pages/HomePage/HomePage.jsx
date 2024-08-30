import { lazy, useEffect, useState } from "react";

import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import { getTrendingMovies } from "../../api/api";


const MovieList = lazy(() => import("../../components/MovieList/MovieList"));

const HomePage = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const movies = await getTrendingMovies();
        setMoviesList(movies);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending Today</h1>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <MovieList items={moviesList} />
    </div>
  );
};

export default HomePage;
