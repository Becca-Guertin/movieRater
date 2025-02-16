/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import MovieCard from "./MovieCard";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/all-movies");
        setMovies(response.data); // Set the movie data in state
        setLoading(false); // Set loading state to false once the data is fetched
      } catch (err) {
        setError("Error fetching movies!");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Render the loading state, error state, or movie cards
  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="movies-list">
      {movies.map((movie) => (
        <div key={movie.id}>
        <MovieCard movie={movie} /> 
        <Link to={`/movies/${movie.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;