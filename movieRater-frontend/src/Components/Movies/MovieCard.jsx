import PropTypes from "prop-types";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>
      <p>Director: {movie.director1}</p>
      {movie.director2 && <p>Director 2: {movie.director2}</p>}
      {movie.director3 && <p>Director 3: {movie.director3}</p>}
      {movie.director4 && <p>Director 4: {movie.director4}</p>}
      {movie.director5 && <p>Director 5: {movie.director5}</p>}
      <p>Country: {movie.country}</p>
      <p>Year: {movie.year}</p>
    </div>
  );
};

// PropTypes validation
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    director1: PropTypes.string.isRequired,
    director2: PropTypes.string,
    director3: PropTypes.string,
    director4: PropTypes.string,
    director5: PropTypes.string,
    country: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
  }).isRequired,
};

export default MovieCard;
