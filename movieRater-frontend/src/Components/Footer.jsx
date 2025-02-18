//----------WORK IN PROGRESS-------------

import { Box, Text } from "@chakra-ui/react";
import footerBg from "../assets/images/GreenBannerIMG.png";

const Footer = () => {
  return (
    <Box
      as="footer"
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bgImage={`url(${footerBg})`}
      bgSize="cover"
      bgPosition="center"
      p={4}
      textAlign="center"
      color="white"
      zIndex="2"
      boxShadow="md"
    >
      <Text size="sm">
        © 2025 Log it! Another Movie Rating Website. All Rights Reserved.
      </Text>
    </Box>
  );
};

export default Footer;
