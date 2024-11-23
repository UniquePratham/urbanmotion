import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useRef } from "react";

// Lamborghini model with motion
const LamborghiniModel = () => {
  const { scene } = useGLTF("/lamborghini.glb");
  const modelRef = useRef();

  // Adding motion to the model (rotation)
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.001; // Adjust rotation speed
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={2}
      position={[1, -1.5, -1]}
    />
  );
};

const HeroSection = () => {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      height="100vh"
      bg="black"
      color="white"
      align="center"
      justify="space-between"
      pl="80px" // Accounts for sidebar width
    >
      {/* Left Content */}
      <Box
        flex="1"
        textAlign={{ base: "center", md: "left" }}
        p="1rem"
        width="30%"
      >
        <Heading
          fontSize={{ base: "4xl", md: "7xl" }}
          textTransform="uppercase"
          mb="6"
        >
          <Text as="span" color="white">
            Easiest Car{" "}
          </Text>
          <Text as="span" color="#00db00">
            Rentals
          </Text>
        </Heading>
        <Text fontSize="2xl" textTransform="uppercase" color="#00db00" mb="6">
          Find the Best Car For Rent Today
        </Text>
        <Text fontSize="lg" mb="6" maxW="400px" lineHeight="1.8">
          Experience unmatched convenience and luxury with our premium car
          rental services. Book now and hit the road in style.
        </Text>
        <Button
          bgGradient="linear(to-r, #00db00, green.600)"
          color="white"
          _hover={{
            bgGradient: "linear(to-r, #00db00, green.500)",
            transform: "scale(1.1)",
            transition: "0.3s",
          }}
          size="lg"
          textTransform="uppercase"
        >
          Book Now
        </Button>
      </Box>

      {/* Right Content */}
      <Box
        flex="2"
        position="relative"
        textAlign="center"
        height="100%"
        width="70%"
      >
        <Canvas
          style={{
            width: "100%",
            height: "100%",
            zIndex: 10,
          }}
          camera={{ position: [4, 2, 8], fov: 50 }} // Adjusted camera for side view
          gl={{ preserveDrawingBuffer: true }} // To maintain smooth rendering
        >
          <OrbitControls enablePan={false} enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <LamborghiniModel />
        </Canvas>
      </Box>
    </Flex>
  );
};

export default HeroSection;
