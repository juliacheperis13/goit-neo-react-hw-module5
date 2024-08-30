import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { getMovieReviews } from "../../api/api";

const MovieReviews = () => {
  const { movieId } = useParams();

  const [movieReview, setMovieReview] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const review = await getMovieReviews(movieId);
        setMovieReview(review);
      } catch (error) {
        setIsError(error);
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
      {movieReview.length > 0 ? (
        <ul>
          {movieReview.map((review) => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie.</p>
      )}
    </div>
  );
};

export default MovieReviews;
