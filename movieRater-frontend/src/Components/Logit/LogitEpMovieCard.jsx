//----------WORK IN PROGRESS-------------

import PropTypes from "prop-types";
import {
  Button,
  Card,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LogitEpMovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (

    <Card.Root
      width="300px"
      marginLeft="10px"
      marginRight="10px"
      marginTop="10px"
      marginBottom="10px"
    >
      <Image src={movie.imgUrl} alt="movie poster image" />
      <Card.Body gap="2">
        <Card.Title>
          <h3>{movie.title}</h3>
        </Card.Title>
        <Card.Description>
          <p>Year: {movie.releaseYear}</p>
        </Card.Description>
      </Card.Body>
      <Card.Footer gap="2">
        <Button
          colorScheme="pink"
          size="sm"
          variant="solid"
          bg="orange.300"
          color="white"
          onClick={() => navigate(`/logit-movies/${movie.id}`)}
        >
          View Details
        </Button>
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
  );
};

// PropTypes validation
LogitEpMovieCard.propTypes = {
  movie: PropTypes.shape({
    episode: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    director1: PropTypes.string.isRequired,
    director2: PropTypes.string,
    director3: PropTypes.string,
    releaseYear: PropTypes.string,
    runtime: PropTypes.string,
    description: PropTypes.string,
    imgUrl: PropTypes.string,
    spotifyUrl: PropTypes.string.isRequired,
    topCast: PropTypes.string.isRequired,
    mmpaRating: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default LogitEpMovieCard;
