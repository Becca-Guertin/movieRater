//--------WORK IN PROGRESS------------

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardDescription } from "@chakra-ui/react";
import axios from "axios";

const MovieDetail = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/movies/${id}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetail();
  }, [id]); // Dependency array, so it runs whenever the movie ID changes

  if (!movie) return <p>Loading...</p>;

  return (
    <Card.Root
      width="300px"
      marginLeft="10px"
      marginRight="10px"
      marginTop="10px"
      marginBottom="10px"
    >
      <Card.Body gap="2">
        <Card.Title>
          <h3>{movie.title}</h3>
        </Card.Title>
        <CardDescription>
          <p>Spine #: {movie.spine}</p>
          <p>Director: {movie.director1}</p>
          {movie.director2 && <p>Director 2: {movie.director2}</p>}
          {movie.director3 && <p>Director 3: {movie.director3}</p>}
          {movie.director4 && <p>Director 4: {movie.director4}</p>}
          {movie.director5 && <p>Director 5: {movie.director5}</p>}
          <p>Country: {movie.country}</p>
          <p>Year: {movie.year}</p>
        </CardDescription>
      </Card.Body>
      <Card.Footer justifyContent="center"></Card.Footer>
    </Card.Root>
    /* Footer Section is imported via App.jsx and persists across the site */
  );
};

export default MovieDetail;
