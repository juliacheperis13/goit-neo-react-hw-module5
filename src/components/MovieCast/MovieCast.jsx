import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { getMovieCast } from "../../api/api";

import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();

  const [movieCast, setMovieCast] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const cast = await getMovieCast(movieId);
        setMovieCast(cast);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movieCast.length > 0 ? (
        <ul>
          {movieCast.map((actor) => (
            <li key={actor.id}>
              <div>
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    alt={actor.name}
                    width="100"
                  />
                ) : (
                  <div className={styles.noProfilePhoto}></div>
                )}
              </div>
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      ) :
       (
        <p>There is no cast info available.</p>
      )}
    </div>
  );
};

export default MovieCast;
