import { Link, useLocation } from "react-router-dom";

import styles from "./MovieList.module.css";

const MovieList = ({ items }) => {
  const location = useLocation();

  return (
    <div className={styles.moviesListContainer}>
      <ul className={styles.moviesList}>
        {items &&
          items.map(({ id, title }) => (
            <li className={styles.moviesListItem} key={id}>
              <Link to={`/movies/${id}`} state={location}>
                {title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MovieList;
