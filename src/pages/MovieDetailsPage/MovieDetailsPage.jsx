import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { getMovieDetails } from "../../api/api";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const MovieDetails = lazy(() =>
  import("../../components/MovieDetails/MovieDetails")
);

const MovieDetailsPage = () => {
  const location = useLocation();
  const { movieId } = useParams();
  const backLinkHref = location.state ?? "/movies";

  const [movieDetails, setMovieDetails] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const movie = await getMovieDetails(movieId);
        setMovieDetails(movie);
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
      <Link to={backLinkHref}>
        Go Back
      </Link>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movieDetails && (
        <div>
          <MovieDetails movie={movieDetails} />

          <div>
            <h3>Additional information</h3>
            <ul>
              <li>
                <Link to={`/movies/${movieId}/cast`}> Cast </Link>
              </li>
              <li>
                <Link to={`/movies/${movieId}/reviews`}> Reviews </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
