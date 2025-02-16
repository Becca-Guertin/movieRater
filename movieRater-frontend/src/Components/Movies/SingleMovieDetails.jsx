// src/components/MovieDetail.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetail = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetail();
  }, [id]); // Dependency array, so it runs whenever the movie ID changes

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-detail">
      <h2>{movie.title}</h2>
      <p>Director: {movie.director1}</p>
      {movie.director2 && <p>Director 2: {movie.director2}</p>}
      <p>Country: {movie.country}</p>
      <p>Year: {movie.year}</p>
      <p>Description: {movie.description}</p>
    </div>
  );
};

export default MovieDetail;