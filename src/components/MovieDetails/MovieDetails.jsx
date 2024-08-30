import styles from "./MovieDetails.module.css";

const MovieDetails = ({ movie }) => {
  const genres = movie.genres.map((genre) => genre.name).join(", ");
  const score = Math.floor((Number(movie.vote_average) ?? 0) * 10);
  const releaseDate = movie.release_date ? `(${movie.release_date.slice(0, 4)})` : "";

  return (
      <div className={styles.details}>
        <img
          className={styles.detailsImage}
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        />
        <div className={styles.detailsInfo}>
          <h2>{`${movie.title} ${releaseDate}`}</h2>
          <span>User Score: {score}%</span>
          <h3>Overview</h3>
          <span>{movie.overview}</span>
          <h3>Genres</h3>
          <span>{genres}</span>
        </div>
      </div>
  );
};

export default MovieDetails;