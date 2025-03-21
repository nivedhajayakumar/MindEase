"use client";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaCloud, FaHeart, FaChild } from "react-icons/fa";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/card";
import bgImage2 from "../assets/breathe.jpg";
const AboutPage = () => {
  const breathingAnimation = {
    animate: {
      scale: [1, 1.2, 1],
      transition: { duration: 6, repeat: Infinity },
    },
  };

  const habitColors = [
    { bg: "blue.100", hoverBg: "blue.200" },
    { bg: "green.100", hoverBg: "green.200" },
    { bg: "purple.100", hoverBg: "purple.200" },
    { bg: "pink.100", hoverBg: "pink.200" },
  ];

  return (
    <Box
      minH="100vh"
      fontFamily="'Poppins', sans-serif"
      bgGradient="linear(to-r, #6dd5ed, #2193b0)" // Cool blue gradient
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Container maxW="container.lg" py={8}>
        {/* Introduction Section */}
        <Box
          bg="purple.900" // Dark purple background
          p={8}
          borderRadius="2xl"
          mb={8}
          textAlign="center"
          boxShadow="lg"
        >
          <Heading
            as="h1"
            size="2xl"
            color="pink.200" // Light pink text
            mb={4}
            fontWeight="semibold"
          >
            🌈 Welcome to Mindful Kids Club! 🎨
          </Heading>
          <Text
            fontSize="xl"
            color="pink.100" // Lighter pink for subtitle
            mb={4}
            lineHeight="tall"
          >
            Your feelings matter! Just like we take care of our bodies, we need
            to take care of our minds too. Let's learn how!
          </Text>
        </Box>

        {/* Quotes Grid */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={12}>
          {[
            {
              text: "It's okay to feel all the feels! Emotions are like weather - they come and go ⛅",
              icon: FaCloud,
              bg: "pink.50", // Light blue
            },
            {
              text: "Be a friend to your mind - it's doing its best every day! 🌟",
              icon: FaHeart,
              bg: "pink.50", // Light pink
            },
            {
              text: "You're stronger than you think! Even superheroes need breaks 🦸♀️",
              icon: FaChild,
              bg: "pink.50", // Light purple
            },
          ].map((quote, index) => (
            <Box
              key={index}
              bg={quote.bg} // Correctly apply bg to Box
              borderRadius="lg"
              boxShadow="lg"
              transition="all 0.3s"
              _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
            >
              <Card className="p-6">
                <CardHeader className="flex flex-col items-center">
                  <Icon as={quote.icon} boxSize={12} color="blue.600" mb={4} />
                  <CardTitle className="text-lg font-semibold text-gray-800 text-center">
                    {quote.text}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Box>
          ))}
        </SimpleGrid>

        {/* Mind Relaxing Zone */}
        <Box
          backgroundImage={`url(${bgImage2})`}
          p={8}
          borderRadius="2xl"
          textAlign="center"
          mb={12}
          boxShadow="md"
        >
          <Heading size="xl" mb={6} color="blue.800" fontWeight="semibold">
            🌌 Mind Relaxation Zone
          </Heading>
          <motion.div {...breathingAnimation}>
            <Box
              w="220px"
              h="220px"
              bgGradient="linear(to-br, blue.300, purple.300)"
              borderRadius="full"
              mx="auto"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="xl"
            >
              <Text
                fontSize="2xl"
                color="black"
                fontWeight="bold"
                className="text-shadow"
              >
                Breathe In... Breathe Out
              </Text>
            </Box>
          </motion.div>
          <Button
            mt={8}
            colorScheme="blue"
            size="lg"
            height="60px"
            px={10}
            fontSize="xl"
            fontWeight="bold"
            boxShadow="md"
            _hover={{ transform: "scale(1.05)" }}
          >
            {" "}
            <Text
              fontSize="2xl"
              color="white"
              fontWeight="bold"
              className="text-shadow"
            >
              🧘♀️ Start Relaxation
            </Text>
          </Button>
        </Box>

        {/* Healthy Habits Grid */}
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          {[
            { title: "Sleep Time 😴", tip: "Aim for 9-12 hours of sleep!" },
            {
              title: "Move Your Body 🏃♀️",
              tip: "Dance, run, or play for 60 mins daily",
            },
            {
              title: "Talk It Out 💬",
              tip: "Share feelings with someone you trust",
            },
            {
              title: "Creative Time 🎨",
              tip: "Draw, build, or imagine something new",
            },
          ].map((habit, index) => (
            <Box
              key={index}
              bg="pink.50" // ✅ Light green background
              borderRadius="lg"
              boxShadow="md"
              transition="all 0.3s"
              _hover={{
                bg: "pink.100",
                boxShadow: "lg",
                transform: "scale(1.05)",
              }}
            >
              <Card className="p-6">
                <CardHeader className="p-6">
                  <CardTitle className="text-xl font-semibold mb-3 text-gray-800">
                    {habit.title}
                  </CardTitle>
                  <CardDescription className="text-gray-700 text-lg">
                    {habit.tip}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default AboutPage;
