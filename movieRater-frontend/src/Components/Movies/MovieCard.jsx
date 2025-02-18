//----------WORK IN PROGRESS-------------

import PropTypes from "prop-types";
import { Button, Card, CardDescription } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

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
          <p>Year: {movie.year}</p>
        </CardDescription>
      </Card.Body>
      <Card.Footer justifyContent="center">
        <Button
          colorScheme="pink"
          size="sm"
          variant="solid"
          bg="orange.300"
          color="white"
          onClick={() => navigate(`/movies/${movie.id}`)}
        >
          View Details
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

// PropTypes validation
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    spine: PropTypes.number.isRequired,
    director1: PropTypes.string.isRequired,
    director2: PropTypes.string,
    director3: PropTypes.string,
    director4: PropTypes.string,
    director5: PropTypes.string,
    country: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default MovieCard;
