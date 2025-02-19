//----------WORK IN PROGRESS-------------

/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import {
  Box,
  Heading,
  Text,
  HStack,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import "../../index.css";
import mainBg from "../../assets/images/Website-swirlyPink-background .png";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 5; // Number of movies per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/all-movies"
        );
        setMovies(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching movies!");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>{error}</p>;

  // Pagination Logic
  const totalMovies = movies.length;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const selectedMovies = movies.slice(startIndex, startIndex + moviesPerPage);

  return (
    <Box
      position="relative"
      minHeight="100vh"
      bgImage={`url(${mainBg})`}
      bgSize="cover"
      bgPosition="center"
    >
      {/* Fixed Header */}
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
        <SimpleGrid columns={2} spacing={4}>
          <Box>
            <Button
              size="sm"
              variant="solid"
              bg="orange.300"
              color="white"
              onClick={() => navigate(`/`)}
            >
              home
            </Button>
          </Box>
          <Box>
            <Heading size="lg">Criterion Collection</Heading>
          </Box>
        </SimpleGrid>
      </Box>

      {/* Pagination Controls */}
      <Box mt="40px" display="flex" justifyContent="center">
        <HStack spacing={4}>
          <Button
            variant="solid"
            size={{ width: "200px" }}
            bg="pink.300"
            color="white"
            _hover={{ bg: "black" }}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            isDisabled={currentPage === 1}
            mt="20px"
          >
            Previous
          </Button>
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            mt="10px"
            variant="solid"
            size={{ width: "200px" }}
            bg="pink.300"
            color="white"
            _hover={{ bg: "black" }}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            isDisabled={currentPage === totalPages}
          >
            Next
          </Button>
        </HStack>
      </Box>

      {/* Movies Grid Layout */}
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacing={6}
        padding="2"
        justifyItems="center"
        maxWidth="1200px"
        width="100%"
        mx="auto"
      >
        {selectedMovies.map((movie) => (
          <Box key={movie.id} width="100%" maxW="300px">
            <MovieCard movie={movie} />
          </Box>
        ))}
      </SimpleGrid>
      {/* Footer Section is imported via App.jsx and persists across the site */}
    </Box>
  );
};

export default MoviesList;
