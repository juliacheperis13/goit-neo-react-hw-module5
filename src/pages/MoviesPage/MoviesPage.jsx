import { lazy, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import { getMoviesByQuery } from "../../api/api";

import styles from "./MoviesPage.module.css";
import clsx from "clsx";

const MovieList = lazy(() => import("../../components/MovieList/MovieList"));

const MoviesPage = () => {
  const [movieList, setMovieList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [params, setParams] = useSearchParams();
  const query = params.get("query") ?? "";

  useEffect(() => {
    const fetchMovies = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        if (!query) {
          setMovieList([]);
          return;
        }
        const movies = await getMoviesByQuery(query);
        setMovieList(movies);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.query.value;
    if (!query) {
      return setParams({});
    }
    params.set("query", query);
    setParams(params);
    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          name="query"
          className="input"
          placeholder="Search movies by name"
        />
        <button className={clsx("button", styles.searchButton)} type="submit">
          Search
        </button>
      </form>

      {query.length > 0 && <MovieList items={movieList} />}
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
    </div>
  );
};

export default MoviesPage;
