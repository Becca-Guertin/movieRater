//--------WORK IN PROGRESS------------

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardDescription, Button, Image, Box } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogitEpMovieDetails = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/logit-movies/${id}`
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
    <Box>
      <Box
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        bg="pink.200"
        color="white"
        py={4}
        textAlign="center"
        zIndex="2"
        boxShadow="md"
      >
        <Button
          size="sm"
          variant="solid"
          bg="orange.300"
          color="white"
          onClick={() => navigate(`/logit-movies`)}
        >
          back
        </Button>
      </Box>
      <Card.Root
        width="300px"
        height="400px"
        marginLeft="10px"
        marginRight="10px"
        marginTop="10px"
        marginBottom="10px"
        justifyItems="center"
      >
        <Image src={movie.imgUrl} alt="movie poster image" />
        <Card.Body gap="2">
          <Card.Title>
            <h3>{movie.title}</h3>
          </Card.Title>
          <CardDescription>
            <p>Podcast Episode: {movie.episode}</p>
            <p>Release Year: {movie.releaseYear}</p>
            <p>Director: {movie.director1}</p>
            {movie.director2 && <p>Director 2: {movie.director2}</p>}
            {movie.director3 && <p>Director 3: {movie.director3}</p>}
            {movie.director4 && <p>Director 4: {movie.director4}</p>}
            {movie.director5 && <p>Director 5: {movie.director5}</p>}
            <p>Runtime: {movie.runtime}</p>
            <p>Rating: {movie.mmpaRating}</p>
            <p>Description: {movie.description}</p>
            <p>Top Cast: {movie.topCast}</p>
          </CardDescription>
        </Card.Body>
        <Card.Footer justifyContent="center">
          <Button
            colorScheme="pink"
            size="sm"
            variant="solid"
            bg="orange.300"
            color="white"
            onClick={() => navigate(movie.spotifyUrl)}
          >
            Spotify
          </Button>
        </Card.Footer>
      </Card.Root>
    </Box>
    /* Footer Section is imported via App.jsx and persists across the site */
  );
};

export default LogitEpMovieDetails;
