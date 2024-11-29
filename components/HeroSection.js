import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion"; // For popup animation
import { useRouter } from "next/router";

// Lamborghini model with motion
const LamborghiniModel = () => {
  const { scene } = useGLTF("/lamborghini.glb");
  const modelRef = useRef();

  // Adding motion to the model (rotation)
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.002; // Adjust rotation speed
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={2}
      position={[0, -1.5, 0]}
    />
  );
};

const HeroSection = () => {
  const router = useRouter();

  // Popup animation on component mount
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ width: "100%", height: "100vh", overflow: "hidden" }}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        height="100%"
        bg="black"
        color="white"
        align="center"
        justify="space-between"
        px={{ base: "1rem", md: "80px" }} // Responsive padding
      >
        {/* Mobile: 3D Model at Top */}
        <Box
          flex={{ base: "1", md: "2" }}
          position="relative"
          textAlign="center"
          width="100%"
          display={{ base: "block", md: "none" }}
        >
          <Canvas
            style={{
              width: "100%",
              height: "300px",
              zIndex: 10,
            }}
            camera={{ position: [4, 2, 8], fov: 50 }}
            gl={{ preserveDrawingBuffer: true }}
          >
            <OrbitControls enablePan={false} enableZoom={false} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <LamborghiniModel />
          </Canvas>
        </Box>

        {/* Left Content */}
        <Box
          flex="1"
          textAlign={{ base: "center", md: "left" }}
          p="1rem"
          width={{ base: "100%", md: "30%" }}
        >
          <Heading
            fontSize={{ base: "3xl", md: "7xl" }}
            textTransform="uppercase"
            mb="4"
          >
            <Text as="span" color="white">
              Easiest Car{" "}
            </Text>
            <Text as="span" color="#00db00">
              Rentals
            </Text>
          </Heading>
          <Text
            fontSize={{ base: "md", md: "2xl" }}
            textTransform="uppercase"
            color="#00db00"
            mb="4"
          >
            Find the Best Car For Rent Today
          </Text>
          <Text
            fontSize={{ base: "sm", md: "lg" }}
            mb="4"
            maxW="400px"
            lineHeight="1.8"
          >
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
            onClick={() => router.push("/BookCar")} // Redirect to BookCar
          >
            Book Now
          </Button>
        </Box>

        {/* Right Content (3D Model for Desktop) */}
        <Box
          flex="2"
          position="relative"
          textAlign="center"
          height="100%"
          width="70%"
          display={{ base: "none", md: "block" }}
        >
          <Canvas
            style={{
              width: "100%",
              height: "100%",
              zIndex: 10,
            }}
            camera={{ position: [4, 2, 8], fov: 50 }}
            gl={{ preserveDrawingBuffer: true }}
          >
            <OrbitControls enablePan={false} enableZoom={false} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <LamborghiniModel />
          </Canvas>
        </Box>
      </Flex>
    </motion.div>
  );
};

export default HeroSection;
