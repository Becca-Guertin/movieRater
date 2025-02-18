//----------WORK IN PROGRESS-------------

import { Button, VStack, Box, Image } from "@chakra-ui/react";
import "../index.css";
import logitLogo from "../assets/images/Logit logo-24-B-noBG-crop.png";
import logitText from "../assets/images/AnotherMovieRatingWebsite-text-img-crop.png";
import mainBg from "../assets/images/WebsiteBG.png";

const LandingPage = () => {
  return (
    <Box>
      {/* Main Background Section */}
      <Box
        minH="100vh"
        w="100vw"
        backgroundImage={`url(${mainBg})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={{ base: 4, md: 8 }} textAlign="center">
          <Image src={logitLogo} alt="Logit Logo" maxW="600px" />

          <Box
            bg="tomato"
            w={{ base: "90%", md: "50%" }}
            p="4"
            color="white"
            borderRadius="lg"
            _hover={{ bg: "green" }}
          >
            <Image src={logitText} alt="Another Movie Rating Website">
              {/* <a href="https://www.instagram.com/logit_pod/"></a> */}
            </Image>
          </Box>
          <Button
            variant="solid"
            size={{ base: "md", md: "lg" }}
            bg="pink.300"
            color="white"
            _hover={{ bg: "black" }}
          >
            <a>Log-it! Episode Features</a>
          </Button>
          <Button
            variant="solid"
            size={{ base: "md", md: "lg" }}
            bg="pink.200"
            color="white"
            _hover={{ bg: "black" }}
          >
            <a href="./movies">Criterion Films</a>
          </Button>
        </VStack>
      </Box>
      {/* Footer Section is imported via App.jsx and persists across the site */}
    </Box>
  );
};

export default LandingPage;
